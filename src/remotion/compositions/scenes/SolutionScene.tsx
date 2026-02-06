import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { TextAnimation } from "../../library/components/text/TextAnimation";
import { Noise } from "../../library/components/effects/Noise";

export const SolutionScene: React.FC<{
  headingFont: string;
  bodyFont: string;
}> = ({ headingFont, bodyFont }) => {
  const frame = useCurrentFrame();

  // Highlight wipe animation
  const highlightProgress = interpolate(frame, [25, 45], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Floating elements
  const float1 = Math.sin(frame * 0.07) * 20;
  const float2 = Math.cos(frame * 0.09) * 15;
  const float3 = Math.sin(frame * 0.05 + 1) * 18;

  // Background gradient shift
  const gradientAngle = 135 + Math.sin(frame * 0.03) * 15;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${gradientAngle}deg, #0a0a12 0%, #12081f 50%, #0a0a12 100%)`,
      }}
    >
      <Noise type="subtle" intensity={0.25} speed={0.3} opacity={0.35} />

      {/* Floating geometric elements */}
      <div
        style={{
          position: "absolute",
          top: 100 + float1,
          right: 120,
          width: 80,
          height: 80,
          border: "2px solid rgba(139, 92, 246, 0.3)",
          borderRadius: 16,
          transform: `rotate(${frame * 0.5}deg)`,
          opacity: interpolate(frame, [5, 15], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 130 + float2,
          left: 100,
          width: 50,
          height: 50,
          background: "rgba(255, 190, 11, 0.15)",
          borderRadius: "50%",
          transform: `scale(${1 + Math.sin(frame * 0.1) * 0.2})`,
          opacity: interpolate(frame, [8, 18], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 250 + float3,
          left: 200,
          width: 35,
          height: 35,
          border: "2px solid rgba(255, 0, 110, 0.25)",
          transform: `rotate(${45 + frame * -0.7}deg)`,
          opacity: interpolate(frame, [12, 22], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      />

      {/* Large background text for depth */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${interpolate(
            frame,
            [0, 30],
            [0.9, 1],
            {
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            },
          )})`,
          fontSize: 300,
          fontWeight: 900,
          fontFamily: headingFont,
          color: "rgba(255, 255, 255, 0.02)",
          letterSpacing: -20,
          whiteSpace: "nowrap",
          userSelect: "none",
        }}
      >
        WOW
      </div>

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          {/* "MAKE THEM" */}
          <TextAnimation
            className="text-[56px] font-semibold tracking-wide leading-none"
            style={{
              fontFamily: bodyFont,
              color: "rgba(255, 255, 255, 0.7)",
              textTransform: "uppercase",
              letterSpacing: "8px",
            }}
            startFrom={0}
            createTimeline={({ textRef, tl, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "chars" });
              tl.fromTo(
                split.chars,
                { opacity: 0, x: -30, filter: "blur(6px)" },
                {
                  opacity: 1,
                  x: 0,
                  filter: "blur(0px)",
                  duration: 0.45,
                  stagger: 0.04,
                  ease: "power3.out",
                },
              );
              return tl;
            }}
          >
            Make Them
          </TextAnimation>

          {/* "UNFORGETTABLE" with highlight */}
          <div
            style={{
              position: "relative",
              display: "inline-block",
              marginTop: 8,
            }}
          >
            {/* Yellow highlight behind text */}
            <div
              style={{
                position: "absolute",
                bottom: 8,
                left: -10,
                width: `${highlightProgress}%`,
                height: "35%",
                background: "linear-gradient(90deg, #FFBE0B, #FB5607)",
                borderRadius: 4,
                opacity: interpolate(frame, [25, 30], [0, 0.9], {
                  extrapolateRight: "clamp",
                }),
                zIndex: 0,
              }}
            />
            <TextAnimation
              className="text-[88px] font-black tracking-tighter leading-none"
              style={{
                fontFamily: headingFont,
                color: "#ffffff",
                textTransform: "uppercase",
                letterSpacing: "-3px",
                position: "relative",
                zIndex: 1,
              }}
              startFrom={10}
              createTimeline={({ textRef, tl, SplitText }) => {
                const split = new SplitText(textRef.current, { type: "chars" });
                tl.fromTo(
                  split.chars,
                  { opacity: 0, y: 60, rotationX: -90 },
                  {
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                    duration: 0.5,
                    stagger: 0.025,
                    ease: "back.out(1.7)",
                  },
                );
                return tl;
              }}
            >
              Unforgettable
            </TextAnimation>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
