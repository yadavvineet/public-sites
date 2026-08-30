import CTAButton from "../shared/CTAButton";
import { homeContent } from "@/content/home";

export default function ContactCTA() {
  const { headline, cta } = homeContent.contactCTA;

  return (
    <section className="py-20 sm:py-28" aria-label="Contact call to action">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal max-w-2xl mx-auto">
          {headline}
        </h2>
        <div className="mt-10">
          <CTAButton href="/contact">{cta}</CTAButton>
        </div>
      </div>
    </section>
  );
}
