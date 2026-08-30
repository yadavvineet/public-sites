import { homeContent } from "../config/content";
import CTAButton from "./shared/CTAButton";

export default function ContactCTA() {
  const { heading } = homeContent.contactCTA;

  return (
    <section className="bg-accent py-16 sm:py-20" aria-label="Contact call to action">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-offwhite">
          {heading}
        </h2>
        <div className="mt-6">
          <CTAButton to="/contact">
            <span className="text-offwhite border-2 border-offwhite hover:bg-offwhite hover:text-accent">
              Get in Touch
            </span>
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
