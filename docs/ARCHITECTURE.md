# Architecture

How the system is put together, and **why** each boundary is where it is. Product decisions live in
[`SCOPE.md`](SCOPE.md); this document only covers how they are implemented.

Anything not yet decided is marked **open** rather than invented.

---

## The shape of the problem

Kept is not a request/response application. A commitment is created on Tuesday and resolves — or
does not — on Friday, from a signal that arrives from somewhere else entirely. That single fact
determines the architecture:

- **State outlives the process.** Everything must survive a restart. There is no in-memory session.
- **Input arrives on its own.** An email, a webhook, a scheduled check. Nothing is user-initiated.
- **Time is a first-class input.** Deadlines pass, meetings recur, reminders fire.

A chat application would be organised around a conversation. Kept is organised around a
**commitment and its state machine**.

---

## Data flow

```
   ┌── forwarded email ──┐
   │                     │
   ├── Zoom RTMS ────────┼──▶ transcript ──▶ extract ──▶ commitments + gaps
   │                     │                                     │
   └── Meet (Attendee) ──┘                                     ▼
                                                          confirm
                                                               │
                              calendar ──▶ series ──┐          ▼
                                                    │      evidence ◀── connected sources
                                                    ▼          │
                                                  report ◀─────┘
                                                    │
                                              email + Slack
```

Every arrow crosses a package boundary, and every boundary carries a typed contract. The reason is
not tidiness: **each stage has to be measurable on its own.** Extraction is judged against
annotated transcripts without any of the rest existing.

---

## Packages

Turborepo monorepo, pnpm workspaces. Packages appear as milestones land — see
[`MILESTONES.md`](MILESTONES.md).

| Package | Owns | Why it is separate |
|---|---|---|
| `core` | The domain: commitment, gap, states, lifecycle. Zod schemas. | Everything depends on it; it depends on nothing. The rules live in one place, so no stage can quietly redefine what a commitment is. |
| `extract` | Transcript → commitments and gaps | The only package that talks to a model. Isolating it means the model can be swapped, and that extraction is testable without any I/O. |
| `evals` | The annotated set, the metrics, the runner | Depends on `extract` but nothing depends on it. Evaluation is not a test suite — it measures quality, not correctness. |
| `capture` | Zoom RTMS, Meet via Attendee | Platform-specific, breaks for platform-specific reasons. Kept behind one interface so the rest never learns which platform a meeting came from. |
| `ingest` | Inbound email parsing | Tolerating six notetaker formats is messy work. It is contained here so the mess does not spread. |
| `notify` | Email and Slack delivery | Two channels, one message model. Written once; adding a third channel touches nothing else. |
| `evidence` | Reading the state of linked tickets | The only automatic evidence source. Deliberately narrow: no repository, document or message access — see `DECISIONS.md` D11. |
| `calendar` | Series identity, next occurrence | Small and self-contained, and the only integration users are asked for. |
| `cli` | Local operation and development | How the system is driven before any service exists. |

**The rule that keeps this honest:** `core` never imports anything else. If a package needs to
change what a commitment is, that is a product decision, and it happens in `core` and in the docs
together.

---

## Stack

| Choice | Decided | Why |
|---|---|---|
| TypeScript | yes | One language across the CLI, the service and the packages. The domain types are shared rather than re-declared. |
| pnpm + Turborepo | yes | Workspace linking without publishing, and per-package caching so a change to `extract` does not rebuild `capture`. |
| Zod | yes | Schemas are shared between validation, model output parsing and TypeScript types. One definition, three uses. |
| Anthropic SDK, Claude Opus 5 | yes | Structured output through `messages.parse`, so extraction is validated at the boundary rather than parsed by hand. See [`EXTRACTION.md`](EXTRACTION.md). |
| Persistence | **open** | Needs relational queries (commitments by owner, by deadline, by series) and durability. Postgres is the obvious candidate; not decided. |
| Scheduling | **open** | Deadlines and pre-meeting reports need time-triggered work. Decided when M5 starts. |
| Transcription | **open** | Only needed once capture starts, at M7. |
| Hosting | **open** | Constrained by self-hosting: whatever is chosen must run on someone else's infrastructure. |

Nothing above is chosen for elegance. Each one is chosen because a stage of the pipeline needs it,
and the open ones stay open until the stage that needs them is built.

---

## What crosses a boundary

Three contracts hold the system together. Everything else is internal.

**Transcript** — what capture and ingestion produce, and the only thing extraction accepts.
Carries the text, the participants, the meeting date, and where it came from. A transcript from
Zoom and a transcript from a forwarded email are the same object; extraction never learns the
difference.

**Commitment** — what extraction produces. Four fields, a nature, a confidence, a quote, an owner.
Defined once in `core`.

**Signal** — what an evidence source returns: found or not found, with a reference. Sources differ
wildly; what they return does not.

---

## Failure and honesty

Two rules that shape the code, not just the product:

**Absence of information is a value, not an error.** `unknown` is a state the system carries
deliberately. Nowhere does a missing signal become a false negative or a silent default.

**Every derived claim keeps its source.** A commitment keeps its verbatim quote; a resolved
commitment keeps the signal that resolved it. This is what makes a wrong output contestable in one
second instead of mysterious.
