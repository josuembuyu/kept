# Security and data

Kept handles two things people are right to be careful about: **what was said in a meeting**, and
**a credential that can spend money**. This document says what happens to each, and what cannot
happen.

Where a guarantee is not implemented yet, it says so. Every one of them is a check on
[`M9`](MILESTONES.md).

---

## The strongest guarantee is self-hosting

Capture, transcription, extraction and storage all run on infrastructure the team controls. Meeting
content never reaches a third party, and the model key is an environment variable on their own
machine.

Nothing below has to be believed on trust in that mode. It is the reason every capture path in
[`CAPTURE.md`](CAPTURE.md) is either an official API or open source: a dependency that cannot be
self-hosted would break this.

---

## Meeting content

| | |
|---|---|
| **Recording is announced** | Every participant is told before recording starts. Not a setting. |
| **Audio is discarded** | The transcript is kept; the audio is not retained after transcription. |
| **Never used for training** | Meeting content is never used to train or improve a model. No default, no opt-out to find, no exception. |
| **Redacted at capture** | Credentials, card numbers and personal identifiers are removed before storage, not after. |
| **Retention is short and displayed** | A team can see how long content is held, and delete it. |
| **Your code is never read** | Kept has no repository access. Evidence is the status of a ticket someone chose to link — nothing is inferred from commits, documents or messages. |

The 2026 lawsuits against meeting notetakers were about the first and third rows. They are rules,
not features.

---

## Bring your own key

Kept runs on the team's own model provider account.

### Self-hosted

The key is an environment variable. Kept never transmits it anywhere except to the model provider.
There is nothing to trust and nothing to store.

### Hosted

The key has to be stored, and it is worth saying plainly why: extraction runs **after** the
meeting, on a schedule, with nobody present. Asking for the key each time is not possible.

So the guarantees have to be structural rather than promised:

| Guarantee | Meaning |
|---|---|
| **Encrypted at rest, key held elsewhere** | Envelope encryption. The encryption key does not live next to the ciphertext, so a database dump is not a key leak. |
| **Write-only** | Once stored, no endpoint returns it — not to the user, not to an administrator, not to support. It can be replaced, never read. |
| **Never logged** | Not in logs, not in traces, not in error messages, not in crash reports. |
| **Scoped to one workspace** | Used only to extract that workspace's transcripts. Never shared, never pooled. |
| **Deletable** | Deleting the key deletes it, and stops the work that depends on it rather than silently failing. |
| **Verifiable** | Token usage is displayed per meeting, so the team can reconcile against their provider's own bill. |

### What this costs the team

Being explicit, because it is not free:

- **Their provider access is the limit.** If their organisation does not have access to a given
  model, Kept cannot use it. Model choice is configurable for that reason.
- **Their rate limits are the limits.** A busy hour on their account is a delay on ours.
- **Their bill is the bill.** Roughly $0.12 per meeting at current rates — see
  [`EXTRACTION.md`](EXTRACTION.md) § Cost.

---

## Who sees what

Reports go to the group that was in the meeting. **Never up the hierarchy, never to anyone who was
not there.** This is a product rule before it is a security one — see [`SCOPE.md`](SCOPE.md) — but
it has an access-control consequence: there is no administrator view that shows one person's
commitments across meetings they were not part of, and there will not be one.

---

## Reporting a vulnerability

Open a private security advisory on the repository rather than a public issue.
