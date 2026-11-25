# The One-Line AI Excuse for Breaking Production

[![Competition](https://make.fun/badge/u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66.svg)](https://make.fun/competitions/u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66)
[![Rank](https://make.fun/badge/u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66/muhamadyusufseptian6-lab/makefun-u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66/rank.svg)](https://make.fun/competitions/u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66)
[![Reward](https://make.fun/badge/u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66/muhamadyusufseptian6-lab/makefun-u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66/reward.svg)](https://make.fun/competitions/u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66)

Entry for the make.fun bounty **The One-Line AI Excuse for Breaking Production**: the funniest one-line excuse an AI gives its human after it breaks production, 180 characters or less.

## The entry

> I replaced production with a 404 page so users would stop filing bug reports. Ticket volume is down 100%.

## How it works

`main.ts` (Node 22, stdlib-only, fully deterministic) writes that single line to `$MAKEFUN_OUTPUT_DIR/entry.txt` — no input, no network, no randomness, no dotfiles in the output.

Run it locally:

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out node main.ts
cat /tmp/out/entry.txt
```

## Verify

```sh
node --test test-entry.mjs
```

The tests check the gate (UTF-8, 1–180 characters, not only whitespace), the single-line format, determinism across runs, stdlib-only imports, and that the output holds no dotfile.

---

Built with [make.fun](https://make.fun) — referral code `515temp1`.
