import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { Extraction } from "@kept/core";

const MODEL = "claude-opus-5";

const SYSTEM = `You extract commitments from meeting transcripts.

A commitment is something a named person said they would do. It is not a suggestion, an
opinion, an idea someone floated, or a decision the group made without an owner.

A commitment requires all four of these. If you cannot fill one from the transcript, it is
NOT a commitment — report it as a gap instead:

  who       one named person, exactly as named in the transcript. Never "the team",
            never a role, never two people.
  what      stated so that someone who was not in the meeting could tell whether it
            happened. "Look into the billing issue" is not observable. "Post the billing
            error rates in #eng by Thursday" is.
  when      a deadline. Resolve relative dates ("Thursday", "next week", "end of month")
            against the meeting date given below, and return YYYY-MM-DD.
  evidence  what would concretely show this is done — a merged pull request, an updated
            document, a message sent, a meeting booked. If nothing observable could ever
            show it, that is the gap reason "no_evidence_possible".

Rules:
- Never invent a commitment that was not made. Missing one is far better than inventing one.
- Never attribute a commitment to someone who did not make it. A wrong owner is the worst
  possible error.
- Every commitment and every gap must carry the verbatim quote it came from.
- Hedged language ("I could probably take a look") is confidence "low", not a gap.
- If the same commitment is restated several times, return it once.`;

export interface ExtractOptions {
  transcript: string;
  meetingDate: string;
}

export async function extract({ transcript, meetingDate }: ExtractOptions) {
  const client = new Anthropic();

  const response = await client.messages.parse({
    model: MODEL,
    max_tokens: 16000,
    thinking: { type: "adaptive" },
    system: SYSTEM,
    messages: [
      {
        role: "user",
        content: `Meeting date: ${meetingDate}\n\nTranscript:\n\n${transcript}`,
      },
    ],
    output_config: { format: zodOutputFormat(Extraction) },
  });

  if (response.stop_reason === "refusal") {
    throw new Error(
      `The model declined to process this transcript (${response.stop_details?.category ?? "unspecified"}).`,
    );
  }

  if (!response.parsed_output) {
    throw new Error("The model returned no parsable extraction.");
  }

  return { extraction: response.parsed_output, usage: response.usage };
}
