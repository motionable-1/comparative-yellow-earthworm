import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { TextAnimation } from "../../library/components/text/TextAnimation";
import { Noise } from "../../library/components/effects/Noise";

export const CTAScene: React.FC<{
  headingFont: string;
  bodyFont: string;
}> = ({ headingFont, bodyFont }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Button spring
  const buttonScale = spring({
    frame: frame - 18,
    fps,
    config: { damping: 8, stiffness: 180 },
  });

  // Button glow pulse
  const glowPulse = 0.6 + Math.sin(frame * 0.15) * 0.4;

  // Arrow animation
  const arrowBounce = Math.sin(frame * 0.2) * 8;

  // Background gradient animation
  const gradAngle = 135 + Math.sin(frame * 0.04) * 20;
  const gradShift = Math.sin(frame * 0.03) * 5;

  // Floating particles
  const particles = Array.from({ length: 8 }).map((_, i) => ({
    x: 150 + i * 140 + Math.sin(frame * 0.04 + i * 0.8) * 30,
    y: 100 + Math.sin(frame * 0.06 + i * 1.2) * 250,
    size: 4 + (i % 3) * 3,
    opacity: 0.1 + (i % 4) * 0.08,
    color: ["#FFBE0B", "#FF006E", "#8338EC", "#3A86FF"][i % 4],
  }));

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${gradAngle}deg, #0a0a0a 0%, #0d0520 ${50 + gradShift}%, #0a0a0a 100%)`,
      }}
    >
      <Noise type="subtle" intensity={0.2} speed={0.3} opacity={0.3} />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: p.color,
            opacity: interpolate(frame, [5, 15], [0, p.opacity], {
              extrapolateRight: "clamp",
            }),
            transform: `scale(${1 + Math.sin(frame * 0.1 + i) * 0.3})`,
          }}
        />
      ))}

      {/* Central radial glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(255, 0, 110, ${0.08 * glowPulse}) 0%, transparent 60%)`,
        }}
      />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          {/* "START TODAY" */}
          <TextAnimation
            className="text-[80px] font-black tracking-tight leading-none"
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
                { opacity: 0, scale: 0, rotationZ: -20 },
                {
                  opacity: 1,
                  scale: 1,
                  rotationZ: 0,
                  duration: 0.5,
                  stagger: 0.03,
                  ease: "elastic.out(1, 0.4)",
                },
              );
              return tl;
            }}
          >
            Start Today
          </TextAnimation>

          {/* Subtitle */}
          <TextAnimation
            className="text-[24px] font-normal tracking-[6px] leading-relaxed"
            style={{
              fontFamily: bodyFont,
              color: "rgba(255, 255, 255, 0.5)",
              textTransform: "uppercase",
              marginTop: 16,
            }}
            startFrom={12}
            createTimeline={({ textRef, tl, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "words" });
              tl.fromTo(
                split.words,
                { opacity: 0, y: 20 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.4,
                  stagger: 0.08,
                  ease: "power2.out",
                },
              );
              return tl;
            }}
          >
            Transform Your Brand
          </TextAnimation>

          {/* CTA Button */}
          <div
            style={{
              marginTop: 48,
              transform: `scale(${buttonScale})`,
              opacity: buttonScale,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 16,
                padding: "20px 48px",
                background: "linear-gradient(135deg, #FF006E, #FB5607)",
                borderRadius: 60,
                boxShadow: `0 0 ${30 * glowPulse}px rgba(255, 0, 110, ${0.4 * glowPulse}), 0 4px 20px rgba(0, 0, 0, 0.3)`,
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  fontFamily: headingFont,
                  fontSize: 28,
                  fontWeight: 800,
                  color: "#ffffff",
                  textTransform: "uppercase",
                  letterSpacing: 3,
                }}
              >
                Get Started
              </span>
              <span
                style={{
                  fontSize: 28,
                  color: "#ffffff",
                  transform: `translateX(${arrowBounce}px)`,
                  display: "inline-block",
                }}
              >
                →
              </span>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
