#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { extract } from "./extract.js";
import type { Commitment, Gap } from "./types.js";

const USAGE = `kept — every meeting ends with commitments

  kept ingest <transcript> [--date YYYY-MM-DD]   extract commitments from a transcript

Options
  --date    the meeting date, used to resolve "Thursday" and "next week".
            Defaults to today.
  --out     where to write the result. Defaults to .kept/<transcript>.json
`;

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i === -1 ? undefined : process.argv[i + 1];
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function printCommitment(c: Commitment) {
  const mark = c.confidence === "high" ? "●" : c.confidence === "medium" ? "◐" : "○";
  console.log(`  ${mark} ${c.who} — ${c.what}`);
  console.log(`     due ${c.when}`);
  console.log(`     evidence: ${c.evidence}`);
  console.log(`     "${c.quote}"`);
  console.log();
}

function printGap(g: Gap) {
  console.log(`  ⚠ ${g.what}`);
  console.log(`     missing: ${g.reason.replace(/_/g, " ")}`);
  console.log(`     "${g.quote}"`);
  console.log();
}

async function main() {
  const [command, file] = process.argv.slice(2);

  if (command !== "ingest" || !file) {
    console.log(USAGE);
    process.exit(command ? 1 : 0);
  }

  if (!fs.existsSync(file)) {
    console.error(`No such file: ${file}`);
    process.exit(1);
  }

  const transcript = fs.readFileSync(file, "utf8");
  const meetingDate = arg("date") ?? today();

  console.log(`Reading ${file} (meeting date ${meetingDate})…\n`);

  const { extraction, usage } = await extract({ transcript, meetingDate });

  if (extraction.commitments.length === 0) {
    console.log("No commitments found.\n");
  } else {
    console.log(`${extraction.commitments.length} commitment(s)\n`);
    extraction.commitments.forEach(printCommitment);
  }

  if (extraction.gaps.length > 0) {
    console.log(`${extraction.gaps.length} thing(s) agreed but not trackable\n`);
    extraction.gaps.forEach(printGap);
  }

  const out = arg("out") ?? path.join(".kept", `${path.basename(file, path.extname(file))}.json`);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(
    out,
    JSON.stringify({ source: file, meetingDate, ...extraction }, null, 2) + "\n",
  );

  console.log(`Written to ${out}`);
  console.log(`Tokens: ${usage.input_tokens} in, ${usage.output_tokens} out`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
