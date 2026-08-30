import { homeContent } from "@/content/home";

export default function WhyV2K() {
  return (
    <section className="py-20 sm:py-28 bg-surface" aria-label="Why V2K Media">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal mb-12 sm:mb-16 text-center">
          Why V2K Media
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
          {homeContent.whyV2K.map((item) => (
            <div key={item.title}>
              <h3 className="text-xl font-semibold text-charcoal">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
