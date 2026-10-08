import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { arrivalsB, theme, updates } from "./content";
import { base } from "./design";
export const Cascade = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scroll = interpolate(frame, [5 * fps, 9 * fps], [0, 400], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={base}>
      {updates.map((u, i) => {
        const age = frame - arrivalsB[i] * fps;
        if (age < 0) return null;
        const column = i % 5;
        const row = Math.floor(i / 5);
        return (
          <div
            key={u.id}
            style={{
              position: "absolute",
              left: 78 + column * 355,
              top: 165 + row * 130 - scroll,
              width: 342,
              height: 114,
              padding: "19px 21px",
              borderRadius: 8,
              border: `1px solid ${theme.border}`,
              background: i % 9 === 0 ? "#283026" : "#1E2223",
              opacity: interpolate(age, [0, 0.16 * fps], [0, 1], {
                extrapolateRight: "clamp",
              }),
              translate: `0 ${interpolate(age, [0, 0.35 * fps], [160, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) })}px`,
            }}
          >
            <div
              style={{
                fontSize: 14,
                color: theme.accent,
                letterSpacing: 2,
                marginBottom: 9,
              }}
            >
              SHIPPED
            </div>
            <div
              style={{
                fontSize: 27,
                lineHeight: 1.18,
                fontWeight: 700,
                letterSpacing: -0.8,
              }}
            >
              {u.label}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
