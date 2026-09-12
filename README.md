# Remotion video

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

Welcome to your Remotion project!

## Composición

`InvitacionPresencial` — 1080x1920 (vertical), 30 fps, 2280 frames (76 s).
Definida en `src/Composition.tsx`. Edición de `Invitacion.Presencial.mp4`
(descargado del [Release V1.0.0](https://github.com/ALION118/EDITARCLAUDE/releases/tag/V1.0.0))
con:

- **Recorte de silencio final**: el habla original (según el SRT) termina a
  los 75.56 s; el clip se corta a los 76.0 s, eliminando el silencio muerto
  final del vídeo fuente (76.87 s).
- **Cámara dinámica** (`src/components/KenBurnsVideo.tsx`): zoom lento y
  continuo + deriva tipo steadicam (paneo sinusoidal) más pequeños
  "punch-in" en cada cambio de tema.
- **Subtítulos karaoke** (`src/components/Captions.tsx`): reconstruidos a
  partir del SRT original (`src/data/captions.ts`), con la palabra activa
  resaltada y entrada/salida animada por línea.
- **Overlays contextuales** (`src/components/Overlays.tsx` +
  `src/data/overlays.ts`): chips de texto/icono y CTAs sincronizados con lo
  que se dice en cada momento.

### Preparar el vídeo fuente

El archivo `public/Invitacion.Presencial.mp4` (≈176 MB) no se versiona en
git (ver `.gitignore`). Antes de abrir el Studio o renderizar, descárgalo
del Release:

```console
curl -L -o public/Invitacion.Presencial.mp4 \
  https://github.com/ALION118/EDITARCLAUDE/releases/download/V1.0.0/Invitacion.Presencial.mp4
```

## Notas del entorno

Dos ajustes en `remotion.config.ts` son específicos de este contenedor:

- **Navegador**: Remotion descarga Chrome Headless Shell desde `remotion.media`,
  bloqueado por el allowlist de red. La config detecta el Chromium preinstalado
  en `/opt/pw-browsers` y lo reutiliza. Fuera de este entorno la detección no
  encuentra nada y Remotion descarga el navegador como siempre.
- **Bundler**: se usa webpack en lugar de rspack. Con `Config.setRspack(true)`
  en la 4.0.523 todo render falla en `getSourceMapFromLocalFile` buscando un
  `bundle.js` que la salida de rspack no deja. Conviene reintentarlo tras
  actualizar Remotion.

## Commands

**Install Dependencies**

```console
npm i
```

**Start Preview**

```console
npm run dev
```

**Render video**

```console
npx remotion render
```

**Upgrade Remotion**

```console
npx remotion upgrade
```

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Help

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
