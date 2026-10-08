import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { features } from "../data/features";
import { animation, createSchedule, stackShift } from "./config";
import { FeatureNotification } from "./FeatureNotification";
export const NotificationStream = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { arrivals } = createSchedule(features.length, fps);
  const displacement = stackShift(frame, arrivals, fps);
  const speed = Math.max(
    0,
    (displacement - stackShift(frame - 1, arrivals, fps)) *
      (animation.cardHeight + animation.cardGap),
  );
  const bottom = animation.stackBottom;
  const top =
    bottom -
    (animation.maxVisibleCards - 1) *
      (animation.cardHeight + animation.cardGap);
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {features.map((feature, i) => {
        const age = frame - arrivals[i];
        if (age < 0) return null;
        const y =
          bottom +
          (i - displacement) * (animation.cardHeight + animation.cardGap);
        if (y < top - animation.cardHeight - 50 || y > animation.height)
          return null;
        const progress = spring({
          frame: age,
          fps,
          durationInFrames: Math.ceil(animation.entranceDuration * fps),
          config: {
            damping: 200,
            stiffness: 240,
            mass: 0.8,
            overshootClamping: true,
          },
        });
        const entrance = interpolate(age, [0, 0.15 * fps], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const exit = interpolate(
          y,
          [top - animation.cardHeight, top - 20],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        return (
          <FeatureNotification
            key={feature.id}
            feature={feature}
            x={animation.horizontalTravel * (1 - progress)}
            y={y}
            opacity={entrance * exit}
            trail={Math.min(1.6, speed * 0.08)}
          />
        );
      })}
    </AbsoluteFill>
  );
};
