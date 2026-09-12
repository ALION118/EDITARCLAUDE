import {
  AbsoluteFill,
  Composition,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";

export const MyComposition = () => {
  return (
    <Composition
      id="Main"
      component={Scene}
      durationInFrames={150}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};

export const Scene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      name="Scene"
      style={{
        backgroundColor: "#0b0b0f",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 40,
        padding: 100,
      }}
    >
      <Interactive.Div
        name="Accent bar"
        style={{
          width: 140,
          height: 10,
          borderRadius: 999,
          backgroundColor: "#4ade80",
          opacity: interpolate(frame, [0, 15, 130, 145], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.bezier(0.16, 1, 0.3, 1),
              Easing.linear,
              Easing.bezier(0.16, 1, 0.3, 1),
            ],
          }),
          scale: interpolate(frame, [0, 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({ damping: 200 }),
            output: "perceptual-scale",
          }),
        }}
      />
      <Interactive.Div
        name="Title"
        style={{
          color: "#f5f5f7",
          fontFamily: "sans-serif",
          fontSize: 140,
          fontWeight: 700,
          letterSpacing: -4,
          textAlign: "center",
          opacity: interpolate(frame, [8, 38, 130, 145], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.bezier(0.16, 1, 0.3, 1),
              Easing.linear,
              Easing.bezier(0.16, 1, 0.3, 1),
            ],
          }),
          translate: interpolate(frame, [8, 38], ["0px 40px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        Editar con Claude
      </Interactive.Div>
      <Interactive.Div
        name="Subtitle"
        style={{
          color: "#9ca3af",
          fontFamily: "sans-serif",
          fontSize: 52,
          textAlign: "center",
          opacity: interpolate(frame, [20, 50, 125, 140], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.bezier(0.16, 1, 0.3, 1),
              Easing.linear,
              Easing.bezier(0.16, 1, 0.3, 1),
            ],
          }),
          translate: interpolate(frame, [20, 50], ["0px 24px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        Proyecto de Remotion listo
      </Interactive.Div>
    </AbsoluteFill>
  );
};
