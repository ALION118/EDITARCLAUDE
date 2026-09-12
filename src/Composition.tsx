import { AbsoluteFill, Composition } from "remotion";
import { Captions } from "./components/Captions";
import { KenBurnsVideo } from "./components/KenBurnsVideo";
import { Overlays } from "./components/Overlays";

const FPS = 30;
// Duración del habla (SRT original): 75.56s. Se recorta el silencio final
// (la voz calla ~74s y el clip original se alarga hasta 76.87s) dejando
// un pequeño margen de respiro de 0.44s tras la última palabra.
const TRIM_AFTER_SECONDS = 76.0;
const DURATION_IN_FRAMES = Math.round(TRIM_AFTER_SECONDS * FPS);

export const InvitacionPresencial: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <KenBurnsVideo
        src="Invitacion.Presencial.mp4"
        durationInSeconds={TRIM_AFTER_SECONDS}
        trimAfterSeconds={TRIM_AFTER_SECONDS}
      />
      <Overlays />
      <Captions />
    </AbsoluteFill>
  );
};

export const MyComposition = () => {
  return (
    <Composition
      id="InvitacionPresencial"
      component={InvitacionPresencial}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      width={1080}
      height={1920}
    />
  );
};
