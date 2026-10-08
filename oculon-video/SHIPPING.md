# Oculon — official-brand notification stream

This updated composition follows the latest brief: vertical 1080 × 1920, 60 fps,
49 exact features, a quiet opening, accelerating frosted-glass notifications,
controlled deceleration, and a held final stack. No Slack branding, end card,
count reveal, or closing slogan is included in this composition.

## Original brand assets

The files supplied in `videoo.zip` are copied byte-for-byte:

- `Post Template (3).jpg` → `public/assets/background.jpg` (2160 × 2700).
- `Frame 1437254059 (1).png` → `public/assets/oculon-logo.png` (874 × 665, RGBA).

Original hashes are recorded in `public/assets/brand-originals.json` and enforced
by the export preflight. The entire supplied logo artwork, including its small
secondary mark, is preserved. No crop, filter, recolor, redraw, or geometry
change is applied. The dark artwork sits on a light translucent tile for contrast
and uses `object-fit: contain` in every notification.

The background is static with `object-fit: cover` and left/top alignment. Its
4:5 aspect ratio requires horizontal cropping to fill the 9:16 output. Left
alignment retains the embedded upper-left brand mark. No gradients, recoloring,
zoom, parallax, or image editing are applied to the background.

Inter fonts are local and licensed. The glass uses native Chromium backdrop
blur/saturation and translucent highlights. Subtle velocity-dependent text
trails are capped at 1.6 pixels and do not filter or duplicate the logo.

## Files

- `src/data/features.ts`: complete editable dataset with stable IDs and optional
  short titles. Categories are metadata, never separate animated sections.
- `src/shipping/config.ts`: asset paths, sizing, arrival timing, acceleration,
  deceleration, entrance, stack motion, visible-card count, and final hold.
- `src/shipping/FeatureNotification.tsx`: reusable official-brand glass card.
- `src/shipping/NotificationStream.tsx`: deterministic frame-based spring
  entrances and shared vertical displacement. Card separation is always
  card height plus gap, including during overlapping movement intervals.
- `src/shipping/ShippingVideo.tsx`: static background and notifications only.
- `scripts/validate-brand.cjs`: validates file availability and basic format,
  records hashes and PNG dimensions. Missing originals cause a nonzero exit.
- `scripts/validate-timeline.cjs`: checks dataset completeness, arrival order,
  acceleration/deceleration, constant card spacing, final hold, and growth of
  duration when features are added.
- `scripts/render-shipping.cjs`: asset-gated MP4 export and decode verification.

Inter is bundled locally under `public/assets` with its license. Existing
landscape compositions are retained as previous versions; select the new
composition for this brief.

## Commands

```bash
cd /workspace/linkedinstrtagey/oculon-video
npm ci
npm run dev -- --no-open
npm run lint
npm run validate:shipping
npm run validate:brand
npm run build
npm run render:shipping
```

Choose **Oculon-Shipping-Glass** in Studio. Duration is calculated from the full
feature list; adding entries extends the composition. The default timeline is
17.68 seconds (1061 frames at 60 fps). The updated brief does not require sound; this new
composition is silent.

Before final rendering, inspect stills at frames 90 (beginning), 420 (building),
900 (avalanche), and the final frame reported by `validate:shipping`. Use:

```bash
npx remotion still src/index.ts Oculon-Shipping-Glass out/shipping-peak.png --frame=720 --browser-executable=/usr/bin/chromium
```

Check actual logo contrast and unchanged proportions, background framing,
glass transparency, text overflow, and consistent placement. If a long label
does not fit, use an approved short title while retaining the full original in
the dataset. `render:shipping` writes `out/oculon-shipping-glass.mp4`.

Brand assets, timeline, TypeScript, lint, bundling, and representative frames
have been validated. This composition is the current brief; landscape Version A
and Version B are previous explorations.

Final export verified: H.264, 1080 × 1920, 60 fps, 1061 frames,
17.683333 seconds. Full-file FFmpeg decoding passed. The MP4 is silent.
