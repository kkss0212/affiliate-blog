# Social card generator (X / Instagram)

Generates a 4-image "info essence card" carousel (cover / stats /
highlight / CTA, 1080×1080 PNG) plus a draft caption for one prefecture
or municipality — ready to upload manually to Instagram or X. See
`DECISIONS.md` → "Traffic — social card pipeline" for the full design
rationale and what's still needed to automate posting.

## Usage

```bash
# Next place in rotation (auto-advances through all 67 published
# prefectures/municipalities, then loops back to the start)
npm run social-card

# A specific place
npm run social-card -- --slug=kyoto --type=municipality
npm run social-card -- --slug=hokkaido

# Preview what's next without generating anything
npm run social-card -- --list
```

`--type=prefecture|municipality` is only required when a slug exists in
both collections (e.g. "kyoto" is both Kyoto Prefecture and Kyoto City) —
the script errors out and tells you when that's the case.

Output lands in `social-cards-output/<collection>-<slug>/`:
`01-cover.png`, `02-stats.png`, `03-highlight.png`, `04-cta.png`,
`caption.txt`. That folder is gitignored — regenerate any time.

## What it pulls from

Reads frontmatter directly from `src/content/{prefectures,municipalities}`
markdown files (name, nameJa, tagline, heroImage, population, areaKm2,
scores, highlights). No Astro build needed first.

## Daily notification via ntfy

`--notify` pushes the generated cards + caption to [ntfy](https://ntfy.sh)
as phone/desktop notifications: one summary (with a button to open the
article), one plain-text message with the full caption (readable and
copy-pasteable straight from the notification), and one attachment
message per card image (downloadable from the notification itself).

```bash
NTFY_TOPIC=your-topic-name npm run social-card -- --notify
# or, self-hosted ntfy:
NTFY_TOPIC=your-topic-name NTFY_SERVER=https://ntfy.example.com npm run social-card -- --notify
```

Install the [ntfy app](https://ntfy.sh/#subscribe) (iOS/Android/web/desktop)
and subscribe to the same topic to receive these.

**Treat the topic name like a password** — anyone who knows it can read
your notifications (and publish fake ones) on the public ntfy.sh server.
Use a long, random, hard-to-guess string, not something like "japan-blog".

### Daily automation

`.github/workflows/social-card-daily.yml` runs this on a schedule (23:00
UTC = 08:00 JST) via GitHub Actions, so it works even when no local
machine or Claude Code session is running. Setup (one-time, in the GitHub
web UI): **Settings → Secrets and variables → Actions → New repository
secret**, add `NTFY_TOPIC` (required) and, only if self-hosting ntfy
instead of ntfy.sh, `NTFY_SERVER`. The workflow also commits
`state.json`'s rotation update back to the repo after each run — this
needs the repo's Actions setting **Settings → Actions → General →
Workflow permissions** set to "Read and write permissions" (the GitHub
default is usually read-only).

You can also trigger it manually from the **Actions** tab → "Daily social
card" → **Run workflow**, instead of waiting for the schedule.

## Known limitation

Card 1 (cover) tries to load the place's `heroImage` (a Wikimedia Commons
URL) as a background image. If that request fails — this sandbox's own
network policy blocks wikimedia.org, so every test render in-session came
out as a plain gradient — the template falls back to the gradient
gracefully rather than breaking. Verify on a real machine/CI runner
(where wikimedia.org isn't blocked) that hero images actually load before
relying on the cover card looking right.
