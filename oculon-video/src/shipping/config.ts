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
  horizontalTravel: 104,
  stackMoveDuration: 0.38,
  cardWidth: 820,
  cardHeight: 126,
  cardRadius: 22,
  titleFontSize: 26,
  cardGap: 16,
  maxVisibleCards: 7,
  stackBottom: 1300,
  logoWidth: 96,
  logoHeight: 84,
  motionBlurIntensity: 0.16,
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
// All cards share the same displacement. Their vertical separation never changes.
export const stackShift = (
  frame: number,
  arrivals: readonly number[],
  fps: number,
) =>
  arrivals.reduce((total, arrival) => {
    const p = Math.max(
      0,
      Math.min(1, (frame - arrival) / (animation.stackMoveDuration * fps)),
    );
    return total + 1 - Math.pow(1 - p, 3);
  }, 0) - 1;
