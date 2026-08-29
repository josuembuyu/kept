<div align="center">
  <h1>Kept</h1>
  <p><strong>Every meeting ends with commitments. Kept finds out which ones were kept.</strong></p>
  <p>
    <a href="docs/SCOPE.md">Scope</a> ·
    <a href="#roadmap">Roadmap</a> ·
    <a href="#evaluation">Evaluation</a> ·
    <a href="#contributing">Contributing</a>
  </p>
  <p>
    <img alt="status" src="https://img.shields.io/badge/status-early%20development-orange">
    <a href="LICENSE"><img alt="license" src="https://img.shields.io/badge/license-MIT-blue"></a>
  </p>
</div>

Kept is an open source agent that reads a meeting transcript — from the notetaker you already
use, or from its own capture — extracts the commitments people made, and follows them until there
is evidence they happened. Between **44% and 73%** of action items agreed in a meeting are never
completed. Extraction is a solved problem; follow-through is not.

## ✨ Features

- **Commitment extraction** — every commitment carries four fields: who, what, when, and *what
  would prove it is done*. If one is missing, Kept reports the gap instead of inventing a task.
- **One-click confirmation** — the owner gets a single message to accept or correct. That is the
  only thing Kept ever asks of anyone.
- **Evidence tracking** — Kept looks for signals of progress in connected sources rather than
  asking people for status.
- **Three states, never two** — `kept` / `in progress` / `unknown`. Kept never reports something
  as done without evidence, and never reports absence of signal as failure.
- **Pre-meeting report** — what was agreed, what happened, what did not move.
- **Optional capture** — Kept can record the meeting itself when speaker attribution matters.
  Self-hostable end to end, for teams that cannot send meeting content to a third party.

## 🔁 How it works

```
transcript ──▶ extract ──▶ confirm ──▶ track ──▶ report
   from         four        one         evidence    before the
 your existing  fields    message      in connected  next meeting
  notetaker    per item   per owner      sources
```

Works with the notetaker you already use. Kept can also capture the meeting itself — see
[`docs/SCOPE.md`](docs/SCOPE.md).

## 🚀 Quick start

Extraction works today. The rest of the loop is in progress.

```bash
pnpm install
export ANTHROPIC_API_KEY=sk-ant-...

pnpm --filter @kept/cli dev ingest fixtures/sample-transcript.txt --date 2026-08-24
```

```
2 commitment(s)

  ● Marc — Open the PR fixing the Belgian tax rates table
     due 2026-08-27
     evidence: a merged pull request touching the rates config
     "I'll push a fix for it before Thursday."

1 thing(s) agreed but not trackable

  ⚠ Follow up with customers about blank invoice PDFs
     missing: no deadline
     "I don't know when I'll hear back."
```

Output is written to `.kept/<transcript>.json`.

| Command | State |
|---|---|
| `kept ingest <transcript>` | works |
| `kept status` | planned |
| `kept report` | planned |

## 🗺 Roadmap

| Milestone | State |
|---|---|
| Transcript ingestion + commitment extraction | **done** |
| Confirmation loop | in progress |
| Evidence tracking, one source | planned |
| Pre-meeting report | planned |
| Evaluation harness | planned |
| Meeting capture + self-hosting | planned |

## 📊 Evaluation

Kept is judged on whether its output can be trusted, not on how much it produces. The evaluation
set is 20 hand-annotated real meeting transcripts, and results are published here as they come in
— including the bad ones.

| Metric | Result |
|---|---|
| Extraction precision | — |
| Extraction recall | — |
| Confirmation rate | — |
| **False `kept` rate** | — |
| Justified abstention | — |

`False kept rate` is the blocking metric. No other number compensates for it.

## 📚 Documentation

- [`docs/SCOPE.md`](docs/SCOPE.md) — what Kept does and refuses to do
- [`docs/COMMITMENT.md`](docs/COMMITMENT.md) — the four fields, three states, lifecycle
- [`docs/CAPTURE.md`](docs/CAPTURE.md) — where transcripts come from, and the recording rules
- [`docs/FOLLOW-UP.md`](docs/FOLLOW-UP.md) — what happens between two meetings
- [`docs/EVALUATION.md`](docs/EVALUATION.md) — how Kept is measured
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — components, boundaries, stack, and why
- [`docs/EXTRACTION.md`](docs/EXTRACTION.md) — the model call explained step by step
- [`docs/MILESTONES.md`](docs/MILESTONES.md) — the build order and what closes each milestone
- [`docs/DECISIONS.md`](docs/DECISIONS.md) — provisional decisions and their reopen triggers

## 🤝 Contributing

Product decisions live in [`docs/SCOPE.md`](docs/SCOPE.md) and are deliberately narrow. Issues
that challenge a decision are welcome; pull requests that quietly widen the scope are not. See
[CONTRIBUTING.md](CONTRIBUTING.md).

## 📄 License

MIT — see [LICENSE](LICENSE).
