# Oculon — short iPhone-style scrolling section

Current revision: **9.8 seconds**, 1080 × 1920, 60 fps, 588 frames, H.264.
All 49 exact feature titles appear in their supplied order. The stream starts
slowly and accelerates to 12 updates per second. It ends at full scrolling
speed for a later transition. There is no slowdown, final hold, end card,
count reveal, or slogan. The video is silent.

## Original brand assets

- `Post Template (3).jpg` → `public/assets/background.jpg` (2160 × 2700).
- `Frame 1437254059 (1).png` → `public/assets/oculon-logo.png` (874 × 665, RGBA).

Both files are byte-for-byte copies of the uploaded ZIP contents. Their hashes
are recorded in `public/assets/brand-originals.json` and checked before export.
The static background uses cover with left/top alignment, retaining the mark
embedded in its upper-left corner.

Following the user's latest request to show only the large logo, the notification
uses a CSS viewport containing the original artwork's 584 × 665 primary mark.
The secondary miniature mark in the PNG is outside that viewport. The file,
primary mark's geometry, colors, and transparency are unchanged. No redraw or
filter is applied. Do not restore the secondary miniature mark in notifications.

Cards borrow the supplied iPhone notification reference's rounded corners,
light translucent glass, dark typography, compact brand heading, and soft
shadow. No phone frame, wallpaper, real people, or timestamps are added.
Inter fonts are local with their license under `public/assets`.

## Edit and preview

- `src/data/features.ts`: all 49 exact labels, stable IDs, metadata categories.
- `src/shipping/config.ts`: timing, acceleration, sizing, and asset paths.
- `src/shipping/FeatureNotification.tsx`: notification material and brand layout.
- `src/shipping/NotificationStream.tsx`: frame-driven entrances and row positions.
- `src/shipping/ShippingVideo.tsx`: static background and animated feed only.

One monotone cubic scroll track moves every row together, preserving spacing
and velocity continuity. Its endpoint continues linearly at full speed so the
video can cut directly into a future transition. Duration grows automatically
when the feature list changes; entries are never silently dropped.

```bash
cd /workspace/linkedinstrtagey/oculon-video
npm ci
npm run dev -- --no-open
```

Select **Oculon-Shipping-Glass**. Previous compositions/exports remain as earlier
explorations. The cloud onboarding UI does not expose localhost previews.

## Validate and export

```bash
npm run lint
npm run validate:shipping
npm run validate:brand
npm run build
npm run render:shipping -- out/oculon-shipping-glass-v4.mp4
```

Timeline validation checks dataset/category completeness, strictly increasing
arrivals, frequency that never slows down, continuous forward scrolling,
constant card spacing, nonzero final speed, and automatic duration growth.
Asset validation checks availability, formats, and original hashes. The export
script verifies full-file decoding and reports output metadata.

Representative frames: 80 (beginning), 260 (building), 500 (peak), 587 (last).
For example:

```bash
npx remotion still src/index.ts Oculon-Shipping-Glass out/ios-peak.png --frame=500 --browser-executable=/usr/bin/chromium
```

Check single primary logo, card contrast, frosted material, text fit, spacing,
and safe horizontal bounds. The final frame should still show fast scrolling.

The current glass revision uses only 8–16% tinted fill, a 24px backdrop blur, subtle borders, and light text, allowing the original background to show through the cards.
