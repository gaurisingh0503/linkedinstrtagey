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
          letterSpacing: 2.1,
          color: "rgba(255,255,255,.64)",
          marginBottom: 10,
        }}
      >
        OCULON · PRODUCT UPDATE
      </div>
      <div
        style={{
          fontSize: animation.titleFontSize,
          fontWeight: 600,
          letterSpacing: -0.5,
          color: "#FFFFFF",
          whiteSpace: "nowrap",
          lineHeight: 1.2,
        }}
      >
        {title}{" "}
        <span style={{ fontWeight: 400, color: "rgba(255,255,255,.66)" }}>
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
          "linear-gradient(135deg,rgba(255,255,255,.12),rgba(255,255,255,.02))",
        backdropFilter: "blur(24px) saturate(160%)",
        WebkitBackdropFilter: "blur(24px) saturate(160%)",
        boxShadow:
          "0 12px 40px rgba(0,0,0,.24),inset 0 1px 0 rgba(255,255,255,.12)",
        display: "flex",
        alignItems: "center",
        gap: 24,
        padding: "20px 24px",
        fontFamily: "Inter,sans-serif",
      }}
    >
      <div
        style={{
          width: animation.logoWidth,
          height: animation.logoHeight,
          flexShrink: 0,
          backgroundColor: "rgba(255,255,255,.82)",
          borderRadius: 10,
          padding: 4,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Img
          src={staticFile(brandAssets.logo)}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
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
          color: "rgba(255,255,255,.3)",
          alignSelf: "flex-start",
          marginTop: 1,
        }}
      >
        ×
      </div>
    </div>
  );
};
