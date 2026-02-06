import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { TextAnimation } from "../../library/components/text/TextAnimation";
import { Noise } from "../../library/components/effects/Noise";

export const HookScene: React.FC<{
  headingFont: string;
  bodyFont: string;
}> = ({ headingFont, bodyFont }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background color flash
  const bgProgress = interpolate(frame, [0, 8], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Accent bar animation
  const barScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 200 },
  });
  const barWidth = interpolate(barScale, [0, 1], [0, 100]);

  // Shake effect on "BORING"
  const shakeIntensity = interpolate(frame, [20, 30, 50], [0, 8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shakeX = Math.sin(frame * 2.5) * shakeIntensity;
  const shakeY = Math.cos(frame * 3.1) * shakeIntensity * 0.5;

  // Floating accent shapes
  const float1 = Math.sin(frame * 0.08) * 15;
  const float2 = Math.cos(frame * 0.06) * 12;
  const rotate1 = frame * 1.2;
  const rotate2 = frame * -0.8;

  // Scale pulse on accent elements
  const pulse = 1 + Math.sin(frame * 0.15) * 0.05;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #0a0a0a ${100 - bgProgress * 100}%, #1a1a1a 100%)`,
      }}
    >
      {/* Noise texture */}
      <Noise type="grain" intensity={0.3} speed={0.5} opacity={0.4} />

      {/* Accent bar top */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: "50%",
          transform: `translateX(-50%) scaleX(${barScale})`,
          width: `${barWidth}%`,
          height: 4,
          background: "linear-gradient(90deg, #FFBE0B, #FB5607, #FF006E)",
          borderRadius: 2,
          opacity: interpolate(frame, [0, 5], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      />

      {/* Floating accent shapes */}
      <div
        style={{
          position: "absolute",
          top: 120 + float1,
          right: 180,
          width: 60,
          height: 60,
          borderRadius: "50%",
          border: "3px solid #FF006E",
          opacity: interpolate(frame, [10, 20], [0, 0.4], {
            extrapolateRight: "clamp",
          }),
          transform: `rotate(${rotate1}deg) scale(${pulse})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 150 + float2,
          left: 140,
          width: 40,
          height: 40,
          background: "#FFBE0B",
          opacity: interpolate(frame, [15, 25], [0, 0.25], {
            extrapolateRight: "clamp",
          }),
          transform: `rotate(${rotate2}deg)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 200 + float2 * 0.7,
          left: 220,
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: "#8338EC",
          opacity: interpolate(frame, [18, 28], [0, 0.3], {
            extrapolateRight: "clamp",
          }),
          transform: `scale(${1 + Math.sin(frame * 0.12) * 0.15})`,
        }}
      />

      {/* Main text container */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center", position: "relative" }}>
          {/* "YOUR ADS" */}
          <TextAnimation
            className="text-[72px] font-extrabold tracking-tight leading-none"
            style={{
              fontFamily: headingFont,
              color: "#ffffff",
              textTransform: "uppercase",
              letterSpacing: "-2px",
            }}
            startFrom={0}
            createTimeline={({ textRef, tl, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "chars" });
              tl.fromTo(
                split.chars,
                { opacity: 0, y: 80, scaleY: 0.3 },
                {
                  opacity: 1,
                  y: 0,
                  scaleY: 1,
                  duration: 0.4,
                  stagger: 0.03,
                  ease: "back.out(2.5)",
                },
              );
              return tl;
            }}
          >
            Your Ads
          </TextAnimation>

          {/* "ARE BORING" */}
          <div
            style={{
              transform: `translate(${shakeX}px, ${shakeY}px)`,
            }}
          >
            <TextAnimation
              className="text-[96px] font-black tracking-tighter leading-none"
              style={{
                fontFamily: headingFont,
                color: "#FF006E",
                textTransform: "uppercase",
                letterSpacing: "-3px",
                marginTop: -8,
              }}
              startFrom={8}
              createTimeline={({ textRef, tl, SplitText }) => {
                const split = new SplitText(textRef.current, { type: "chars" });
                tl.fromTo(
                  split.chars,
                  {
                    opacity: 0,
                    scale: 2.5,
                    rotationZ: -15,
                    filter: "blur(8px)",
                  },
                  {
                    opacity: 1,
                    scale: 1,
                    rotationZ: 0,
                    filter: "blur(0px)",
                    duration: 0.35,
                    stagger: 0.025,
                    ease: "power4.out",
                  },
                );
                return tl;
              }}
            >
              Are Boring
            </TextAnimation>
          </div>

          {/* Underline accent */}
          <div
            style={{
              position: "absolute",
              bottom: -12,
              left: "50%",
              transform: `translateX(-50%) scaleX(${spring({
                frame: frame - 20,
                fps,
                config: { damping: 15, stiffness: 180 },
              })})`,
              width: "70%",
              height: 6,
              background: "#FF006E",
              borderRadius: 3,
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
