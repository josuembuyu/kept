# Decisions

Provisional product decisions, recorded so work can move forward. **Not immutable.** Each one
carries the signal that would reopen it.

Three categories exist in this repository: rules in [`SCOPE.md`](SCOPE.md) change only by explicit
decision; decisions here change freely when their trigger fires; open questions become decisions
once answered.

---

## D1 — Capture is optional, forwarded email is not

Kept captures meetings itself, but the email path is never removed. A team already paying for a
notetaker must always be able to use Kept without changing anything.

**Why.** Capture is a commodity with well-funded incumbents; follow-through is not. Making capture
a precondition would trade the differentiated half for the crowded one.

**Reopen if.** Forwarded summaries turn out to be too lossy to extract from reliably — in which
case capture stops being optional.

---

## D2 — Zoom through RTMS, Meet through a self-hosted bot

Zoom is captured with Realtime Media Streams: official, per-participant audio, no bot in the
meeting. Meet is captured with Attendee, MIT-licensed and self-hostable, because Google's Meet
Media API requires every participant to be enrolled in a developer preview.

**Why.** Per-participant audio is the whole reason to capture at all — the `who` field depends on
it. Building browser automation in-house would be maintained forever and bought nothing.

**Reopen if.** Google opens the Meet Media API, or Attendee's coverage proves unreliable.

---

## D3 — Email first, Slack immediately after

The recap and the confirmation go out by email before Slack, because email requires nothing to be
installed and reaches participants outside the team.

**Why.** The first user of Kept should not have to install anything, and external participants —
clients, freelancers — are never in the workspace.

**Reopen if.** Email engagement is so low that confirmations do not come back.

---

## D4 — Self-reported completion is displayed as such

When an owner states a commitment is done and no external signal exists, Kept records it as
`kept (self-reported)` rather than `kept`.

**Why.** Saying you did something is evidence of a claim, not evidence of a fact. The rule against
reporting `kept` without evidence stays intact, and the distinction stays visible.

**Reopen if.** The distinction confuses people more than it protects them.

---

## D5 — Precision over recall

When extraction is uncertain, Kept omits rather than guesses.

**Why.** A missed commitment costs one item. An invented one costs the product its credibility on
the first message a person receives.

**Reopen if.** Recall drops low enough that teams stop finding the output useful.

---

## Open

- **Commitments with no digital trace.** "I'll call the client" leaves no signal anywhere. Whether
  these are tracked as self-reported only, or excluded from extraction entirely.
- **Meeting series.** How Kept knows that this meeting is the next occurrence of that one, which
  the pre-meeting report depends on.
- **Name.** "Kept" is a working name; the domain has not been checked.
