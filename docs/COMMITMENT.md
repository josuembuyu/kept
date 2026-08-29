# The commitment

Everything Kept does exists to produce, confirm, or resolve a commitment. It is the only object
that matters.

## Four fields

A commitment is something a **named person said they would do**. Not a suggestion, not an opinion,
not an idea someone floated, not a decision the group made without an owner.

| Field | Rule | Why |
|---|---|---|
| `who` | One named person, as named in the transcript. Never a team, never a role, never two people. | A commitment with no owner is a wish. Two owners means neither acts. |
| `what` | Stated so that someone who was not in the meeting could tell whether it happened. | "Look into billing" cannot be followed. "Post the error rates in #eng" can. |
| `when` | A deadline, resolved to a date. Relative phrases are resolved against the meeting date. | Without a deadline there is no moment at which to check. |
| `evidence` | What would show this is done, and of which of the two natures below. | This is the field no other tool produces, and the one that makes tracking possible at all. |

**If any field cannot be filled, no commitment is created.** Kept reports a *gap* instead:

```
⚠ Someone should talk to support before we ship the new flow
   missing: no owner
   "And someone should probably talk to support about this."
```

A gap is useful output, not a failure. It surfaces exactly the thing that quietly dies after a
meeting.

## Two natures of evidence

| Nature | Meaning | Example |
|---|---|---|
| **verifiable** | A signal exists somewhere Kept can reach | a merged pull request, an updated document, a booked meeting |
| **declarative** | Nothing anywhere will ever show it; the owner's word is the only evidence there can be | "I'll call the client tomorrow" |

A declarative commitment is a real commitment. It is extracted, confirmed and followed like any
other — it simply can never reach `kept (verified)`, and that is displayed from the moment it is
created rather than discovered later.

Dropping declarative commitments would discard most of what is agreed in any meeting that is not
an engineering meeting.

## Gap reasons

| Reason | Meaning |
|---|---|
| `no_owner` | Agreed by the group, assigned to nobody |
| `no_deadline` | Owned, but with no moment to check |
| `not_observable` | Phrased so that nobody could tell whether it happened |

## Confidence

Every commitment carries `high`, `medium` or `low`. Hedged language — *"I could probably take a
look"* — is low confidence, not a gap. The distinction matters: a gap means Kept could not build
the object; low confidence means it did, but the person may not have meant it as a promise.

## Provenance

Every commitment and every gap carries the **verbatim quote** it came from. This is not decoration.
It is what lets a person contest an extraction in one second, and what makes a wrong attribution
visible instead of silent.

## Three states

| State | Condition |
|---|---|
| `kept (verified)` | A signal was found in a connected source |
| `kept (self-reported)` | The owner said so, and no external signal exists or can exist |
| `in progress` | A partial signal, or the owner said so |
| `unknown` | No signal at all |

Saying you did something is evidence of a claim, not evidence of a fact — so the two are never
merged into one green state.

**Kept never reports something as done without evidence, and never reports absence of signal as
failure.** `unknown` means Kept does not know — not that the person did nothing. One false "all
good" destroys trust faster than ten reminders.

## Lifecycle

```
extracted ──▶ confirmed ──▶ tracked ──▶ resolved
    │             │            │            │
    │             │            │            └─ reported at the next meeting
    │             │            └─ evidence looked for until the deadline
    │             └─ owner accepts or corrects, in one action
    └─ or reported as a gap, and it stops here
```

A commitment the owner rejects is deleted, not archived. Kept was wrong; there is nothing to keep.
