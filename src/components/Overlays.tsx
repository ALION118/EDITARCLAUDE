import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { overlays } from "../data/overlays";

const ACCENT = "#FFD23F";
const RIPPLE_DURATION_SECONDS = 1.4;

export const Overlays: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const active = overlays.find((o) => t >= o.start && t < o.end);
  if (!active) return null;

  const startFrame = Math.round(active.start * fps);
  const endFrame = Math.round(active.end * fps);
  const isCta = active.variant === "cta";
  const localFrame = frame - startFrame;

  const entrance = spring({
    frame: localFrame,
    fps,
    config: { damping: 11, mass: 0.7, stiffness: 140 },
  });
  const exit = interpolate(endFrame - frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = Math.min(entrance, exit);
  const translateY = interpolate(entrance, [0, 1], [-30, 0], { extrapolateRight: "clamp" });
  const slideX = interpolate(entrance, [0, 1], [-60, 0], { extrapolateRight: "clamp" });
  const iconRotate = interpolate(entrance, [0, 1], [-22, 0], { extrapolateRight: "clamp" });
  const pulse = isCta ? 1 + 0.05 * Math.sin(t * Math.PI * 2 * 1.1) : 1;

  // Flash breve al aparecer, tipo "punch" de edición dinámica.
  const flashOpacity = interpolate(localFrame, [0, 3, 14], [0, 0.22, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Anillo de pulso continuo tipo "radar" detrás del icono.
  const rippleDurationFrames = Math.round(RIPPLE_DURATION_SECONDS * fps);
  const ripplePhase = localFrame % rippleDurationFrames;
  const rippleScale = interpolate(ripplePhase, [0, rippleDurationFrames], [0.9, 2.1]);
  const rippleOpacity = interpolate(ripplePhase, [0, rippleDurationFrames], [0.5, 0]);

  const iconSize = isCta ? 64 : 54;
  const fontSize = isCta ? 44 : 36;

  return (
    <>
      <AbsoluteFill style={{ pointerEvents: "none", backgroundColor: "#fff", opacity: flashOpacity }} />
      <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 140 }}>
        <div
          style={{
            opacity,
            transform: `translate(${slideX}px, ${translateY}px) scale(${pulse})`,
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: isCta ? "16px 46px 16px 16px" : "12px 34px 12px 12px",
            borderRadius: 999,
            backgroundColor: isCta ? ACCENT : "rgba(8,8,12,0.6)",
            border: isCta ? "none" : `1px solid ${ACCENT}66`,
            backdropFilter: isCta ? undefined : "blur(6px)",
            boxShadow: isCta ? `0 14px 44px ${ACCENT}80` : "0 10px 28px rgba(0,0,0,0.35)",
          }}
        >
          <span
            style={{
              position: "relative",
              width: iconSize,
              height: iconSize,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: `2px solid ${isCta ? "#0b0b0f" : ACCENT}`,
                transform: `scale(${rippleScale})`,
                opacity: rippleOpacity,
              }}
            />
            <span
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isCta ? 34 : 28,
                backgroundColor: isCta ? "rgba(11,11,15,0.14)" : `${ACCENT}30`,
                transform: `rotate(${iconRotate}deg)`,
              }}
            >
              {active.icon}
            </span>
          </span>
          <span
            style={{
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
              fontWeight: 800,
              fontSize,
              letterSpacing: -0.3,
              color: isCta ? "#0b0b0f" : "#fff",
              textTransform: isCta ? "uppercase" : "none",
            }}
          >
            {active.text}
          </span>
        </div>
      </AbsoluteFill>
    </>
  );
};
