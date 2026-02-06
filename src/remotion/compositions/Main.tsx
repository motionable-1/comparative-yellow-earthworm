import React from "react";
import { AbsoluteFill, Artifact, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { loadFont as loadSpaceGrotesk } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { HookScene } from "./scenes/HookScene";
import { SolutionScene } from "./scenes/SolutionScene";
import { ResultsScene } from "./scenes/ResultsScene";
import { CTAScene } from "./scenes/CTAScene";
import { flashWhite } from "../library/components/layout/transitions/presentations/flashWhite";
import { whipPan } from "../library/components/layout/transitions/presentations/whipPan";
import { glitch } from "../library/components/layout/transitions/presentations/glitch";
import { SoundDesign } from "./SoundDesign";

// 15 second ad @ 30fps = 450 frames
// Scene 1 (Hook): 0-3s = 90 frames
// Transition: 8 frames
// Scene 2 (Solution): 3-7s = 120 frames
// Transition: 10 frames
// Scene 3 (Results): 7-11s = 120 frames
// Transition: 8 frames
// Scene 4 (CTA): 11-16s = 150 frames (extra hold at end)
// Total: 90 + 120 + 120 + 150 - 8 - 10 - 8 = 454 frames

export const Main: React.FC = () => {
  const { fontFamily: headingFont } = loadSpaceGrotesk("normal", {
    weights: ["500", "600", "700"],
    subsets: ["latin"],
  });
  const { fontFamily: bodyFont } = loadInter("normal", {
    weights: ["400", "500", "600"],
    subsets: ["latin"],
  });

  const frame = useCurrentFrame();

  return (
    <>
      {frame === 0 && (
        <Artifact content={Artifact.Thumbnail} filename="thumbnail.jpeg" />
      )}
      <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
        {/* Sound Design Layer */}
        <SoundDesign />

        <TransitionSeries>
          {/* Scene 1: Hook - "Your Ads Are Boring" */}
          <TransitionSeries.Sequence durationInFrames={90}>
            <HookScene headingFont={headingFont} bodyFont={bodyFont} />
          </TransitionSeries.Sequence>

          {/* Transition: Glitch cut */}
          <TransitionSeries.Transition
            presentation={glitch()}
            timing={linearTiming({ durationInFrames: 8 })}
          />

          {/* Scene 2: Solution - "Make Them Unforgettable" */}
          <TransitionSeries.Sequence durationInFrames={120}>
            <SolutionScene headingFont={headingFont} bodyFont={bodyFont} />
          </TransitionSeries.Sequence>

          {/* Transition: Flash white impact */}
          <TransitionSeries.Transition
            presentation={flashWhite()}
            timing={linearTiming({ durationInFrames: 10 })}
          />

          {/* Scene 3: Results - Stats */}
          <TransitionSeries.Sequence durationInFrames={120}>
            <ResultsScene headingFont={headingFont} bodyFont={bodyFont} />
          </TransitionSeries.Sequence>

          {/* Transition: Whip pan */}
          <TransitionSeries.Transition
            presentation={whipPan()}
            timing={linearTiming({ durationInFrames: 8 })}
          />

          {/* Scene 4: CTA - "Start Today" */}
          <TransitionSeries.Sequence durationInFrames={150}>
            <CTAScene headingFont={headingFont} bodyFont={bodyFont} />
          </TransitionSeries.Sequence>
        </TransitionSeries>
      </AbsoluteFill>
    </>
  );
};
