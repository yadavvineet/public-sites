import CTAButton from "../shared/CTAButton";
import { homeContent } from "@/content/home";

export default function Hero() {
  const { headline, subtext, primaryCTA, secondaryCTA } = homeContent.hero;

  return (
    <section className="min-h-[80vh] flex items-center" aria-label="Introduction">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32 w-full">
        <div className="flex items-start gap-6">
          {/* Accent line */}
          <div className="hidden sm:block w-1 h-24 bg-accent rounded-full shrink-0" />
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-charcoal max-w-4xl leading-tight">
              {headline}
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted max-w-2xl leading-relaxed">
              {subtext}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <CTAButton href="/contact">{primaryCTA}</CTAButton>
              <CTAButton href="/about" variant="secondary">
                {secondaryCTA}
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
