export type ThemeName = "charcoal" | "midnight" | "sage" | "burgundy" | "graphite";

export interface ThemeDefinition {
  name: string;
  colors: {
    charcoal: string;
    offwhite: string;
    accent: string;
    "accent-hover": string;
    muted: string;
    surface: string;
    "bg-dark": string;
  };
}

export const themes: Record<ThemeName, ThemeDefinition> = {
  charcoal: {
    name: "Charcoal",
    colors: {
      charcoal: "#1c1c1e",
      offwhite: "#fafafa",
      accent: "#1e40af",
      "accent-hover": "#1a3a9e",
      muted: "#6b7280",
      surface: "#f3f4f6",
      "bg-dark": "#111827",
    },
  },
  midnight: {
    name: "Midnight",
    colors: {
      charcoal: "#e5e5e5",
      offwhite: "#0f172a",
      accent: "#f59e0b",
      "accent-hover": "#d97706",
      muted: "#94a3b8",
      surface: "#1e293b",
      "bg-dark": "#020617",
    },
  },
  sage: {
    name: "Sage",
    colors: {
      charcoal: "#1c1c1e",
      offwhite: "#f8f7f2",
      accent: "#0d9488",
      "accent-hover": "#0f766e",
      muted: "#6b7280",
      surface: "#f0efe8",
      "bg-dark": "#1a2e28",
    },
  },
  burgundy: {
    name: "Burgundy",
    colors: {
      charcoal: "#1c1c1e",
      offwhite: "#ffffff",
      accent: "#991b1b",
      "accent-hover": "#7f1d1d",
      muted: "#6b7280",
      surface: "#f9fafb",
      "bg-dark": "#1c1117",
    },
  },
  graphite: {
    name: "Graphite",
    colors: {
      charcoal: "#27272a",
      offwhite: "#f4f4f5",
      accent: "#3b82f6",
      "accent-hover": "#2563eb",
      muted: "#71717a",
      surface: "#e4e4e7",
      "bg-dark": "#18181b",
    },
  },
};

export const themeOrder: ThemeName[] = [
  "charcoal",
  "midnight",
  "sage",
  "burgundy",
  "graphite",
];

export function generateThemeCSS(theme: ThemeDefinition): string {
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
