import { homeContent } from "../config/content";

export default function WhyV2K() {
  const items = homeContent.whyV2K;

  return (
    <section className="bg-offwhite py-16 sm:py-20" aria-label="Why V2K Media">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl sm:text-3xl font-bold tracking-tight text-charcoal mb-12">
          Why V2K Media
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item) => (
            <div key={item.title}>
              <h3 className="text-lg font-semibold text-charcoal">{item.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
