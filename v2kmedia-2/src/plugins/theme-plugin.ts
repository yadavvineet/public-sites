import type { Plugin } from "vite";
import { themes, type ThemeName } from "../config/themes";

export function themePlugin(options: { selectedTheme: string | undefined }): Plugin {
  const selectedThemeName: ThemeName =
    options.selectedTheme && themes[options.selectedTheme as ThemeName]
      ? (options.selectedTheme as ThemeName)
      : "charcoal";

  const theme = themes[selectedThemeName];
  const themeCSS = generateThemeCSS(theme);

  console.log(`[v2k-theme] Building with theme: ${theme.name} (${selectedThemeName})`);
  console.log(`  accent: ${theme.colors.accent}`);
  console.log(`  accent-hover: ${theme.colors["accent-hover"]}`);

  return {
    name: "v2k-theme",
    enforce: "pre" as "pre",

    // Don't prepend to CSS files — it breaks @import ordering.
    // Instead, inject theme variables into index.html only.
    transform(_code, _id) {
      return null;
    },

    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: "style",
            children: themeCSS,
            enforce: "pre" as "pre",
            attrs: { type: "text/css" },
          },
        ],
      };
    },
  };
}

function generateThemeCSS(theme: { colors: Record<string, string> }): string {
  const c = theme.colors;
  return `
:root {
  --color-charcoal: ${c.charcoal};
  --color-offwhite: ${c.offwhite};
  --color-accent: ${c.accent};
  --color-accent-hover: ${c["accent-hover"]};
  --color-muted: ${c.muted};
  --color-surface: ${c.surface};
  --color-bg-dark: ${c["bg-dark"]};
}
`;
}
