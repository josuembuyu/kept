# Contributing

Kept is deliberately narrow. The fastest way to have a change accepted is to check it against
[`docs/SCOPE.md`](docs/SCOPE.md) first.

## Before opening a pull request

- **Read the scope.** A feature that widens what Kept does — verifying fixes, managing tickets,
  scoring people — will be declined regardless of how well it is written.
- **Challenge decisions in issues, not in code.** Every provisional decision in
  [`docs/DECISIONS.md`](docs/DECISIONS.md) names the signal that would reopen it. If you have that
  signal, open an issue with it. That is a genuinely useful contribution.
- **Anything touching extraction needs eval numbers.** A prompt or schema change is judged on the
  evaluation set, not on a single example that looks better. See [`docs/EVALUATION.md`](docs/EVALUATION.md).

## Local setup

```bash
npm install
export ANTHROPIC_API_KEY=sk-ant-...
npm run dev -- ingest fixtures/sample-transcript.txt --date 2026-08-24
npm run typecheck
```

## Transcripts

Never commit a real transcript. Everything in `fixtures/` and `evals/` is anonymised before it
enters the repository: names replaced consistently, company and product names replaced, numbers
changed.

## Commit messages

One subject line saying what changed, then why. Product decisions belong in `docs/`, not in commit
bodies.
