import CTAButton from "../shared/CTAButton";
import { homeContent } from "@/content/home";

export default function CustomSolutions() {
  const { headline, body, cta } = homeContent.customSolutions;

  return (
    <section className="py-20 sm:py-28" aria-label="Custom solutions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal max-w-3xl mx-auto">
          {headline}
        </h2>
        <p className="mt-6 text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
          {body}
        </p>
        <div className="mt-10">
          <CTAButton href="/contact">{cta}</CTAButton>
        </div>
      </div>
    </section>
  );
}
