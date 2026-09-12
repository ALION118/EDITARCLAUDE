import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { captionLines } from "../data/captions";

const ACCENT = "#FFD23F";

type Word = { text: string; start: number; end: number };

const splitLineIntoWords = (start: number, end: number, text: string): Word[] => {
  const rawWords = text.split(" ").filter(Boolean);
  const weights = rawWords.map((w) => w.length + 1);
  const total = weights.reduce((a, b) => a + b, 0);
  const duration = end - start;
  let cursor = start;
  return rawWords.map((w) => {
    const wordStart = cursor;
    const wordDuration = (duration * (w.length + 1)) / total;
    cursor += wordDuration;
    return { text: w, start: wordStart, end: cursor };
  });
};

export const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const line = captionLines.find((l) => t >= l.start && t < l.end);
  if (!line) return null;

  const words = splitLineIntoWords(line.start, line.end, line.text);
  const lineStartFrame = Math.round(line.start * fps);
  const lineEndFrame = Math.round(line.end * fps);

  const entrance = spring({
    frame: frame - lineStartFrame,
    fps,
    config: { damping: 200, mass: 0.6, stiffness: 180 },
  });
  const exit = interpolate(lineEndFrame - frame, [0, 5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = Math.min(entrance, exit);
  const translateY = interpolate(entrance, [0, 1], [18, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 300 }}>
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
          maxWidth: "88%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px 26px",
          padding: "22px 36px",
          borderRadius: 28,
          backgroundColor: "rgba(8,8,12,0.52)",
          backdropFilter: "blur(6px)",
          boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
        }}
      >
        {words.map((w, i) => {
          const isCurrent = t >= w.start && t < w.end;
          const isPast = t >= w.end;
          const pop = spring({
            frame: frame - Math.round(w.start * fps),
            fps,
            config: { damping: 14, mass: 0.4, stiffness: 260 },
          });
          const scale = isCurrent ? interpolate(pop, [0, 1], [1, 1.1]) : 1;
          return (
            <span
              key={`${line.start}-${i}`}
              style={{
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
                fontWeight: 900,
                fontSize: 62,
                lineHeight: 1.2,
                letterSpacing: -0.5,
                color: isCurrent ? ACCENT : "#fff",
                opacity: isCurrent || isPast ? 1 : 0.45,
                transform: `scale(${scale})`,
                textShadow: isCurrent
                  ? `0 0 24px ${ACCENT}66, 0 2px 6px rgba(0,0,0,0.55)`
                  : "0 2px 6px rgba(0,0,0,0.55)",
              }}
            >
              {w.text}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
