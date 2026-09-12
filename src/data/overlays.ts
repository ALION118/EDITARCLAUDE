// Elementos gráficos/textuales contextuales, sincronizados con lo que se
// dice en cada momento (ver captions.ts / el SRT original). Se mantienen
// breves y discretos para no sobrecargar el vídeo.
export type Overlay = {
  start: number; // segundos
  end: number; // segundos
  icon: string;
  text: string;
  variant: "badge" | "cta";
};

export const overlays: Overlay[] = [
  { start: 0.6, end: 11.5, icon: "✨", text: "Energía vital · Chi · Prana", variant: "badge" },
  { start: 20.9, end: 25.7, icon: "🔬", text: "Microscopio de campo oscuro", variant: "badge" },
  { start: 33.7, end: 40.0, icon: "📝", text: "Regístrate ahora", variant: "cta" },
  { start: 40.1, end: 45.2, icon: "📍", text: "Masterclass presencial · Madrid", variant: "badge" },
  { start: 47.9, end: 50.8, icon: "⚠️", text: "Metales pesados", variant: "badge" },
  { start: 50.8, end: 53.4, icon: "☣️", text: "Toxinas", variant: "badge" },
  { start: 53.4, end: 55.9, icon: "🦠", text: "Parásitos", variant: "badge" },
  { start: 55.9, end: 57.7, icon: "🧫", text: "Cándidas y bacterias", variant: "badge" },
  { start: 57.9, end: 68.1, icon: "🧘", text: "Glándula pineal · Despertar", variant: "badge" },
  { start: 68.4, end: 75.9, icon: "🔗", text: "Reserva tu plaza", variant: "cta" },
];

// Momentos de cambio de tema, usados por <KenBurnsVideo> para dar un
// ligero "punch-in" de cámara que marca el ritmo sin resultar brusco.
export const punchTimes: number[] = [
  0,
  ...overlays.map((o) => o.start),
];
