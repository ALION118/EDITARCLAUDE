import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { punchTimes } from "../data/overlays";
import { captionLines } from "../data/captions";

const PUNCH_WINDOW_SECONDS = 0.9;
const PUNCH_STRENGTH = 0.11;

// Micro-punches en cada línea de subtítulo (cada ~2s), más sutiles que los
// de cambio de tema, para que la cámara "respire" al ritmo del habla.
const MINOR_PUNCH_WINDOW_SECONDS = 0.45;
const MINOR_PUNCH_STRENGTH = 0.035;
const minorPunchTimes = captionLines.map((l) => l.start);

// Movimiento de cámara claramente perceptible (zoom + deriva tipo
// steadicam) más "punch-in" marcados en los cambios de tema y en cada
// línea de subtítulo, para dar dinamismo sobre un único plano fijo.
const useCameraTransform = (durationInSeconds: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const baseZoom = 1.04 + 0.22 * (t / durationInSeconds);
  const panX = 22 * Math.sin((2 * Math.PI * t) / 13);
  const panY = 16 * Math.sin((2 * Math.PI * t) / 19 + 1.3);

  let punch = 0;
  for (const p of punchTimes) {
    const local = t - p;
    if (local >= 0 && local <= PUNCH_WINDOW_SECONDS) {
      const progress = local / PUNCH_WINDOW_SECONDS;
      punch = Math.max(punch, Math.sin(progress * Math.PI) * PUNCH_STRENGTH);
    }
  }

  let minorPunch = 0;
  for (const p of minorPunchTimes) {
    const local = t - p;
    if (local >= 0 && local <= MINOR_PUNCH_WINDOW_SECONDS) {
      const progress = local / MINOR_PUNCH_WINDOW_SECONDS;
      minorPunch = Math.max(minorPunch, Math.sin(progress * Math.PI) * MINOR_PUNCH_STRENGTH);
    }
  }

  const scale = baseZoom + punch + minorPunch;
  return { scale, panX, panY };
};

export const KenBurnsVideo: React.FC<{
  src: string;
  durationInSeconds: number;
  trimAfterSeconds: number;
}> = ({ src, durationInSeconds, trimAfterSeconds }) => {
  const { fps } = useVideoConfig();
  const { scale, panX, panY } = useCameraTransform(durationInSeconds);

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#000" }}>
      <AbsoluteFill
        style={{
          transform: `scale(${scale}) translate(${panX}px, ${panY}px)`,
          transformOrigin: "50% 42%",
          filter: "contrast(1.07) saturate(1.14) brightness(1.02)",
        }}
      >
        <OffthreadVideo
          src={staticFile(src)}
          trimAfter={Math.round(trimAfterSeconds * fps)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>
      {/* Viñeta sutil: da profundidad cinematográfica sin oscurecer el centro. */}
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          background:
            "radial-gradient(120% 85% at 50% 46%, rgba(0,0,0,0) 58%, rgba(0,0,0,0.38) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
