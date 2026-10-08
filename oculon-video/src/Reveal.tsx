import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { base, Wordmark } from "./design";
import { theme, updates } from "./content";
export const Reveal = ({ compact = false }: { compact?: boolean }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{ ...base, justifyContent: "center", alignItems: "center" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: interpolate(frame, [0, 0.12 * fps], [0, 1], {
            extrapolateRight: "clamp",
          }),
          scale: interpolate(frame, [0, 0.5 * fps], [1.16, 1], {
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          }),
        }}
      >
        <div
          style={{
            fontSize: compact ? 430 : 500,
            fontWeight: 700,
            lineHeight: 0.93,
            letterSpacing: -38,
            color: theme.accent,
            marginLeft: -30,
          }}
        >
          {updates.length}
        </div>
        <div
          style={{
            fontSize: 95,
            fontWeight: 700,
            letterSpacing: 15,
            marginTop: 25,
          }}
        >
          UPDATES
        </div>
        <div
          style={{
            fontSize: 28,
            letterSpacing: 5,
            color: theme.muted,
            marginTop: 35,
          }}
        >
          SHIPPED IN SEPTEMBER
        </div>
        {compact ? (
          <div style={{ marginTop: 36 }}>
            <Wordmark size={54} />
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};
export const Branding = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        ...base,
        justifyContent: "center",
        alignItems: "center",
        opacity: interpolate(frame, [0, 0.18 * fps], [0, 1], {
          extrapolateRight: "clamp",
        }),
      }}
    >
      <Wordmark size={150} />
      <div style={{ fontSize: 42, color: theme.muted, marginTop: 30 }}>
        We’ve been busy.
      </div>
    </AbsoluteFill>
  );
};
