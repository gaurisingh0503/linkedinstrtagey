export const animation = {
  fps: 60,
  width: 1080,
  height: 1920,
  firstDelay: 0.65,
  initialInterval: 1.05,
  minimumInterval: 0.14,
  accelerationPower: 4.5,
  decelerationCards: 3,
  decelerationIntervals: [0.25, 0.45, 0.72],
  entranceDuration: 0.4,
  horizontalTravel: 76,
  stackMoveDuration: 0.38,
  cardWidth: 820,
  cardHeight: 126,
  cardRadius: 22,
  titleFontSize: 26,
  cardGap: 16,
  maxVisibleCards: 7,
  stackBottom: 1300,
  logoWidth: 56,
  logoHeight: 56,
  motionBlurIntensity: 0.09,
  finalHold: 0.8,
} as const;
export const brandAssets = {
  // Preserve the supplied extension when placing originals in public/assets.
  background: "assets/background.jpg",
  logo: "assets/oculon-logo.png",
} as const;
export const createSchedule = (count: number, fps: number = animation.fps) => {
  const arrivals: number[] = [];
  let arrivalFrame = Math.ceil(animation.firstDelay * fps);
  const decelerationStart = Math.max(2, count - animation.decelerationCards);
  for (let i = 0; i < count; i++) {
    if (i > 0) {
      const progress = Math.min(
        1,
        (i - 1) / Math.max(1, decelerationStart - 2),
      );
      const interval =
        i >= decelerationStart
          ? animation.decelerationIntervals[
              Math.min(
                i - decelerationStart,
                animation.decelerationIntervals.length - 1,
              )
            ]
          : animation.minimumInterval +
            (animation.initialInterval - animation.minimumInterval) *
              Math.pow(1 - progress, animation.accelerationPower);
      arrivalFrame += Math.ceil(interval * fps);
    }
    arrivals.push(arrivalFrame);
  }
  const last = arrivals[arrivals.length - 1] ?? 0;
  const settleFrames = Math.ceil(
    Math.max(animation.entranceDuration, animation.stackMoveDuration) * fps,
  );
  return {
    arrivals,
    settleFrames,
    durationInFrames:
      last + settleFrames + Math.ceil(animation.finalHold * fps) + 1,
  };
};
// One continuous scroll track, rather than a sum of stop/start card pushes.
// Monotone cubic Hermite interpolation preserves row spacing and velocity
// continuity at every arrival. End tangents are zero for a soft settle.
export const stackShift = (
  frame: number,
  arrivals: readonly number[],
  fps: number,
): number => {
  if (!arrivals.length) return 0;
  const settle = Math.ceil(animation.entranceDuration * fps);
  const times = [arrivals[0], ...arrivals.map((f) => f + settle)];
  const values = [0, ...arrivals.map((_, i) => i)];
  if (frame <= times[0]) return 0;
  if (frame >= times[times.length - 1]) return arrivals.length - 1;
  const delta = times
    .slice(1)
    .map((t, i) => (values[i + 1] - values[i]) / (t - times[i]));
  const slopes = times.map((_, i) => {
    if (
      i === 0 ||
      i === times.length - 1 ||
      delta[i - 1] === 0 ||
      delta[i] === 0
    )
      return 0;
    const previous = times[i] - times[i - 1];
    const next = times[i + 1] - times[i];
    const w1 = 2 * next + previous;
    const w2 = next + 2 * previous;
    return (w1 + w2) / (w1 / delta[i - 1] + w2 / delta[i]);
  });
  const i = times.findIndex(
    (t, index) =>
      index < times.length - 1 && frame >= t && frame < times[index + 1],
  );
  const length = times[i + 1] - times[i];
  const t = (frame - times[i]) / length;
  return (
    (2 * t * t * t - 3 * t * t + 1) * values[i] +
    (t * t * t - 2 * t * t + t) * length * slopes[i] +
    (-2 * t * t * t + 3 * t * t) * values[i + 1] +
    (t * t * t - t * t) * length * slopes[i + 1]
  );
};
