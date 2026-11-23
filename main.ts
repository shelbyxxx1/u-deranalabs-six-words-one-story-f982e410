// Six Words, One Story — make.fun entry.
// The program writes one complete six-word story to entry.txt.
import { mkdirSync, readdirSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The story: six words, 37 characters. A mother keeps baking the cake
// her son loved, alone now — a whole life of loss in one ritual.
const STORY = "Mother baked his favorite cake alone.";

// Guard: the entry must be exactly six words and at most 60 characters,
// matching the competition gate, so a typo can never ship a bad entry.
const words = STORY.trim().split(/\s+/);
if (words.length !== 6 || STORY.length > 60) {
  throw new Error(`story must be exactly six words, got ${words.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

mkdirSync(outDir, { recursive: true });

// Clear stale files inside the output directory, one by one.
// The directory itself is never removed: on the grader it is a mount.
for (const name of readdirSync(outDir)) {
  const target = join(outDir, name);
  if (statSync(target).isFile()) unlinkSync(target);
}

writeFileSync(join(outDir, "entry.txt"), STORY + "\n");
