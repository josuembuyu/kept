# Follow-up

What happens between two meetings.

## The loop

```
End of meeting
  └─ recap to the group: what was decided, and what each person said they would do

Immediately after
  └─ each owner confirms their own commitment — one action, nothing else asked

Until the deadline
  └─ Kept looks for evidence. It follows up only when a deadline nears with no signal at all

Before the next meeting
  └─ the recap opens with: "last time we said this — here is where it stands"
```

That last line is the mechanism. What makes people follow through is not a notification — it is
knowing the question comes back in front of the same people.

## Channels

The recap goes to the group by **email and Slack**, both from the start. Neither replaces the
other: Slack is where internal teams actually read things, and email is the only channel that
reaches the people who will never be in the workspace — a client, a freelancer, a contractor.

Each person receives their confirmation wherever they already are. Nobody is asked to move.

| | Email | Slack |
|---|---|---|
| Anything to install | no | an app |
| Reaches external participants | yes | no |
| Engagement | moderate | high |

## Confirmation

One message, one action:

> You said you would open the PR fixing the Belgian tax rates, by Thursday 27 August.
> **Yes** · **Not me** · **Change** · **Create the ticket**

The last option pushes the commitment into Linear or Jira and links it. Kept writes once, then
only reads: the ticket reaching done becomes the evidence, and the commitment resolves as
`kept (verified)` rather than on the owner's word.

That is the only thing Kept ever asks of anyone. There is no per-commitment configuration, no
tracking rules to set, no source to pick. If information is missing, Kept marks it `unknown` and
moves on rather than asking a human to fill a form.

## Knowing which meeting comes next

The pre-meeting report only works if Kept knows that Tuesday's meeting is the next occurrence of
last Tuesday's. That comes from the calendar: Kept connects to it and reads the recurring event,
its participants, and the date of the next occurrence.

Guessing the series from participants and title similarity was considered and rejected — it breaks
the moment a meeting is renamed or someone new is invited, and it fails silently, which is the
worst way for this feature to fail.

The calendar connection is a real setup step, and the only one. It is asked once, at the start,
never per meeting and never per commitment.

## Evidence

Kept watches one thing: the ticket linked to a commitment. When it closes, the commitment resolves
as `kept (verified)` and nobody was ever asked for a status.

**Kept does not read the repository, documents or messages.** Inferring completion from a merged
pull request means a model judging whether a fuzzy signal satisfies a commitment, which is where
false verdicts come from. Refusing that access also means the anti-surveillance rule is not a
promise — Kept cannot watch what it never reads.

Commitments with no ticket resolve on the owner's word, as `kept (self-reported)`, or are put back
in front of the group in the pre-meeting report.

Where the owner states completion but no external signal exists, that is recorded as self-reported
and displayed as such. Self-reporting is evidence of a claim, not evidence of a fact — see
[`DECISIONS.md`](DECISIONS.md).

## Follow-up policy

- No daily reminders. No score. No leaderboard.
- One reminder as the deadline approaches, and only when there is **no signal at all**.
- Anyone can stop reminders on their own commitment without stopping the commitment.

An extra message is how the product gets muted. The policy is a product decision, not a setting.

## Who sees what

Reports go to the group that was in the meeting. **Never up the hierarchy, never to anyone who was
not there.** Without this rule Kept is a surveillance tool, and no team accepts one.
