# Capture

Kept needs a transcript. There are three ways to get one, and they are deliberately ranked by how
little the team has to change.

## 1. Forward the summary you already receive

Every notetaker on the market emails a summary after each meeting. Kept reads that email.

```
your notetaker ──email──▶ Kept
```

No integration, no OAuth, no permission to grant, no app to install. It works with Granola,
Fathom, Otter, Fireflies, Notion, and with the native transcripts from Zoom, Meet and Teams — and
with tools that do not exist yet.

**This path is never removed.** A team that already pays for a notetaker must always be able to
use Kept without changing anything. Capture is an option, never a precondition.

## 2. Zoom — Realtime Media Streams

Zoom exposes [Realtime Media Streams](https://developers.zoom.us/docs/rtms/): a WebSocket that
delivers **per-participant audio**, transcript, chat and screen share, with **no bot joining the
meeting**. Raw PCM, 16 kHz mono.

This is the preferred capture path, for one reason: the `who` field depends entirely on knowing
who spoke. Existing notetakers are weakest exactly there — Otter is graded D on speaker
identification, with roughly 30% misattribution on multi-person calls. A commitment attributed to
the wrong person is the worst error Kept can make, worse than a missed one.

Per-participant streams remove the problem instead of modelling it. And nothing appears in the
participant list.

## 3. Google Meet — through a self-hostable bot

Google's [Meet Media API](https://developers.google.com/workspace/meet/media-api/guides/overview)
also provides per-participant audio, but requires the Cloud project, the OAuth principal **and
every participant in the conference** to be enrolled in a developer preview. That is unusable
outside a lab.

Meet is therefore captured through a bot that joins the call. Kept does not build its own browser
automation: [Attendee](https://attendee.dev) is MIT-licensed, self-hostable, and already handles
Meet, Zoom and Teams. Using it keeps Kept self-hostable end to end, which a managed vendor would
not.

| Platform | Path | Bot visible | Cost |
|---|---|---|---|
| Any | Forwarded email | no | free |
| Zoom | RTMS, official | no | free |
| Meet | Attendee, self-hosted | yes | own compute |

## Recording rules

Non-negotiable. The 2026 lawsuits against notetakers were about exactly these.

1. **The recorder's presence is announced explicitly** to every participant, before recording.
2. **Meeting content is never used to train a model.** No default, no setting, no exception.
3. **Retention is short and displayed.** The transcript is kept; the audio is not.

## Redaction

Sensitive values spoken or shared in a meeting — credentials, card numbers, personal identifiers —
are removed before the transcript is stored, not after. This is a blocking rule, not a setting.

## Self-hosting

Capture, transcription and extraction can all run on infrastructure the team controls. This is the
answer for anyone who cannot send meeting content to a third party, and it is the reason every
capture path above is either official or open source.
