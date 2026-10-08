# Oculon — product shipping animation

The latest export is [Short iPhone-style revision 3](out/oculon-shipping-ios-v3.mp4).
The current composition is **Oculon-Shipping-Glass**: all 49 exact features, official
uploaded brand assets, iPhone-style frosted notifications with continuous accelerating scrolling, 1080 × 1920,
60 fps, 9.8 seconds. See [SHIPPING.md](SHIPPING.md) for configuration,
asset provenance, preview, and export instructions.

```bash
npm ci
npm run dev -- --no-open
npm run render:shipping
```

The rest of this document describes the earlier landscape explorations.

# Earlier landscape explorations

Editable React + Remotion videos, 1920 × 1080, 30 fps, H.264 MP4 with AAC audio.

- **Oculon-A-Slack-Avalanche**: 15 seconds. Trigger (0–2), individual alerts (2–5), accelerating avalanche (5–10), collapse (10–10.4), 49 updates reveal (10.4–13), branding (13–15).
- **Oculon-B-Minimal-Cascade**: 12 seconds. Dark opening (0–1), increasingly dense changelog (1–9), upward clear (9–11), reveal and branding (11–12).

## Develop

Use the existing checkout; cloud tasks are already isolated. Node 24 and npm 11 were verified. Python 3 is used only to regenerate the original sound effects. System Chromium is used for rendering.

```bash
cd /workspace/linkedinstrtagey/oculon-video
npm ci
npm run dev -- --no-open
```

Studio shows two main compositions and individually selectable scene compositions. The cloud onboarding UI does not expose a localhost preview; Studio is available within the environment.

## Customize

- `src/content.ts`: category counts, supplied feature labels, arrival schedules, palette.
- Scene files: card styling, trigger text, reveal, and branding.
- `src/Root.tsx`: each composition's frame rate, duration, dimensions, and scene timing.
- `src/design.tsx`: editable typographic Oculon stand-in and Slack-inspired icon. Replace the wordmark with the actual logo when available.
- `scripts/audio.py`: original two-tone alerts and reveal impact. Regenerate with `python3 scripts/audio.py`. Arrival formulas mirror `content.ts`; update both when changing pacing. Replace `public/version-a.wav` or `version-b.wav` to insert approved sound assets. Audio nodes are in `Root.tsx`.

All 49 updates are represented using the brief's exact category totals. Only 25 unique labels were supplied: labels repeat within their categories rather than inventing capabilities. Each entry has an independent ID. Supply the full changelog to replace repeated labels with exact update names. No official logo or Oculon Slack screenshots were provided; styling is an approximation.

Fonts are bundled locally for deterministic rendering; the DejaVu license is in `public/FONT-LICENSE.txt`. Audio is synthesized locally, with no voiceover or third-party recordings.

## Validate and export

```bash
npm run lint
npm run build
npx remotion render src/index.ts Oculon-A-Slack-Avalanche out/oculon-version-a.mp4 --browser-executable=/usr/bin/chromium --codec=h264 --crf=18 --concurrency=3
npx remotion render src/index.ts Oculon-B-Minimal-Cascade out/oculon-version-b.mp4 --browser-executable=/usr/bin/chromium --codec=h264 --crf=18 --concurrency=3
```

`out/` contains final MP4s and diagnostic frames, and is ignored by Git. `build/` and `node_modules/` are also ignored. No credentials or external services are required.

For an exact 15- or 12-second container duration, finalize Remotion's AAC export
(the raw export may include an extra audio packet):

```bash
ffmpeg -i out/oculon-version-a.mp4 -t 15 -c:v copy -c:a aac -b:a 192k -movflags +faststart out/a-final.mp4
ffmpeg -i out/oculon-version-b.mp4 -t 12 -c:v copy -c:a aac -b:a 192k -movflags +faststart out/b-final.mp4
```

Verify those outputs before replacing the original exports. The delivered MP4s
have already been finalized and fully decoded without errors.
