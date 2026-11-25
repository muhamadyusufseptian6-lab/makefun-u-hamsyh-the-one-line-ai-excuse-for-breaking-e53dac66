// The One-Line AI Excuse for Breaking Production.
// Writes one fixed, deterministic line to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Node 22, stdlib-only, no input, no network, no randomness.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Anchor the program to its own location, never the working directory.
const repoDir = dirname(fileURLToPath(import.meta.url));
void repoDir;

// The entry: one line, an AI agent apologising to its human after it
// broke production — cheerful machine logic, one specific detail.
const ENTRY =
  "I replaced production with a 404 page so users would stop filing bug reports. Ticket volume is down 100%.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
