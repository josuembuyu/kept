import { z } from "zod";

/**
 * A commitment needs four fields. If any one of them is missing, it is not a
 * commitment — it is a gap, and Kept reports it as such rather than inventing
 * the missing part. See docs/SCOPE.md.
 */
export const Commitment = z.object({
  who: z.string().describe("The single named person who owes this. Never a team or a role."),
  what: z.string().describe("What they will do, stated so an outsider could tell whether it happened."),
  when: z.string().describe("Deadline as an ISO date (YYYY-MM-DD), resolved from the meeting date."),
  evidence: z
    .string()
    .describe("What would concretely show this is done — a merged PR, an updated document, a sent email."),
  quote: z.string().describe("The verbatim line from the transcript where the commitment was made."),
  confidence: z
    .enum(["high", "medium", "low"])
    .describe("How clearly this was an actual commitment rather than a suggestion or a musing."),
});

export const GapReason = z.enum([
  "no_owner",
  "no_deadline",
  "not_observable",
  "no_evidence_possible",
]);

/** Something the meeting agreed to that cannot become a commitment yet. */
export const Gap = z.object({
  what: z.string().describe("What was agreed, as stated."),
  reason: GapReason.describe("Which of the four fields could not be filled."),
  quote: z.string().describe("The verbatim line from the transcript."),
});

export const Extraction = z.object({
  commitments: z.array(Commitment),
  gaps: z.array(Gap),
});

export type Commitment = z.infer<typeof Commitment>;
export type Gap = z.infer<typeof Gap>;
export type Extraction = z.infer<typeof Extraction>;
