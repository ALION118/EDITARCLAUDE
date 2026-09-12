import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { overlays } from "../data/overlays";

const ACCENT = "#FFD23F";

export const Overlays: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const active = overlays.find((o) => t >= o.start && t < o.end);
  if (!active) return null;

  const startFrame = Math.round(active.start * fps);
  const endFrame = Math.round(active.end * fps);
  const isCta = active.variant === "cta";

  const entrance = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 16, mass: 0.6, stiffness: 170 },
  });
  const exit = interpolate(endFrame - frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = Math.min(entrance, exit);
  const translateY = interpolate(entrance, [0, 1], [-16, 0], { extrapolateRight: "clamp" });
  const pulse = isCta ? 1 + 0.035 * Math.sin(t * Math.PI * 2 * 0.9) : 1;

  return (
    <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 150 }}>
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px) scale(${pulse})`,
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: isCta ? "14px 40px 14px 14px" : "10px 30px 10px 10px",
          borderRadius: 999,
          backgroundColor: isCta ? ACCENT : "rgba(8,8,12,0.55)",
          border: isCta ? "none" : `1px solid ${ACCENT}55`,
          backdropFilter: isCta ? undefined : "blur(6px)",
          boxShadow: isCta ? `0 12px 36px ${ACCENT}73` : "0 10px 28px rgba(0,0,0,0.3)",
        }}
      >
        <span
          style={{
            width: isCta ? 56 : 48,
            height: isCta ? 56 : 48,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: isCta ? 30 : 26,
            backgroundColor: isCta ? "rgba(11,11,15,0.12)" : `${ACCENT}26`,
            flexShrink: 0,
          }}
        >
          {active.icon}
        </span>
        <span
          style={{
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontWeight: 800,
            fontSize: isCta ? 40 : 34,
            letterSpacing: -0.3,
            color: isCta ? "#0b0b0f" : "#fff",
            textTransform: isCta ? "uppercase" : "none",
          }}
        >
          {active.text}
        </span>
      </div>
    </AbsoluteFill>
  );
};
