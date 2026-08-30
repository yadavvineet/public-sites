import { homeContent } from "../config/content";
import CTAButton from "./shared/CTAButton";

export default function Hero() {
  const { headline, supporting, primaryCTA, secondaryCTA } = homeContent.hero;

  return (
    <section className="relative overflow-hidden bg-offwhite" aria-label="Hero">
      {/* Abstract SVG background */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 800 600" fill="none">
          <circle cx="600" cy="200" r="300" fill="var(--color-accent)" opacity="0.08" />
          <circle cx="200" cy="400" r="250" fill="var(--color-accent)" opacity="0.05" />
          <rect x="100" y="100" width="200" height="200" rx="8" fill="var(--color-accent)" opacity="0.04" transform="rotate(15 200 200)" />
          <rect x="500" y="350" width="150" height="150" rx="4" fill="var(--color-accent)" opacity="0.06" transform="rotate(-10 575 425)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-charcoal leading-tight">
            {headline}
          </h1>
          <p className="mt-6 text-base sm:text-lg text-muted leading-relaxed max-w-2xl">
            {supporting}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <CTAButton to="/contact">{primaryCTA}</CTAButton>
            <a
              href="#capabilities"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("capabilities")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <CTAButton variant="secondary">{secondaryCTA}</CTAButton>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
