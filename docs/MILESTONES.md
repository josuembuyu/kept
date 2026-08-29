# Milestones

The product is the whole loop, closed — see [`SCOPE.md`](SCOPE.md). These milestones are the order
in which it gets built. They are not versions, and none of them is a product on its own.

Each has a **check**: a verifiable condition, not the feeling that the code runs.

---

## M1 — Extraction

Transcript in, commitments and gaps out.

| Feature | |
|---|---|
| Four-field extraction | `who`, `what`, `when`, `evidence` |
| Evidence nature | verifiable or declarative, decided at extraction |
| Gap reporting | `no_owner`, `no_deadline`, `not_observable` |
| Confidence | high / medium / low |
| Verbatim quote | on every commitment and every gap |
| Relative date resolution | "Thursday" against the meeting date |
| Evaluation harness | runs the set, prints the metrics table |

**Check.** On the 20-transcript set: attribution accuracy near-perfect, precision above the bar,
and every miss filed under a named failure mode.

**Why first.** Everything downstream is worthless if extraction is wrong, and it is the only part
that can be measured entirely on its own.

---

## M2 — Ingestion

A meeting summary arrives on its own and becomes commitments, with nobody doing anything.

| Feature | |
|---|---|
| Inbound email | a forwarded or cc'd summary is received and parsed |
| Format tolerance | Granola, Fathom, Otter, Fireflies, Notion, Zoom, Meet, Teams |
| Participant resolution | names in the transcript mapped to real people |
| Redaction | sensitive values removed before storage |

**Check.** Forward a real summary; commitments appear without a single manual step.

---

## M3 — Recap and confirmation

The group hears what was decided; each owner confirms their own.

| Feature | |
|---|---|
| Group recap | email and Slack, both |
| Per-owner confirmation | one action: accept, reject, correct |
| Correction | edits the commitment; rejection deletes it |
| Push to a tracker | one action creates the ticket in Linear or Jira and links it |
| External participants | reachable by email without an account |

**Check.** An owner confirms from either channel, and a rejected commitment disappears rather than
being archived.

---

## M4 — Calendar and series

Kept knows which meeting follows which.

| Feature | |
|---|---|
| Calendar connection | asked once, never per meeting |
| Recurring event | series identity read, not guessed |
| Next occurrence | date and participants known in advance |

**Check.** Renaming a meeting or inviting someone new does not break the series.

---

## M5 — Evidence

Commitments resolve themselves.

| Feature | |
|---|---|
| Linked tickets | the only automatic evidence source: a ticket reaching done resolves its commitment as verified |
| No code access | the repository, documents and messages are never read |
| Share tracked | the proportion of commitments that receive a ticket, measured from the start |
| State resolution | `kept (verified)`, `kept (self-reported)`, `in progress`, `unknown` |
| Self-report | owner's word recorded as such, never merged into verified |
| Follow-up policy | one reminder near the deadline, only with no signal at all |

**Check.** A commitment closes when its ticket closes, with nobody asked for a status. False `kept`
rate measured and at zero — which a deterministic signal makes achievable by construction.

---

## M6 — Pre-meeting report

The loop closes.

| Feature | |
|---|---|
| Report before the next occurrence | what was agreed, what happened, what did not move |
| Carry-over | unresolved commitments reappear rather than expiring |
| Audience | the group that was in the meeting, and nobody above it |

**Check.** The report lands before the next occurrence with states that match reality.

---

## M7 — Zoom capture

Per-participant audio, no bot in the meeting.

| Feature | |
|---|---|
| RTMS connection | official WebSocket, per-participant PCM |
| Transcription | speaker-attributed by construction |
| Announcement | recording notice to every participant |
| Retention | transcript kept, audio discarded |

**Check.** Attribution accuracy on a captured meeting beats the same meeting ingested from a
forwarded summary.

---

## M8 — Meet capture

Same result, through a self-hosted bot.

| Feature | |
|---|---|
| Attendee integration | self-hosted, MIT |
| Announcement | bot visible and announced |
| Parity | same transcript shape as Zoom |

**Check.** A Meet transcript and a Zoom transcript of comparable meetings extract equally well.

---

## M9 — Ready for other people

| Feature | |
|---|---|
| Recording rules enforced in code | announcement, no training, short retention |
| Key handling | write-only storage, encrypted with a key held elsewhere, never logged, deletable |
| Usage visible | token spend per meeting, reconcilable against the provider's own bill |
| Self-hosting | capture, transcription and extraction run on the team's own infrastructure |
| Published metrics | the evaluation table filled in, including the bad numbers |
| Documented failure modes | what Kept gets wrong, written down before anyone finds out |

**Check.** Someone outside the project can self-host it from the documentation alone.

---

## Order

```
M1 extraction ──▶ M2 ingestion ──▶ M3 recap ──▶ M4 calendar ──▶ M5 evidence ──▶ M6 report
                                                                                     │
                                                        M7 Zoom ──▶ M8 Meet ─────────┤
                                                                                     ▼
                                                                          M9 launch readiness
```

The loop closes on forwarded email first because it is the cheapest path to a working end-to-end
product. Capture is a quality upgrade on a loop that already works, not a prerequisite for it.
