import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { base, Wordmark } from "./design";
import { theme } from "./content";
export const Trigger = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{ ...base, justifyContent: "center", alignItems: "center" }}
    >
      <div style={{ position: "absolute", left: 112, top: 75 }}>
        <Wordmark size={44} />
      </div>
      <div
        style={{
          width: 1640,
          height: 650,
          border: `1px solid ${theme.border}`,
          borderRadius: 22,
          overflow: "hidden",
          background: "#1A1D21",
          display: "flex",
          translate: `0 ${interpolate(frame, [0, 0.4 * fps], [22, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) })}px`,
        }}
      >
        <div
          style={{
            width: 290,
            background: "#201A24",
            padding: "36px 28px",
            borderRight: `1px solid ${theme.border}`,
          }}
        >
          <div style={{ fontSize: 30, fontWeight: 700, marginBottom: 58 }}>
            Oculon HQ ⌄
          </div>
          <div style={{ color: theme.muted, fontSize: 23, marginBottom: 20 }}>
            Channels
          </div>
          <div
            style={{
              background: "#49394F",
              borderRadius: 8,
              padding: "14px 18px",
              fontSize: 28,
            }}
          >
            # shipped
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              padding: "27px 40px",
              borderBottom: `1px solid ${theme.border}`,
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            # shipped{" "}
            <span
              style={{
                color: theme.muted,
                marginLeft: 24,
                fontSize: 20,
                fontWeight: 400,
              }}
            >
              Product updates
            </span>
          </div>
          <div
            style={{
              margin: "70px 52px 0",
              fontSize: 48,
              lineHeight: 1.42,
              letterSpacing: -1.6,
            }}
          >
            Hey{" "}
            <span
              style={{
                color: "#C5E4FA",
                background: "#20455A",
                borderRadius: 5,
                padding: "0 8px",
              }}
            >
              @channel
            </span>
            , can everyone drop
            <br />
            everything we shipped in September here?
          </div>
          <div
            style={{
              margin: "65px 40px 0",
              border: `1px solid ${theme.border}`,
              borderRadius: 12,
              padding: "23px 30px",
              color: "#747B80",
              fontSize: 23,
            }}
          >
            Message #shipped
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
