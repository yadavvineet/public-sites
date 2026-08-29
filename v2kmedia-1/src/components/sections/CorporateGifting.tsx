import CTAButton from "../shared/CTAButton";
import { homeContent } from "@/content/home";

export default function CorporateGifting() {
  const { headline, body, cta } = homeContent.corporateGifting;

  return (
    <section className="py-16 sm:py-20" aria-label="Corporate gifting">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-charcoal max-w-2xl mx-auto">
          {headline}
        </h2>
        <p className="mt-4 text-base text-muted max-w-xl mx-auto leading-relaxed">
          {body}
        </p>
        <div className="mt-8">
          <CTAButton href="/contact?subject=Corporate+Gifting">
            {cta}
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
