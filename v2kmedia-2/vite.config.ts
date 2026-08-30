import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { themePlugin } from "./src/plugins/theme-plugin";

function getThemeFromArgs(): string | undefined {
  const themeArg = process.argv.find((arg) => arg.startsWith("--theme="));
  if (themeArg) {
    return themeArg.split("=")[1];
  }
  return "charcoal";
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    themePlugin({ selectedTheme: getThemeFromArgs() }),
  ],
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
