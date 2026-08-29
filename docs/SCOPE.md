# Scope

What Kept does, what it refuses to do, and how the first version is cut.
This document is written before the code and is expected to constrain it.

---

## Perimeter

### In

- Reading a transcript produced by an existing notetaker.
- Extracting commitments — who, what, when, evidence.
- Confirming each commitment with its owner, in one interaction.
- Looking for evidence of progress in connected sources.
- Reporting state before the next meeting.

### Out

Recording · transcription · project management · manager-assigned tasks · people evaluation ·
meeting analytics · replacing the notetaker, the task manager, or the calendar.

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

**3. Kept replaces nothing.** Not the notetaker, not the task manager, not the calendar. Every
feature must work alongside the tools a team already pays for.

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
