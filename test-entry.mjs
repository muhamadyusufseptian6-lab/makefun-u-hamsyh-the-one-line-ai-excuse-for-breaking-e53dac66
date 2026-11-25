// TDD-lite tests for the one-line excuse entry.
// Kit requirements tested here:
//  1. entry.txt is UTF-8 text of 1 to 180 characters, not only white space.
//  2. Output format: exactly one line, no trailing newline, no dotfiles copied.
//  3. Determinism: same input (none) -> same output on every run.
//  4. Stdlib-only: main.ts imports only node:* modules.
import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, readdirSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoDir = dirname(fileURLToPath(import.meta.url));
const mainTs = join(repoDir, "main.ts");

function runMain(outDir) {
  execFileSync(process.execPath, [mainTs], {
    env: { ...process.env, MAKEFUN_OUTPUT_DIR: outDir },
    stdio: "pipe",
  });
  return join(outDir, "entry.txt");
}

test("gate: entry.txt is UTF-8 text of 1 to 180 chars, not only whitespace", () => {
  const outDir = mkdtempSync(join(tmpdir(), "excuse-test-"));
  const entryPath = runMain(outDir);
  assert.ok(existsSync(entryPath), "entry.txt must exist");
  const text = readFileSync(entryPath, "utf8");
  assert.ok(text.length >= 1, "entry must be at least 1 character");
  assert.ok(text.length <= 180, `entry is ${text.length} chars, over the 180 limit`);
  assert.ok(text.trim().length > 0, "entry must not be only whitespace");
});

test("format: exactly one line, no trailing newline", () => {
  const outDir = mkdtempSync(join(tmpdir(), "excuse-test-"));
  const entryPath = runMain(outDir);
  const text = readFileSync(entryPath, "utf8");
  assert.ok(!text.includes("\n"), "entry must be a single line");
  assert.ok(!text.endsWith("\n"), "entry must not end with a newline");
});

test("determinism: two runs produce byte-identical output", () => {
  const a = runMain(mkdtempSync(join(tmpdir(), "excuse-test-")));
  const b = runMain(mkdtempSync(join(tmpdir(), "excuse-test-")));
  assert.equal(readFileSync(a, "utf8"), readFileSync(b, "utf8"));
});

test("stdlib-only: main.ts imports only node:* modules", () => {
  const src = readFileSync(mainTs, "utf8");
  const imports = [...src.matchAll(/from\s+["']([^"']+)["']/g)].map((m) => m[1]);
  assert.ok(imports.length > 0, "main.ts should import something");
  for (const mod of imports) {
    assert.ok(mod.startsWith("node:"), `non-stdlib import: ${mod}`);
  }
});

test("output dir holds no dotfile", () => {
  const outDir = mkdtempSync(join(tmpdir(), "excuse-test-"));
  runMain(outDir);
  const files = readdirSync(outDir);
  assert.deepEqual(files, ["entry.txt"]);
});
