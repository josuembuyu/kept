# Extraction, step by step

The one place in Kept where a model does the work. This document explains every decision in
`packages/extract`, and why it is that way rather than another way.

Read it alongside [`COMMITMENT.md`](COMMITMENT.md), which defines the object being produced.

---

## 1. The shape of the problem

This is not summarisation. It is extraction under **asymmetric error cost**:

| Error | Cost |
|---|---|
| Missing a commitment | One item is not followed. Annoying. |
| Inventing a commitment | Someone receives a message about a promise they never made. The product loses credibility on first contact. |
| **Attributing to the wrong person** | **The worst possible outcome.** Not a partial success — a different, harmful output. |

Everything below follows from that table. When a design choice trades recall for precision, that is
deliberate.

---

## 2. Structured output, not JSON in prose

The model does not write JSON into a text block for us to parse. It is constrained to a schema.

```ts
const response = await client.messages.parse({
  model: "claude-opus-5",
  output_config: { format: zodOutputFormat(Extraction) },
  ...
});
```

**Why this and not "reply in JSON":** a model asked politely for JSON produces JSON most of the
time. `output_config.format` constrains the response, and `messages.parse` validates it against the
same Zod schema that types the rest of the codebase. A malformed output becomes an error at the
boundary instead of a runtime surprise three packages later.

**What you get for free:** the TypeScript type and the runtime validation come from one definition.
There is no drift between what the model was asked for and what the code expects.

---

## 3. The schema carries the product rule

This is the most important idea in the package, and it is not an AI technique.

```ts
export const Commitment = z.object({
  who: z.string(),
  what: z.string(),
  when: z.string(),
  evidence: z.string(),
  ...
});
```

All four fields are **required**. A commitment with no deadline cannot be represented. The model
is therefore structurally unable to hand back the thing the product forbids — it has to route it to
`gaps` instead.

**Why this matters:** the alternative is a prompt saying "please don't return commitments without a
deadline", enforced by hope. Rules in a prompt are suggestions. Rules in a schema are walls.

The `.describe()` on each field is not documentation for humans — it is sent to the model as part
of the schema. That is where the definition of each field actually lives.

---

## 4. Anatomy of the system prompt

Each block earns its place. Nothing is there for tone.

**Definition first, negative space second.**
> *"A commitment is something a named person said they would do. It is not a suggestion, an
> opinion, an idea someone floated, or a decision the group made without an owner."*

Saying what something is *not* does more work than saying what it is. The failure mode being
defended against is the model extracting every sentence containing a future tense.

**Field rules with a counter-example.**
> *"'Look into billing' is not observable. 'Post the error rates in #eng by Thursday' is."*

An abstract instruction — "make it observable" — is interpreted differently every run. A pair of
examples pins the boundary.

**The asymmetry, stated explicitly.**
> *"Never invent a commitment that was not made. Missing one is far better than inventing one."*
> *"Never attribute a commitment to someone who did not make it. A wrong owner is the worst
> possible error."*

Models do not infer which errors you care about. If you do not rank them, you get the ranking the
model happens to have.

**Provenance as a requirement.**
> *"Every commitment and every gap must carry the verbatim quote it came from."*

Requiring a quote does two things: it gives a human a one-second check, and it constrains the model
— it is much harder to invent a commitment when you must also produce the line where it was made.

**Hedging is confidence, not a gap.**
> *"'I could probably take a look' is confidence low, not a gap."*

Without this the model over-produces gaps and the output becomes useless noise.

---

## 5. The meeting date is an input

```ts
content: `Meeting date: ${meetingDate}\n\nTranscript:\n\n${transcript}`
```

People say "Thursday", not "27 August". Resolving that requires knowing when the meeting happened.
The alternative — storing "Thursday" and resolving later — pushes ambiguity downstream into the
part of the system that can no longer see the conversation.

**General principle:** resolve ambiguity where the context still exists.

---

## 6. Model and thinking

`claude-opus-5` with `thinking: { type: "adaptive" }`.

**Why adaptive thinking:** deciding whether a sentence is a commitment, and attributing it to the
right speaker in a conversation where people interrupt each other, is a reasoning task. Adaptive
thinking lets the model spend effort where the transcript is ambiguous and skip it where it is not.

**Why not a cheaper model, by default:** the whole product rests on this call being right. Model
choice is a lever to pull *after* the evaluation set exists and can measure what a downgrade
actually costs — never before.

---

## 7. Refusals

```ts
if (response.stop_reason === "refusal") { ... }
```

A real meeting transcript can contain anything: dismissals, legal matters, medical details, a
conversation about a person. Safety classifiers can decline. That returns HTTP 200 with
`stop_reason: "refusal"` — not an exception.

Checking `stop_reason` before reading content is the rule for any code processing content it did
not write. Server-side fallbacks are the fuller answer and are not wired yet — noted in the code.

---

## 8. Cost

A one-hour meeting is roughly 8,000–10,000 words, about 13,000 tokens. At Opus 5 rates, that is
around **$0.07 in and $0.05 out — roughly $0.12 per meeting**.

Cheap per meeting, and it multiplies: a team of ten with four meetings a week each is about $20 a
month in extraction alone. That is the number to hold onto when the temptation arrives to re-run
extraction on every edit.

**Levers, in order, when it matters:** prompt caching for the stable system prompt, then `effort`,
then model choice — and only ever with the evaluation set to measure what each one costs in
quality.

---

## 9. What is deliberately not done yet

| Not done | Why | When |
|---|---|---|
| Chunking long transcripts | A three-hour transcript still fits in context. Chunking splits conversations mid-exchange and breaks attribution. | Only if a real transcript fails |
| An adversarial verifier | A second pass trying to refute each extraction would attack the worst failure mode directly | Considered for M1 |
| Retrieval | Nothing to retrieve — the transcript is the whole context | Not planned. Evidence is a ticket status, read rather than searched for |
| Fine-tuning | There is no dataset yet, and the evaluation set is the prerequisite for knowing whether it would help | Not planned |

---

## 10. How this is judged

Not by reading the output and feeling good about it. By the metrics in
[`EVALUATION.md`](EVALUATION.md), on the annotated set, with attribution accuracy judged separately
from extraction quality — because a commitment found and assigned to the wrong person is not a
partial success.

**Every change to the prompt or the schema is judged on the set, never on one example that looks
better.** That rule is the difference between engineering and superstition.
