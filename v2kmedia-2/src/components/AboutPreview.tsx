import { aboutContent } from "../config/content";

export default function AboutPreview() {
  return (
    <main className="bg-offwhite py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal">
            {aboutContent.heading}
          </h1>

          <div className="mt-8 space-y-4 text-base sm:text-lg text-muted leading-relaxed">
            {aboutContent.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-charcoal/5">
            <h2 className="text-xl font-semibold text-charcoal mb-6">What defines us</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {aboutContent.values.map((value) => (
                <div key={value.title}>
                  <h3 className="text-lg font-semibold text-charcoal">{value.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-charcoal/5">
            <h2 className="text-xl font-semibold text-charcoal mb-4">Our Location</h2>
            <p className="text-base text-muted whitespace-pre-line">{aboutContent.location}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
