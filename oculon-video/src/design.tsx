import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
import { theme } from "./content";
await Promise.all([
  loadFont({
    family: "Studio Sans",
    url: staticFile("StudioSans.ttf"),
    weight: "400",
  }),
  loadFont({
    family: "Studio Sans",
    url: staticFile("StudioSans-Bold.ttf"),
    weight: "700",
  }),
]);
export const base = {
  backgroundColor: theme.background,
  color: theme.text,
  fontFamily: "Studio Sans, sans-serif",
};
// Typographic placeholder: replace with the official logo when supplied.
export const Wordmark = ({ size = 64 }: { size?: number }) => (
  <div
    style={{ fontSize: size, fontWeight: 700, letterSpacing: -size * 0.055 }}
  >
    oculon<span style={{ color: theme.accent }}>.</span>
  </div>
);
export const SlackMark = () => (
  <svg width="46" height="46" viewBox="0 0 46 46">
    <rect x="8" y="3" width="8" height="24" rx="4" fill="#36C5F0" />
    <rect x="3" y="30" width="24" height="8" rx="4" fill="#2EB67D" />
    <rect x="30" y="19" width="8" height="24" rx="4" fill="#ECB22E" />
    <rect x="19" y="8" width="24" height="8" rx="4" fill="#E01E5A" />
  </svg>
);
