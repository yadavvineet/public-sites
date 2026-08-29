import { homeContent } from "@/content/home";

export default function CompanyIntro() {
  const { headline, body } = homeContent.companyIntro;

  return (
    <section className="py-20 sm:py-28" aria-label="Company introduction">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal">
            {headline}
          </h2>
          <p className="mt-6 text-base sm:text-lg text-muted leading-relaxed">
            {body}
          </p>
        </div>
      </div>
    </section>
  );
}
