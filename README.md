<h1 align="center">Kept</h1>

<p align="center">
  <strong>Your notetaker writes down what the team decided.<br/>Kept finds out whether it happened.</strong>
</p>

<p align="center">
  <a href="#status"><img alt="status" src="https://img.shields.io/badge/status-early%20development-orange"></a>
  <a href="LICENSE"><img alt="license" src="https://img.shields.io/badge/license-MIT-blue"></a>
</p>

---

## The problem

AI notetakers got very good at one half of the job.

> "Most AI notetaker tools are good at transcription, but almost none are good at what happens
> *after* transcription — action items don't move anywhere, and summaries sit in a standalone app
> nobody returns to."

The numbers behind that sentence are worse than they sound: **44–73% of action items agreed in a
meeting are never completed**, and 71% of meetings fail to achieve their objective.

The gap is not extraction. Half a dozen tools already push action items into Notion, Linear or
Jira. The gap is **follow-through** — nobody checks, so nothing does.

## What Kept does

Kept reads the transcript your notetaker already produced, pulls out the **commitments**, and then
does the part nobody does: it follows them until there is evidence they happened.

```
1. INGEST      Reads the transcript from the notetaker you already use.
               Kept records nothing and transcribes nothing.

2. EXTRACT     Isolates commitments. Anything ambiguous is surfaced as
               ambiguous, never guessed.

3. CONFIRM     Each person gets one message: "you said you'd do X by
               Thursday — right?" One click. The only thing Kept ever
               asks of anyone.

4. TRACK       Looks for evidence of progress in connected sources.
               Follows up only when a deadline nears with no signal at all.

5. REPORT      Before the next meeting: here is what was agreed, here is
               what happened, here is what did not move.
```

## The commitment

Kept does not track "action items". It tracks **commitments**, and a commitment needs four things.
Without all four, it does not exist:

| Field | Rule |
|---|---|
| **Who** | A named person. Never "the team". |
| **What** | Stated observably. |
| **When** | A deadline. |
| **Evidence** | What would concretely show this is done. |

That fourth field is the one no tool produces today, and it is the one that makes tracking
possible at all.

If Kept cannot fill all four, it does **not** invent a commitment. It reports the gap instead —
*"the team agreed to look at billing, but nobody was named"* — which is useful information, not a
failure.

## Three states, never two

| State | Condition |
|---|---|
| **Kept** | Evidence exists, and the owner has not contradicted it |
| **In progress** | A partial signal, or the owner said so |
| **Unknown** | No signal. Kept says it does not know — never "not done" |

**Hard rule: Kept never reports something as done without evidence.** One false "all good"
destroys trust faster than ten reminders.

## Design principles

**1. Kept works for the person who made the commitment, not for their manager.**
Reports go to the group, never up the hierarchy. Without this rule the product becomes a
surveillance tool, and no team accepts one.

**2. Silence is a valid state.** No daily nagging, no performance score, no leaderboard.

**3. Kept replaces nothing.** Not your notetaker, not your task manager, not your calendar.

## What Kept is not

Not a recorder. Not a transcription service. Not a project manager. Not a way for a manager to
assign work. Not people analytics.

## Status

**Early development. Not usable yet.** The scope is written down before the code — see
[`docs/SCOPE.md`](docs/SCOPE.md).

| Milestone | State |
|---|---|
| Transcript ingestion + commitment extraction | in progress |
| Confirmation loop | planned |
| Evidence tracking (one source) | planned |
| Pre-meeting report | planned |
| Evaluation harness | planned |

## How it will be measured

Kept is judged on whether its output can be trusted, not on how much it produces. The evaluation
set is 20 hand-annotated real meeting transcripts.

| Metric | Why it matters |
|---|---|
| Extraction precision / recall | Real commitments found, invented ones caught |
| Confirmation rate | Commitments the owner accepts unedited — low means bad extraction |
| **False "kept" rate** | The critical one. Must approach zero |
| Justified abstention | Cases where Kept said "I don't know" and was right to |
| Annoyance rate | Ignored messages, opt-outs |

Results will be published in this README as they come in, including the bad ones.

## Contributing

The product decisions live in [`docs/SCOPE.md`](docs/SCOPE.md) and are deliberately narrow.
Issues that challenge a decision are welcome; pull requests that quietly widen the scope are not.

## License

MIT — see [LICENSE](LICENSE).
