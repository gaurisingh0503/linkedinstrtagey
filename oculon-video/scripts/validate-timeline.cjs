const assert = require("node:assert/strict");
const path = require("node:path");
const { load } = require("./load-ts.cjs");
const root = path.resolve(__dirname, "..");
const { features } = load(path.join(root, "src/data/features.ts"));
const { animation, createSchedule, stackShift } = load(
  path.join(root, "src/shipping/config.ts"),
);
assert.equal(features.length, 49, "Every supplied feature must be represented");
assert.equal(new Set(features.map((f) => f.id)).size, features.length);
const schedule = createSchedule(features.length);
assert.equal(schedule.arrivals.length, features.length);
for (let i = 1; i < schedule.arrivals.length; i++)
  assert.ok(schedule.arrivals[i] > schedule.arrivals[i - 1]);
assert.ok(
  schedule.durationInFrames / animation.fps <= 18,
  "Default 49-feature timeline fits the brief",
);
const expectedCounts = {
  Comparisons: 7,
  "Scenario Controls": 6,
  "Shared Dimensions": 5,
  "Database Queries": 4,
  "Model Grid & Editing": 5,
  Formulas: 5,
  Charts: 5,
  "Automation & AI": 3,
  "Navigation & Polish": 6,
  "Card Editing": 3,
};
for (const [category, count] of Object.entries(expectedCounts))
  assert.equal(features.filter((f) => f.category === category).length, count);
const intervals = schedule.arrivals
  .slice(1)
  .map((f, i) => f - schedule.arrivals[i]);
assert.ok(Math.min(...intervals) / animation.fps >= animation.minimumInterval);
assert.ok(intervals[0] > intervals[15]);
assert.ok(intervals[15] > intervals[26]);
assert.ok(intervals.at(-1) > intervals.at(-2));
assert.ok(intervals.at(-2) > intervals.at(-3));
const step = animation.cardHeight + animation.cardGap;
for (let frame = 0; frame < schedule.durationInFrames; frame++) {
  const shift = stackShift(frame, schedule.arrivals, animation.fps);
  for (let i = 1; i < features.length; i++) {
    const previous = animation.stackBottom + (i - 1 - shift) * step;
    const current = animation.stackBottom + (i - shift) * step;
    assert.ok(
      Math.abs(current - previous - step) < 1e-6,
      "Cards must never collide",
    );
  }
}
const holdStart =
  schedule.durationInFrames - Math.ceil(animation.finalHold * animation.fps);
assert.equal(
  stackShift(holdStart, schedule.arrivals, animation.fps),
  features.length - 1,
);
assert.equal(
  stackShift(schedule.durationInFrames - 1, schedule.arrivals, animation.fps),
  features.length - 1,
);
assert.ok(
  createSchedule(features.length + 1).durationInFrames >
    schedule.durationInFrames,
  "Duration grows when features are added",
);
console.log(
  JSON.stringify(
    {
      features: features.length,
      frames: schedule.durationInFrames,
      fps: animation.fps,
      seconds: schedule.durationInFrames / animation.fps,
      firstArrival: schedule.arrivals[0] / animation.fps,
      lastArrival: schedule.arrivals.at(-1) / animation.fps,
      finalHold: animation.finalHold,
      minimumInterval: Math.min(...intervals) / animation.fps,
      arrivals: schedule.arrivals,
    },
    null,
    2,
  ),
);
