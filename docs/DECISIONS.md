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

## D3 — Email and Slack, both from the start

The recap and the confirmation go out on both channels. Each person is reached where they already
are.

**Why.** Slack carries internal engagement; email is the only channel that reaches participants
outside the workspace. Shipping one without the other leaves half the room unreachable.

**Reopen if.** Duplicate delivery becomes noise for people present on both.

---

## D4 — Self-reported completion is displayed as such

When an owner states a commitment is done and no external signal exists, Kept records it as
`kept (self-reported)` rather than `kept`.

**Why.** Saying you did something is evidence of a claim, not evidence of a fact. The rule against
reporting `kept` without evidence stays intact, and the distinction stays visible.

**Reopen if.** The distinction confuses people more than it protects them.

---

## D5 — The calendar is connected

Kept connects to the calendar and reads the recurring event to know which meeting follows which.

**Why.** The pre-meeting report is the mechanism that makes people follow through, and it needs
the series. Inferring it from participants and title similarity fails silently on a rename or a
new invitee.

**Cost, stated plainly.** This is a real setup step and the only integration asked for. It is
requested once, never per meeting.

**Reopen if.** Calendar access proves to be a blocking objection during adoption.

---

## D6 — Declarative commitments are kept, not dropped

A commitment nothing can ever verify — "I'll call the client" — is extracted and followed like any
other. It is marked declarative from creation and can only ever reach `kept (self-reported)`.

**Why.** Dropping them would discard most of what is agreed in any meeting that is not an
engineering meeting.

**Reopen if.** Declarative commitments turn out to be ignored by owners at a much higher rate than
verifiable ones.

---

## D7 — Precision over recall

When extraction is uncertain, Kept omits rather than guesses.

**Why.** A missed commitment costs one item. An invented one costs the product its credibility on
the first message a person receives.

**Reopen if.** Recall drops low enough that teams stop finding the output useful.

---

## D8 — Commitments originate in meetings

A commitment enters Kept because someone said it in a meeting. Commitments made in writing — a
Slack thread, an email — are out of scope for now.

**Why.** The meeting is where commitments are made out loud, in front of witnesses, with a next
occurrence already scheduled. Written channels double the false-positive surface: half of the
"I'll take a look" in a Slack thread are not commitments, and there is no next meeting at which to
report them.

**On WhatsApp specifically, this is not a sequencing choice — it is closed.** Group calls are end
-to-end encrypted with no API to join, the Business Calling API is one-to-one only and explicitly
unsupported in groups, the Groups API only covers groups the business itself created and caps them
at eight members, and since 15 January 2026 Meta prohibits general-purpose AI assistants on the
WhatsApp Business Platform.

**Reopen if.** Teams report that most of their commitments are made in writing rather than in
meetings — in which case Slack threads, not WhatsApp, are the extension.

---

## D9 — Bring your own key

Kept runs on the team's own model provider account, self-hosted or hosted.

**Why.** Three reasons, in order. It keeps inference cost out of the product, so there is no
incentive to mark it up or to quietly downgrade the model. It makes spend visible on the team's own
bill instead of buried in a subscription. And it is the only version consistent with self-hosting,
which is the product's real privacy answer.

**Cost, stated plainly.** The team's provider access becomes the constraint — model availability
and rate limits are theirs, and their errors become ours to surface. In hosted mode Kept has to
store a credential that can spend money, because extraction runs after the meeting with nobody
present. The guarantees around that are in [`SECURITY.md`](SECURITY.md) and are structural —
write-only, encrypted with a key held elsewhere, never logged, deletable — rather than promised.

**Reopen if.** Requiring a provider account turns out to block teams who would otherwise adopt, in
which case a managed option is added alongside it — never instead of it.

---

## D10 — Creating a ticket is a destination, not management

From the recap, an owner can push their commitment into Linear or Jira in one action. Kept then
watches that ticket as an evidence source.

**Where the line sits.** Kept **writes once**, at creation, on the owner's action. It never owns the
board, never syncs status back into it, never creates tickets nobody asked for, and never becomes
the place where work is organised. After creation the ticket is read-only to Kept — a signal, like
a merged pull request.

**Why.** It removes the one manual step between "I said I would" and "it exists where my work
lives", and it upgrades the commitment from `kept (self-reported)` to `kept (verified)`, because a
ticket moving to done is an observable signal.

**Creation is a one-click action by default.** Extraction is not perfect, every false positive
would become a real ticket someone has to clean out of their board, and not every commitment
belongs in a tracker — "I'll call the client" does not. The click costs nothing, because the
confirmation message exists anyway.

**Automatic creation is gated on a measurement, not on a version.** A team can switch it on once
attribution accuracy reaches 99% and extraction precision on `high` + `verifiable` commitments
reaches 95%, measured on real traffic. It never applies to `declarative` commitments or to anything
below `high` confidence. The confirmation still goes out, and "Not me" deletes the ticket Kept
created — automation stays reversible through a gesture that already existed.

**Reopen if.** Teams start expecting Kept to keep the ticket and the commitment in sync in both
directions — which is ticket management, and is where this stops.

---

## D11 — Evidence comes from the linked ticket, not from the code

The only automatic evidence source is a ticket linked to a commitment. Kept does not read the
repository, documents, messages or calendars looking for signals.

**Why.** A ticket status is deterministic: it is read, not judged. Inferring completion from a
merged pull request means a model deciding whether a fuzzy signal satisfies a commitment — which
is exactly where false `kept` verdicts come from, and false `kept` is the blocking metric.
Refusing code access also turns the anti-surveillance rule from a promise into a technical fact:
Kept cannot watch what it never reads.

**What it costs.** Commitments with no ticket have no automatic path. They resolve either on the
owner's word, as `kept (self-reported)`, or not at all.

**Why that is acceptable.** The pre-meeting report is the mechanism, not a fallback. What goes into
a tracker is verified by machine; everything else is put back in front of the group, which is what
made people act in the first place.

**Reminders stay.** One reminder as a deadline nears with no signal — the restrained policy in
`FOLLOW-UP.md` is unchanged. Dropping code surveillance is not the same as going silent.

**Measured.** The share of commitments that receive a ticket is tracked. If it is very low,
machine verification covers almost nothing and we learn that in weeks rather than after building a
retrieval layer.

**Reopen if.** That share turns out to be too low for the report alone to carry the rest.

---

## Open

- **Name.** "Kept" is a working name; the domain has not been checked.
