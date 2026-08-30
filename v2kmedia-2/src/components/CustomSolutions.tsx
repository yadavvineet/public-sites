import { homeContent } from "../config/content";
import CTAButton from "./shared/CTAButton";

export default function CustomSolutions() {
  const { headline, body, cta } = homeContent.customSolutions;

  return (
    <section className="bg-offwhite py-16 sm:py-20" aria-label="Custom solutions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-charcoal">
            {headline}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted leading-relaxed">
            {body}
          </p>
          <div className="mt-6">
            <CTAButton to="/contact">{cta}</CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
