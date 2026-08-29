# V2K Media — Corporate Website

A modern, professional corporate website for [V2K Media](https://v2k.media), based in Mayur Vihar Phase-II, Delhi, India.

Built with **Next.js 16**, **TypeScript**, and **Tailwind CSS 4**.

## Prerequisites

- Node.js 20 or later
- npm 9 or later

## Local Development

```bash
# Install dependencies
npm ci

# Start development server
npm run dev
```

Visit `http://localhost:3000`.

## Building

```bash
# Default build (deep-blue swatch)
npm run build

# Build with a specific color swatch
SELECTED_SWATCH=teal npm run build
SELECTED_SWATCH=emerald npm run build
SELECTED_SWATCH=amber npm run build
```

Available color swatches: `deep-blue`, `teal`, `emerald`, `amber`.

## Project Structure

```
v2kmedia-1/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout (metadata, fonts, structured data)
│   │   ├── page.tsx            # Homepage (8 sections)
│   │   ├── about/page.tsx      # About page
│   │   ├── contact/page.tsx    # Contact page (with form)
│   │   ├── api/contact/route.ts # POST endpoint (reCAPTCHA + Lambda)
│   │   ├── sitemap.ts          # Dynamic sitemap
│   │   ├── robots.ts           # Dynamic robots.txt
│   │   └── og/route.tsx        # OG image generator
│   ├── components/
│   │   ├── layout/             # Header, MobileMenu, Footer
│   │   ├── sections/           # Hero, CapabilityCards, ContactForm, etc.
│   │   └── shared/             # CTAButton, SectionHeading, RevealOnScroll
│   ├── content/                # All copy text (home, about, contact)
│   ├── lib/                    # Company config, reCAPTCHA helper, Lambda caller
│   ├── styles/                 # globals.css, color swatches (JSON)
│   └── scripts/                # build-swatches.ts (build-time color injection)
├── .github/workflows/          # GitHub Actions (site-deploy, lambda-package)
├── docs/                       # Configuration guides
├── common-lambda/              # AWS Lambda (SES email + reCAPTCHA)
└── v2kmedia.md                 # Original design specification
```

## Environment Variables

Create a `.env.local` file for local development:

```env
# Google reCAPTCHA (get keys from https://www.google.com/recaptcha/admin)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here

# Lambda URL (from Lambda console — enable "Configure as REST API endpoint")
LAMBDA_URL=https://xxxxx.execute-api.ap-south-1.amazonaws.com/lambda-url/
```

## Color Swatches

The site supports 4 color palettes, selectable at build time:

| Swatch | Accent | Accent Hover |
|--------|--------|-------------|
| deep-blue | `#1e40af` | `#1a3a9e` |
| teal | `#0d9488` | `#0f766e` |
| emerald | `#059669` | `#047857` |
| amber | `#d97706` | `#b45309` |

The accent color changes the primary button color, link hover colors, and accent decorative elements. All other colors (charcoal, off-white, muted, surface, bg-dark) remain constant.

See `docs/COLOR-SWATCHES.md` for details on adding custom swatches.

## Deployment

### GitHub Actions (S3)

1. Configure AWS secrets in repository settings:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_S3_BUCKET` (e.g., `v2k-media-site`)
   - `AWS_REGION` (optional, defaults to `ap-south-1`)

2. Trigger the **Site Deploy** workflow from the Actions tab.
3. Select your color swatch and deployment target.

### GitHub Actions (nginx)

Same as S3, but additionally configure:
- `NGINX_HOST` — your server's hostname or IP
- `NGINX_USER` — SSH user (e.g., `deploy`)
- `SSH_PRIVATE_KEY` — SSH private key for the deploy user

### Static Output

The built site outputs to the `out/` directory. You can serve this with any static file server:

```bash
# Python
python -m http.server 8000 -d out/

# Node
npx serve out/

# Docker
docker run -p 8080:80 -v $(pwd)/out:/usr/share/nginx/html:ro nginx
```

## Contact Form

The contact form includes:
- Client-side validation (name, email, message required)
- Google reCAPTCHA v2 checkbox (security verification)
- Server-side reCAPTCHA validation (API route)
- Lambda function validation (defense in depth)
- AWS SES email delivery

See `docs/SETUP.md` for configuration details.

## Accessibility

Targeting WCAG AA standards:
- Semantic HTML with correct heading hierarchy
- Keyboard-accessible navigation
- Sufficient color contrast (4.5:1 for text, 3:1 for large text)
- Clear focus states
- Accessible form labels
- `prefers-reduced-motion` respected

## License

Copyright © 2026 V2K Media. All rights reserved.
