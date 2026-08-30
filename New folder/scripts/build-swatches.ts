/**
 * Build-time script that injects the selected color swatch into globals.css.
 * Reads SELECTED_SWATCH from process.env (default: "deep-blue").
 * Replaces --color-accent and --color-accent-hover CSS custom property values.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SWATCHES_DIR = path.join(__dirname, "..", "src", "styles", "swatches");
const GLOBALS_PATH = path.join(__dirname, "..", "src", "styles", "globals.css");

function getSwatchId(): string {
  const envSwatch = process.env.SELECTED_SWATCH;
  if (envSwatch) return envSwatch;
  return "deep-blue";
}

function readSwatch(swatchId: string): { accent: string; accentHover: string } {
  const filePath = path.join(SWATCHES_DIR, `${swatchId}.json`);
  if (!fs.existsSync(filePath)) {
    console.error(`Swatch "${swatchId}" not found. Available: deep-blue, teal, emerald, amber`);
    process.exit(1);
  }
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return {
    accent: data.colors.accent,
    accentHover: data.colors["accent-hover"],
  };
}

function injectSwatch(globalsCss: string, swatch: { accent: string; accentHover: string }): string {
  let output = globalsCss;

  output = output.replace(
    /(--color-accent:\s*)#[0-9a-fA-F]{6}/,
    `$1${swatch.accent}`,
  );

  output = output.replace(
    /(--color-accent-hover:\s*)#[0-9a-fA-F]{6}/,
    `$1${swatch.accentHover}`,
  );

  return output;
}

function main(): void {
  const swatchId = getSwatchId();
  console.log(`Building with swatch: ${swatchId}`);

  const swatch = readSwatch(swatchId);

  if (!fs.existsSync(GLOBALS_PATH)) {
    console.error(`globals.css not found at ${GLOBALS_PATH}`);
    process.exit(1);
  }

  const globalsCss = fs.readFileSync(GLOBALS_PATH, "utf-8");
  const output = injectSwatch(globalsCss, swatch);

  const outDir = path.join(__dirname, "..", "src", "styles");
  const outputPath = path.join(outDir, "globals.css");

  const tempPath = outputPath + ".tmp";
  fs.writeFileSync(tempPath, output, "utf-8");
  fs.renameSync(tempPath, outputPath);
  console.log(`Injected swatch "${swatchId}" into globals.css`);
  console.log(`  accent: ${swatch.accent}`);
  console.log(`  accent-hover: ${swatch.accentHover}`);
}

main();
