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

`Main` — 1920x1080, 30 fps, 150 frames (5 s). Definida en `src/Composition.tsx`.

El markup sigue las buenas prácticas de interactividad de Remotion (estilos y
llamadas a `interpolate()` en línea), así que los elementos se pueden
seleccionar y editar desde el Studio y los cambios se escriben en el código.

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
