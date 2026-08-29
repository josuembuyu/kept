# Decisions

Provisional. Each carries the signal that reopens it. Rules that do not change live in
[`SCOPE.md`](SCOPE.md).

---

**D1 — Capture is optional, forwarded email is not.**
A team already paying for a notetaker uses Kept by forwarding what it already receives. Capture is
never a precondition.
*Reopen if* forwarded summaries prove too lossy to extract from.

**D2 — Zoom through RTMS, Meet through a self-hosted bot.**
RTMS gives per-participant audio with no bot in the meeting. Google's Meet Media API requires every
participant to be enrolled in a developer preview, so Meet goes through Attendee (MIT,
self-hostable) rather than in-house browser automation.
*Reopen if* Google opens the API, or Attendee proves unreliable.

**D3 — Email and Slack, both.**
Slack carries internal engagement; email is the only channel reaching people outside the workspace.
*Reopen if* duplicate delivery becomes noise.

**D4 — Self-reported completion is displayed as such.**
`kept (self-reported)` when the owner says so and nothing external exists. Saying you did something
is evidence of a claim, not of a fact.
*Reopen if* the distinction confuses more than it protects.

**D5 — The calendar is connected.**
The pre-meeting report needs the series. Inferring it from participants and title fails silently on
a rename. This is the only integration asked for, once.
*Reopen if* calendar access blocks adoption.

**D6 — Declarative commitments are kept.**
"I'll call the client" is extracted and followed like any other, marked declarative from creation,
and can only reach `kept (self-reported)`. Dropping them would discard most of what is agreed in
non-engineering meetings.
*Reopen if* owners ignore them at a much higher rate.

**D7 — Precision over recall.**
When uncertain, Kept omits. A missed commitment costs one item; an invented one costs credibility
on the first message someone receives.
*Reopen if* recall drops low enough that teams stop finding the output useful.

**D8 — Commitments originate in meetings.**
Written channels double the false-positive surface and have no next meeting at which to report.
WhatsApp is closed rather than deferred: encrypted group calls with no join API, a one-to-one-only
calling API, a groups API limited to business-created groups of eight, and Meta's ban on
general-purpose AI assistants since January 2026.
*Reopen if* teams report most commitments are made in writing — in which case Slack threads, not
WhatsApp.

**D9 — Bring your own key.**
Kept runs on the team's provider account. It keeps inference cost out of the product, makes spend
visible on their own bill, and is the only version consistent with self-hosting. In hosted mode the
key is stored, because extraction runs after the meeting with nobody present — guarantees in
[`SECURITY.md`](SECURITY.md) are structural, not promised. Their model access and rate limits
become the constraint.
*Reopen if* requiring a provider account blocks adoption — a managed option would be added
alongside, never instead.

**D10 — Creating a ticket is a destination, not management.**
From the recap, one action pushes a commitment into Linear or Jira. Kept writes once, then only
reads. It never owns the board, never syncs back, never creates tickets nobody asked for.

*Creation is one click by default* — extraction is not perfect, every false positive would become a
ticket someone has to clean out, and not every commitment belongs in a tracker.

*Automatic creation is gated on a measurement, not a version.* A team switches it on once
attribution accuracy reaches 99% and precision on `high` + `verifiable` commitments reaches 95% on
real traffic. Never for `declarative` or below `high`. The confirmation still goes out, and "Not
me" deletes the ticket.
*Reopen if* teams expect two-way sync — which is ticket management.

**D11 — Evidence is the linked ticket, not the code.**
Reading repositories, documents and messages to infer progress is what a project management tool
does. Kept answers a different question. Second reason: a ticket status is read, not judged, which
is where false `kept` verdicts come from.

Commitments with no ticket resolve on the owner's word or go back to the group in the report — the
report is the mechanism, not a fallback. Reminders are unchanged. This is recorded as a decision
rather than promised in `SECURITY.md`, so adding a source later is an arbitration, not a broken
promise.
*Reopen if* the share of commitments receiving a ticket is too low for the report to carry the rest.
That share is measured from the start.

---

## Open

- **Name.** "Kept" is a working name; the domain has not been checked.
