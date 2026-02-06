import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { TextAnimation } from "../../library/components/text/TextAnimation";
import { Counter } from "../../library/components/text/Counter";
import { Noise } from "../../library/components/effects/Noise";

export const ResultsScene: React.FC<{
  headingFont: string;
  bodyFont: string;
}> = ({ headingFont, bodyFont }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Stats entrance spring
  const stat1Scale = spring({
    frame: frame - 5,
    fps,
    config: { damping: 12, stiffness: 150 },
  });
  const stat2Scale = spring({
    frame: frame - 12,
    fps,
    config: { damping: 12, stiffness: 150 },
  });
  const stat3Scale = spring({
    frame: frame - 19,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  // Background pulse
  const bgPulse = 1 + Math.sin(frame * 0.08) * 0.02;

  // Floating elements
  const float1 = Math.sin(frame * 0.06) * 12;
  const float2 = Math.cos(frame * 0.08) * 10;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, #1a0a2e 0%, #0a0a0a 70%)`,
        transform: `scale(${bgPulse})`,
      }}
    >
      <Noise type="grain" intensity={0.2} speed={0.4} opacity={0.3} />

      {/* Radial glow behind stats */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(131, 56, 236, 0.15) 0%, transparent 70%)",
          opacity: interpolate(frame, [0, 20], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      />

      {/* Floating decorative elements */}
      <div
        style={{
          position: "absolute",
          top: 80 + float1,
          left: 100,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#FFBE0B",
          opacity: interpolate(frame, [10, 20], [0, 0.6], {
            extrapolateRight: "clamp",
          }),
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 100 + float2,
          right: 150,
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "#3A86FF",
          opacity: interpolate(frame, [15, 25], [0, 0.5], {
            extrapolateRight: "clamp",
          }),
        }}
      />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          {/* "REAL RESULTS" label */}
          <TextAnimation
            className="text-[28px] font-medium tracking-[12px] leading-none"
            style={{
              fontFamily: bodyFont,
              color: "rgba(255, 255, 255, 0.5)",
              textTransform: "uppercase",
              marginBottom: 40,
            }}
            startFrom={0}
            createTimeline={({ textRef, tl, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "chars" });
              tl.fromTo(
                split.chars,
                { opacity: 0, y: 20 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.4,
                  stagger: 0.03,
                  ease: "power2.out",
                },
              );
              return tl;
            }}
          >
            Real Results
          </TextAnimation>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: 80,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            {/* Stat 1: 10X */}
            <div
              style={{
                textAlign: "center",
                transform: `scale(${stat1Scale})`,
                opacity: stat1Scale,
              }}
            >
              <div
                style={{
                  fontFamily: headingFont,
                  fontSize: 90,
                  fontWeight: 900,
                  color: "#FFBE0B",
                  lineHeight: 1,
                  letterSpacing: -3,
                }}
              >
                <Counter
                  from={0}
                  to={10}
                  duration={1.2}
                  delay={0.2}
                  suffix="X"
                  ease="smooth"
                  style={{ fontFamily: headingFont, fontWeight: 900 }}
                />
              </div>
              <div
                style={{
                  fontFamily: bodyFont,
                  fontSize: 18,
                  fontWeight: 500,
                  color: "rgba(255, 255, 255, 0.6)",
                  marginTop: 8,
                  textTransform: "uppercase",
                  letterSpacing: 4,
                }}
              >
                Engagement
              </div>
            </div>

            {/* Divider */}
            <div
              style={{
                width: 2,
                height: 80,
                background:
                  "linear-gradient(180deg, transparent, rgba(255,255,255,0.2), transparent)",
                transform: `scaleY(${spring({
                  frame: frame - 15,
                  fps,
                  config: { damping: 20, stiffness: 100 },
                })})`,
              }}
            />

            {/* Stat 2: 3X */}
            <div
              style={{
                textAlign: "center",
                transform: `scale(${stat2Scale})`,
                opacity: stat2Scale,
              }}
            >
              <div
                style={{
                  fontFamily: headingFont,
                  fontSize: 90,
                  fontWeight: 900,
                  color: "#FF006E",
                  lineHeight: 1,
                  letterSpacing: -3,
                }}
              >
                <Counter
                  from={0}
                  to={3}
                  duration={1}
                  delay={0.5}
                  suffix="X"
                  ease="smooth"
                  style={{ fontFamily: headingFont, fontWeight: 900 }}
                />
              </div>
              <div
                style={{
                  fontFamily: bodyFont,
                  fontSize: 18,
                  fontWeight: 500,
                  color: "rgba(255, 255, 255, 0.6)",
                  marginTop: 8,
                  textTransform: "uppercase",
                  letterSpacing: 4,
                }}
              >
                Conversions
              </div>
            </div>

            {/* Divider */}
            <div
              style={{
                width: 2,
                height: 80,
                background:
                  "linear-gradient(180deg, transparent, rgba(255,255,255,0.2), transparent)",
                transform: `scaleY(${spring({
                  frame: frame - 22,
                  fps,
                  config: { damping: 20, stiffness: 100 },
                })})`,
              }}
            />

            {/* Stat 3: 50% */}
            <div
              style={{
                textAlign: "center",
                transform: `scale(${stat3Scale})`,
                opacity: stat3Scale,
              }}
            >
              <div
                style={{
                  fontFamily: headingFont,
                  fontSize: 90,
                  fontWeight: 900,
                  color: "#8338EC",
                  lineHeight: 1,
                  letterSpacing: -3,
                }}
              >
                <Counter
                  from={0}
                  to={50}
                  duration={1}
                  delay={0.8}
                  suffix="%"
                  ease="smooth"
                  style={{ fontFamily: headingFont, fontWeight: 900 }}
                />
              </div>
              <div
                style={{
                  fontFamily: bodyFont,
                  fontSize: 18,
                  fontWeight: 500,
                  color: "rgba(255, 255, 255, 0.6)",
                  marginTop: 8,
                  textTransform: "uppercase",
                  letterSpacing: 4,
                }}
              >
                Less Cost
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
