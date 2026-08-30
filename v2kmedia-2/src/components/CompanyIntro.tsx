import { homeContent } from "../config/content";

export default function CompanyIntro() {
  const { heading, body } = homeContent.intro;

  return (
    <section className="bg-offwhite py-16 sm:py-20" aria-label="Introduction">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-charcoal">
            {heading}
          </h2>
          <div className="mt-6 space-y-4 text-base sm:text-lg text-muted leading-relaxed">
            {body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
