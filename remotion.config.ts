/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { globSync } from "node:fs";
import { Config } from "@remotion/cli/config";
import { enableTailwind } from "@remotion/tailwind-v4";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.overrideBundlerConfig(enableTailwind);

// Left on webpack: with Config.setRspack(true) on 4.0.523 every render dies in
// getSourceMapFromLocalFile looking for a bundle.js the rspack output lacks.
// Retry rspack after upgrading Remotion.

// Remotion downloads Chrome Headless Shell from remotion.media, which the
// sandbox network allowlist blocks. Reuse the preinstalled Chromium instead.
const preinstalledShell = globSync(
  "/opt/pw-browsers/chromium_headless_shell-*/chrome-linux/headless_shell",
)[0];

if (preinstalledShell) {
  Config.setBrowserExecutable(preinstalledShell);
}
