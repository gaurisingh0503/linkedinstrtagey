import { Img, staticFile } from "remotion";
import type { Feature } from "../data/features";
import { animation, brandAssets } from "./config";
import "./brand";
type Props = {
  feature: Feature;
  x: number;
  y: number;
  opacity: number;
  trail: number;
};
export const FeatureNotification = ({
  feature,
  x,
  y,
  opacity,
  trail,
}: Props) => {
  const title = feature.shortTitle ?? feature.title;
  const content = (
    <>
      <div
        style={{
          fontSize: 15,
          fontWeight: 600,
          letterSpacing: 0.8,
          color: "rgba(255,255,255,.64)",
          marginBottom: 10,
        }}
      >
        OCULON
      </div>
      <div
        style={{
          fontSize: animation.titleFontSize,
          fontWeight: 600,
          letterSpacing: -0.5,
          color: "#F8F6FC",
          whiteSpace: "nowrap",
          lineHeight: 1.2,
        }}
      >
        {title}{" "}
        <span style={{ fontWeight: 400, color: "rgba(255,255,255,.7)" }}>
          shipped
        </span>
      </div>
    </>
  );
  return (
    <div
      data-feature-id={feature.id}
      style={{
        position: "absolute",
        left: (animation.width - animation.cardWidth) / 2,
        top: y,
        width: animation.cardWidth,
        height: animation.cardHeight,
        boxSizing: "border-box",
        translate: `${x}px 0`,
        opacity,
        borderRadius: animation.cardRadius,
        border: "1px solid rgba(255,255,255,.13)",
        borderTopColor: "rgba(255,255,255,.22)",
        background:
          "linear-gradient(115deg,rgba(251,239,249,.16),rgba(235,231,249,.10) 52%,rgba(220,234,248,.08))",
        backdropFilter: "blur(24px) saturate(125%)",
        WebkitBackdropFilter: "blur(24px) saturate(125%)",
        boxShadow:
          "0 8px 26px rgba(0,0,0,.10),inset 0 1px 0 rgba(255,255,255,.12)",
        display: "flex",
        alignItems: "center",
        gap: 24,
        padding: "20px 24px",
        fontFamily: "Inter,sans-serif",
      }}
    >
      <div
        style={{
          position: "relative",
          width: animation.logoWidth,
          height: animation.logoHeight,
          flexShrink: 0,
          overflow: "hidden",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Img
          src={staticFile(brandAssets.logo)}
          // User requested only the large mark. The original PNG stays
          // unchanged; its 584x665 primary mark is isolated with a viewport.
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: animation.logoHeight,
            width: (animation.logoHeight * 874) / 665,
            maxWidth: "none",
            objectFit: "contain",
          }}
        />
      </div>
      <div style={{ position: "relative", flex: 1, minWidth: 0 }}>
        {trail > 0.01 ? (
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              opacity: animation.motionBlurIntensity,
              translate: `0 -${trail}px`,
            }}
          >
            {content}
          </div>
        ) : null}
        {content}
      </div>
      <div
        aria-hidden
        style={{
          fontSize: 22,
          lineHeight: 1,
          color: "rgba(255,255,255,.4)",
          alignSelf: "flex-start",
          marginTop: 1,
        }}
      >
        ×
      </div>
    </div>
  );
};
