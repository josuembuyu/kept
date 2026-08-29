# Scope

What Kept does, what it refuses to do, and how the first version is cut.
This document is written before the code and is expected to constrain it.

---

## Perimeter

### In

- Reading a transcript produced by an existing notetaker.
- Capturing the meeting directly, as an optional alternative source (phase 3).
- Extracting commitments — who, what, when, evidence.
- Confirming each commitment with its owner, in one interaction.
- Looking for evidence of progress in connected sources.
- Reporting state before the next meeting.
- Self-hosting the whole pipeline, including capture and transcription.

### Out

Project management · manager-assigned tasks · people evaluation · meeting analytics · replacing
the task manager or the calendar.

### Deliberate limitations

1. **If the four fields cannot be filled, no commitment is created.** The gap is reported instead.
2. **Kept never reports "kept" without evidence.** Absence of signal is reported as unknown.
3. **Kept never reports upward.** Output goes to the group that was in the meeting.

---

## Product rules

Three decisions that constrain every feature. A proposal that breaks one of them is out of scope,
whatever its merit.

**1. Kept works for the person who made the commitment, not for their manager.** Reports go to the
group that was in the meeting, never up the hierarchy. Without this rule the product becomes a
surveillance tool, and no team accepts one.

**2. Silence is a valid state.** No daily reminders, no performance score, no leaderboard. A
commitment with no signal is reported as unknown and left alone until its deadline nears.

**3. Email ingestion is never removed.** Kept has its own capture, but a team that already pays
for a notetaker must always be able to use Kept by forwarding the summary it already receives.
Capture is an option, never a precondition.

---

## Capture

Kept records meetings itself, as an option. Not to compete with existing notetakers, but because
the `who` field depends entirely on speaker attribution — and that is where existing tools are
weakest: Otter is graded D on speaker identification, with around 30% misattribution on
multi-person calls. A commitment attributed to the wrong person is the worst failure Kept can
produce, worse than a missed one.

**Route.** A bot that joins the meeting, giving one audio stream per participant. Local system
audio capture avoids the bot but returns the diarisation problem we are trying to escape.

**Three rules, non-negotiable.** The 2026 lawsuits against notetakers were about exactly this.

1. The recorder's presence is announced explicitly to every participant.
2. Meeting content is never used to train a model. No default, no setting, no exception.
3. Retention is short and displayed. The transcript is kept; the audio is not.

**Self-hosting.** Capture, transcription and extraction can all run on infrastructure the team
controls. This is the answer for anyone who cannot send meeting content to a third party.

**Phase.** Capture ships after the loop is proven, not before. Building audio plumbing first would
delay the only part of Kept that is differentiated.

---

## V1 — three weeks

| Week | Built |
|---|---|
| 1 | Transcript ingestion, commitment extraction with the four fields, file output. Run against real meetings from day one. |
| 2 | Confirmation message, one channel. One automatic evidence source, chosen for coverage. |
| 3 | Pre-meeting report, evaluation harness. |

**Cut from v1:** accounts, dashboard, multi-team, several integrations, billing, web UI.

**One evidence source only.** Pick the one covering the largest share of real commitments —
likely the git host or the issue tracker.

---

## Evaluation

The eval set is 20 real meeting transcripts, annotated by hand. Building it is tedious, and it is
the step most teams skip — which is exactly why it is the first thing built.

| Metric | Definition |
|---|---|
| Extraction precision | Extracted commitments that are real |
| Extraction recall | Real commitments that were extracted |
| Confirmation rate | Commitments accepted by their owner without edits |
| False kept rate | Commitments reported done that were not |
| Justified abstention | "Unknown" verdicts that were correct |
| Annoyance rate | Ignored messages and opt-outs |

**False kept rate is the blocking metric.** No other number compensates for it.

---

## Risks

| Risk | How it shows up | When we learn |
|---|---|---|
| Wrong extraction | Kept invents a commitment; the owner loses trust on the first message | Week 1 |
| Read as surveillance | Adoption stalls even though the output is correct | First real users |
| Noise | One message too many and it gets muted | Week 2 |
| Evidence coverage | Most commitments leave no trace anywhere connectable | Week 2 |

---

## Open questions

- **Q1 — Name.** "Kept" is a working name; the domain has not been checked.
- **Q2 — Notetaker coverage.** Which transcript sources are supported first, and whether a plain
  text transcript is enough to start.
- **Q3 — Commitments with no digital trace.** "I'll call the client" leaves no evidence anywhere.
  Whether these are tracked, or explicitly excluded.
- **Q4 — Follow-up policy.** How many reminders, on what schedule, and who can turn them off.
  This is a product decision, not a setting.
