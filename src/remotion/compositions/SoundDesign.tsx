import React from "react";
import { Audio } from "@remotion/media";
import { Sequence, useVideoConfig, interpolate } from "remotion";

// ─── Asset URLs ───────────────────────────────────────────────
const SFX = {
  bassImpact:
    "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1770414651469_0kpdw555tnps_sfx_Deep_cinematic_bass_drop_impac.mp3",
  glitchBurst:
    "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1770414654681_neccl4ontke_sfx_Digital_glitch_distortion_burs.mp3",
  whoosh:
    "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1770414659986_6pmww9o5h76_sfx_Bright_energetic_whoosh_transi.mp3",
  flashImpact:
    "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1770414662670_zvjxskonxl_sfx_Bright_flash_impact_with_spark.mp3",
  whipPan:
    "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1770414666134_oo4bw221gi_sfx_Fast_whip_pan_whoosh__camera_m.mp3",
  buttonPop:
    "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1770414668987_ryubnbc79io_sfx_Short_satisfying_UI_click_pop_.mp3",
  markerStroke:
    "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1770414675507_s4k30e0m44_sfx_Marker_highlighter_pen_stroke_.mp3",
} as const;

const MUSIC_URL =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/music/1770414705297_0ozgyhkjbd2_music_Dark_aggressive_elec.mp3";

// ─── Timeline (at 30 fps) ────────────────────────────────────
// Scene 1 (Hook):     global frames 0–89
// Glitch transition:  overlaps at ~82
// Scene 2 (Solution): global frames ~82–193
// Flash transition:   overlaps at ~192
// Scene 3 (Results):  global frames ~192–303
// Whip transition:    overlaps at ~304
// Scene 4 (CTA):      global frames ~304–453

/**
 * Sound design layer — dropped into Main alongside the visual composition.
 * All SFX are timed to visual beats via <Sequence from={frame}>.
 */
export const SoundDesign: React.FC = () => {
  const { durationInFrames } = useVideoConfig();

  return (
    <>
      {/* ── Background Music ─────────────────────────────── */}
      <Audio
        src={MUSIC_URL}
        volume={(f) =>
          interpolate(
            f,
            [0, 10, durationInFrames - 30, durationInFrames],
            [0, 0.35, 0.35, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          )
        }
      />

      {/* ── Scene 1: Hook ───────────────────────────────── */}

      {/* Bass impact on first text slam (frame 0) */}
      <Sequence from={0}>
        <Audio src={SFX.bassImpact} volume={0.7} />
      </Sequence>

      {/* Glitch distortion when "ARE BORING" hits (frame ~8) */}
      <Sequence from={8}>
        <Audio src={SFX.glitchBurst} volume={0.45} />
      </Sequence>

      {/* ── Glitch Transition (~frame 82) ────────────────── */}
      <Sequence from={80}>
        <Audio src={SFX.glitchBurst} volume={0.55} />
      </Sequence>

      {/* ── Scene 2: Solution ─────────────────────────────── */}

      {/* Rising whoosh as scene enters */}
      <Sequence from={85}>
        <Audio src={SFX.whoosh} volume={0.5} />
      </Sequence>

      {/* Marker highlight stroke on "UNFORGETTABLE" (~frame 107 = scene2 frame 25) */}
      <Sequence from={107}>
        <Audio src={SFX.markerStroke} volume={0.55} />
      </Sequence>

      {/* ── Flash White Transition (~frame 192) ──────────── */}
      <Sequence from={190}>
        <Audio src={SFX.flashImpact} volume={0.6} />
      </Sequence>

      {/* ── Scene 3: Results ──────────────────────────────── */}

      {/* Stat 1 locks in (frame ~197) */}
      <Sequence from={197}>
        <Audio src={SFX.buttonPop} volume={0.4} />
      </Sequence>

      {/* Stat 2 locks in (frame ~204) */}
      <Sequence from={204}>
        <Audio src={SFX.buttonPop} volume={0.4} />
      </Sequence>

      {/* Stat 3 locks in (frame ~211) */}
      <Sequence from={211}>
        <Audio src={SFX.buttonPop} volume={0.4} />
      </Sequence>

      {/* ── Whip Pan Transition (~frame 304) ─────────────── */}
      <Sequence from={302}>
        <Audio src={SFX.whipPan} volume={0.6} />
      </Sequence>

      {/* ── Scene 4: CTA ──────────────────────────────────── */}

      {/* Whoosh entrance on "START TODAY" */}
      <Sequence from={306}>
        <Audio src={SFX.whoosh} volume={0.45} />
      </Sequence>

      {/* Button pop when CTA button springs in (~frame 322) */}
      <Sequence from={322}>
        <Audio src={SFX.buttonPop} volume={0.55} />
      </Sequence>
    </>
  );
};
