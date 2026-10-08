import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { arrivalsA, theme, updates } from "./content";
import { base, SlackMark, Wordmark } from "./design";
export const Avalanche = () => {
  const local = useCurrentFrame();
  const { fps } = useVideoConfig();
  const frame = local + 2 * fps;
  const visible = updates.filter((_, i) => frame >= arrivalsA[i] * fps);
  const latest = visible.length - 1;
  const position =
    arrivalsA.reduce(
      (sum, t) =>
        sum +
        interpolate(frame, [t * fps, t * fps + 0.22 * fps], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        }),
      0,
    ) - 1;
  return (
    <AbsoluteFill style={base}>
      <div style={{ position: "absolute", left: 112, top: 75 }}>
        <Wordmark size={44} />
      </div>
      <div
        style={{
          position: "absolute",
          right: 112,
          top: 85,
          fontSize: 24,
          color: theme.muted,
        }}
      >
        SEPTEMBER / #SHIPPED
      </div>
      {visible.map((update, i) => {
        const depth = position - i;
        if (depth > 11) return null;
        const age = frame - arrivalsA[i] * fps;
        return (
          <div
            key={update.id}
            style={{
              position: "absolute",
              width: 1100,
              height: 150,
              left: 410 + ((i % 3) - 1) * 26,
              top: 756 - depth * 94,
              zIndex: i,
              background: "#24272A",
              border: `1px solid ${i === latest ? "#697461" : "#404548"}`,
              borderRadius: 17,
              boxShadow: "0 18px 55px #0006",
              padding: "24px 34px",
              display: "flex",
              alignItems: "center",
              gap: 28,
              opacity:
                Math.max(0.18, 1 - Math.max(0, depth) * 0.085) *
                interpolate(age, [0, 0.12 * fps], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              translate: `${interpolate(age, [0, 0.25 * fps], [180, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) })}px 0`,
              scale: 1 - Math.max(0, depth) * 0.012,
            }}
          >
            <SlackMark />
            <div style={{ flex: 1 }}>
              <div
                style={{ fontSize: 21, color: theme.muted, marginBottom: 10 }}
              >
                Oculon HQ <span style={{ margin: "0 9px" }}>·</span> #shipped
              </div>
              <div
                style={{ fontSize: 37, fontWeight: 700, letterSpacing: -0.8 }}
              >
                Shipped {update.label.toLowerCase()}
              </div>
            </div>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 100,
                background: "#344332",
                color: theme.accent,
                textAlign: "center",
                fontSize: 24,
                lineHeight: "36px",
              }}
            >
              ✓
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
