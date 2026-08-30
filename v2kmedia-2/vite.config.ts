import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { themePlugin } from "./src/plugins/theme-plugin";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    themePlugin({ selectedTheme: process.env.VITE_THEME }),
  ],
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
