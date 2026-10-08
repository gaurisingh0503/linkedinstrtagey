import { loadFont } from "@remotion/fonts";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { brandAssets } from "./config";
await Promise.all([
  loadFont({
    family: "Inter",
    url: staticFile("assets/inter-latin-400-normal.woff2"),
    weight: "400",
  }),
  loadFont({
    family: "Inter",
    url: staticFile("assets/inter-latin-600-normal.woff2"),
    weight: "600",
  }),
]);
export const Background = () => (
  <AbsoluteFill>
    <Img
      src={staticFile(brandAssets.background)}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "left top",
      }}
    />
  </AbsoluteFill>
);
