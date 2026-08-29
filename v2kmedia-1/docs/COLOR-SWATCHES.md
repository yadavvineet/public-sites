# Color Swatches Guide

The V2K Media website supports build-time color swatches. The selected swatch's accent colors are injected into the CSS at build time — no runtime JavaScript is needed.

## Available Swatches

| Swatch | Accent | Accent Hover |
|--------|--------|-------------|
| **deep-blue** (default) | `#1e40af` | `#1a3a9e` |
| **teal** | `#0d9488` | `#0f766e` |
| **emerald** | `#059669` | `#047857` |
| **amber** | `#d97706` | `#b45309` |

### Visual Comparison

```
Deep Blue:  ████ #1e40af
Teal:       ████ #0d9488
Emerald:    ████ #059669
Amber:      ████ #d97706
```

## How It Works

1. **Swatch files** (`src/styles/swatches/*.json`) define color palettes as JSON objects.
2. **Build script** (`scripts/build-swatches.ts`) reads the selected swatch and replaces the CSS custom property values in `globals.css`.
3. **Static output** contains the CSS with the selected swatch's colors baked in.

The system only changes `--color-accent` and `--color-accent-hover`. All other CSS custom properties (charcoal, offwhite, muted, surface, bg-dark) remain constant across all swatches.

## Building with a Swatch

### Local

```bash
# Default (deep-blue)
npm run build

# Specific swatch
SELECTED_SWATCH=teal npm run build
SELECTED_SWATCH=emerald npm run build
SELECTED_SWATCH=amber npm run build
```

### GitHub Actions

1. Go to **Actions** → **Site Deploy** → **Run workflow**
2. Select your desired color swatch from the dropdown
3. Click **Run workflow**

## Adding a Custom Swatch

### 1. Create a Swatch JSON File

Create `src/styles/swatches/your-color.json`:

```json
{
  "name": "Your Color",
  "id": "your-color",
  "colors": {
    "charcoal": "#1c1c1e",
    "offwhite": "#fafafa",
    "accent": "#your-hex",
    "accent-hover": "#your-hover-hex",
    "muted": "#6b7280",
    "surface": "#f3f4f6",
    "bg-dark": "#111827"
  }
}
```

### 2. Register in index.ts

Add an import and entry to `src/styles/swatches/index.ts`:

```ts
import yourColor from "./your-color.json";
// ...
export const swatches = { deepBlue, teal, emerald, amber, yourColor } as const;
export type SwatchId = keyof typeof swatches;
```

### 3. Add to GitHub Actions

Add `"your-color"` to the `options` array in `.github/workflows/site-deploy.yml`:

```yaml
options:
  - deep-blue
  - teal
  - emerald
  - amber
  - your-color
```

## Color Guidelines

When choosing accent colors:

- **Contrast**: Ensure the accent color has sufficient contrast against the off-white background (`#fafafa`) for text/buttons. The WCAG AA requirement is 4.5:1 for normal text and 3:1 for large text.
- **Hover state**: The accent-hover should be slightly darker than the accent for hover states.
- **Consistency**: Keep charcoal, offwhite, muted, surface, and bg-dark constant across swatches for visual consistency.

## Current Color Palette

All swatches share these base colors:

| Property | Value | Usage |
|----------|-------|-------|
| `--color-charcoal` | `#1c1c1e` | Primary text, headings |
| `--color-offwhite` | `#fafafa` | Page background |
| `--color-muted` | `#6b7280` | Secondary text, descriptions |
| `--color-surface` | `#f3f4f6` | Section backgrounds, cards |
| `--color-bg-dark` | `#111827` | Dark section backgrounds |

Only `--color-accent` and `--color-accent-hover` change per swatch.
