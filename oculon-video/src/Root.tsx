import { ShippingVideo } from "./shipping/ShippingVideo";
import { animation, createSchedule } from "./shipping/config";
import { features } from "./data/features";
import {
  AbsoluteFill,
  Composition,
  Folder,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { Audio } from "@remotion/media";
import { Trigger } from "./Trigger";
import { Avalanche } from "./Avalanche";
import { Cascade } from "./Cascade";
import { Reveal, Branding } from "./Reveal";
import { base } from "./design";
export const VersionA = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={base}>
      <Sequence
        name="Trigger in shipped"
        durationInFrames={2 * fps}
        premountFor={fps}
      >
        <Trigger />
      </Sequence>
      <Sequence
        name="Notification avalanche"
        from={2 * fps}
        durationInFrames={8.4 * fps}
        premountFor={fps}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            scale: interpolate(frame, [10 * fps, 10.4 * fps], [1, 0.75], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            opacity: interpolate(frame, [10 * fps, 10.4 * fps], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <Avalanche />
        </div>
      </Sequence>
      <Sequence
        name="49 updates reveal"
        from={10.4 * fps}
        durationInFrames={2.6 * fps}
        premountFor={fps}
      >
        <Reveal />
      </Sequence>
      <Sequence
        name="Oculon closing"
        from={13 * fps}
        durationInFrames={2 * fps}
        premountFor={fps}
      >
        <Branding />
      </Sequence>
      <Audio src={staticFile("version-a.wav")} premountFor={fps} />
    </AbsoluteFill>
  );
};
export const VersionB = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={base}>
      <Sequence
        name="Cascading changelog"
        durationInFrames={11 * fps}
        premountFor={fps}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            translate: `0 ${interpolate(frame, [9 * fps, 11 * fps], [0, -1400], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px`,
            opacity: interpolate(frame, [9 * fps, 10.8 * fps], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <Cascade />
        </div>
      </Sequence>
      <Sequence
        name="49 updates and Oculon"
        from={11 * fps}
        durationInFrames={fps}
        premountFor={fps}
      >
        <Reveal compact />
      </Sequence>
      <Audio src={staticFile("version-b.wav")} premountFor={fps} />
    </AbsoluteFill>
  );
};
export const RemotionRoot = () => (
  <>
    <Composition
      id="Oculon-Shipping-Glass"
      component={ShippingVideo}
      fps={60}
      width={1080}
      height={1920}
      durationInFrames={
        createSchedule(features.length, animation.fps).durationInFrames
      }
      calculateMetadata={() => ({
        durationInFrames: createSchedule(features.length, animation.fps)
          .durationInFrames,
      })}
    />
    <Composition
      id="Oculon-A-Slack-Avalanche"
      component={VersionA}
      durationInFrames={450}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="Oculon-B-Minimal-Cascade"
      component={VersionB}
      durationInFrames={360}
      fps={30}
      width={1920}
      height={1080}
    />
    <Folder name="Scenes">
      <Composition
        id="Trigger"
        component={Trigger}
        durationInFrames={60}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Avalanche"
        component={Avalanche}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Cascade"
        component={Cascade}
        durationInFrames={330}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Reveal"
        component={Reveal}
        durationInFrames={78}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ compact: false }}
      />
      <Composition
        id="Branding"
        component={Branding}
        durationInFrames={60}
        fps={30}
        width={1920}
        height={1080}
      />
    </Folder>
  </>
);
