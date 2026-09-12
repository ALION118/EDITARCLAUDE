import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { punchTimes } from "../data/overlays";

const PUNCH_WINDOW_SECONDS = 0.8;
const PUNCH_STRENGTH = 0.045;

// Movimiento de cámara sutil y continuo (zoom lento + deriva tipo
// steadicam) más pequeños "punch-in" en los cambios de tema, para dar
// dinamismo sin resultar brusco sobre un único plano fijo.
const useCameraTransform = (durationInSeconds: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const baseZoom = 1 + 0.12 * (t / durationInSeconds);
  const panX = 12 * Math.sin((2 * Math.PI * t) / 13);
  const panY = 9 * Math.sin((2 * Math.PI * t) / 19 + 1.3);

  let punch = 0;
  for (const p of punchTimes) {
    const local = t - p;
    if (local >= 0 && local <= PUNCH_WINDOW_SECONDS) {
      const progress = local / PUNCH_WINDOW_SECONDS;
      punch = Math.max(punch, Math.sin(progress * Math.PI) * PUNCH_STRENGTH);
    }
  }

  const scale = baseZoom + punch;
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
        }}
      >
        <OffthreadVideo
          src={staticFile(src)}
          trimAfter={Math.round(trimAfterSeconds * fps)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
