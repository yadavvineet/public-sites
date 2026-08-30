import { aboutContent } from "@/content/about";

export default function AboutPreview() {
  const { intro, whatDefinesUs, location } = aboutContent;

  return (
    <div className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal">
            {intro.headline}
          </h1>
          <p className="mt-6 text-base sm:text-lg text-muted leading-relaxed">
            {intro.body}
          </p>
        </div>

        {/* What defines us */}
        <div className="mt-16 sm:mt-20">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-charcoal mb-10">
            What defines us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10">
            {whatDefinesUs.map((item) => (
              <div key={item.title}>
                <h3 className="text-lg font-semibold text-charcoal">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="mt-16 sm:mt-20 pt-10 sm:pt-12 border-t border-charcoal/10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-charcoal">
            {location.title}
          </h2>
          <p className="mt-4 text-base text-muted whitespace-pre-line">
            {location.body}
          </p>
        </div>
      </div>
    </div>
  );
}
