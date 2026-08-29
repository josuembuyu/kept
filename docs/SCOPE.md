# Scope

What Kept does and what it refuses to do.
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

**On inferring progress:** Kept does not read repositories, documents or messages to work out how
far something has got. Deducing status from everywhere is what a project management tool does, and
it is the boundary this product does not cross. Evidence is the status of a ticket someone chose
to link. See `DECISIONS.md` D11.

**On tickets specifically:** an owner can push a commitment into Linear or Jira in one action, and
Kept then reads that ticket as evidence. Creating on request and observing is in scope; owning the
board, syncing it back, or organising work in it is not. See `DECISIONS.md` D10.

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

## The product

Kept is the whole loop, closed. A capture that produces commitments nobody follows is not a
smaller version of the product — it is a different, worse one. There is no reduced edition and no
staged release.

The product is all of this:

- Transcripts from a forwarded summary, from Zoom, and from Meet.
- Commitment extraction with the four fields, and gaps reported where they cannot be filled.
- A recap to the group, by email **and** Slack.
- Confirmation by the owner, in one action.
- Resolution from the linked ticket, and from the group where there is none.
- A pre-meeting report that opens on what was agreed last time.
- The evaluation set, with published numbers.

**Not part of the product:** dashboards, multi-workspace administration, billing, analytics, a web
application. None of them is part of the loop.

**Build order.** Extraction is built first because everything downstream is worthless if it is
wrong, and because it can be measured on its own. That is a sequencing decision about the work.

**Capabilities gated on a measurement** — automatic ticket creation is the current example — are
part of the product. They switch on when their condition is met, not in a later version.

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
