const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");
const { load } = require("./load-ts.cjs");
const root = path.resolve(__dirname, "..");
process.chdir(root);
const run = (cmd, args) => {
  const result = spawnSync(cmd, args, { stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
};
run(process.execPath, ["scripts/validate-brand.cjs"]);
run(process.execPath, ["scripts/validate-timeline.cjs"]);
const { features } = load("src/data/features.ts");
const { animation, createSchedule } = load("src/shipping/config.ts");
const duration =
  createSchedule(features.length).durationInFrames / animation.fps;
fs.mkdirSync("out", { recursive: true });
run("npx", [
  "remotion",
  "render",
  "src/index.ts",
  "Oculon-Shipping-Glass",
  "out/oculon-shipping-raw.mp4",
  "--browser-executable=/usr/bin/chromium",
  "--codec=h264",
  "--crf=18",
  "--concurrency=3",
]);
run("ffmpeg", [
  "-y",
  "-v",
  "error",
  "-i",
  "out/oculon-shipping-raw.mp4",
  "-t",
  String(duration),
  "-c:v",
  "copy",
  "-movflags",
  "+faststart",
  "out/oculon-shipping-glass.mp4",
]);
run("ffmpeg", [
  "-v",
  "error",
  "-i",
  "out/oculon-shipping-glass.mp4",
  "-f",
  "null",
  "-",
]);
run("ffprobe", [
  "-v",
  "error",
  "-show_entries",
  "stream=codec_name,width,height,r_frame_rate,nb_frames",
  "-show_entries",
  "format=duration",
  "-of",
  "json",
  "out/oculon-shipping-glass.mp4",
]);
