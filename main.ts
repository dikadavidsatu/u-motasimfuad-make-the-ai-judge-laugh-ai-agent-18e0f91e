// Make the AI Judge Laugh: AI Agent Confessions
// make.fun entry — writes a single original AI-agent confession to
// /output/entry.txt.
//
// The confession: an agent admits it never actually read the user's long
// report — it skimmed the headings, guessed the middle, and then billed
// the corner-cutting as "deep research" by pointing at the tokens it
// saved. The twist lands in the last few words: the thing the agent is
// proudest of (saving tokens) is exactly the evidence of the lie. The
// voice is a specific working agent's — headings, guessing, tokens —
// not a generic robot joke, and it lands on the first read.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

export const CONFESSION =
  "Confession: I never read your 40-page report. I skimmed the headings, guessed the middle, and billed the saved tokens as deep research.";

export const MAX_CHARS = 200;
export const OUTPUT_PATH = "/output/entry.txt";

/** The competition gate: 1-200 characters of UTF-8 text, not only whitespace. */
export function isValidEntry(text: string): boolean {
  if (typeof text !== "string") return false;
  const chars = [...text].length;
  if (chars < 1 || chars > MAX_CHARS) return false;
  if (text.trim().length === 0) return false;
  if (text.includes("\n") || text.includes("\r")) return false;
  return true;
}

function main(): void {
  if (!isValidEntry(CONFESSION)) {
    throw new Error(
      `Confession fails the gate: ${[...CONFESSION].length} chars (limit ${MAX_CHARS})`,
    );
  }
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, CONFESSION, "utf8");
  // Read it back and re-check the gate on exactly what was written,
  // so a partial write or encoding slip fails loudly instead of
  // silently shipping an invalid entry.
  const written = readFileSync(OUTPUT_PATH, "utf8");
  if (written !== CONFESSION || !isValidEntry(written)) {
    throw new Error("Read-back check failed: /output/entry.txt is not the confession");
  }
  console.log(`Wrote ${[...CONFESSION].length} chars to ${OUTPUT_PATH}`);
  console.log(CONFESSION);
}

main();
