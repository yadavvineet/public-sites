import { homeContent } from "../config/content";

export default function CrossMedium() {
  const { headline, body } = homeContent.crossMedium;

  return (
    <section className="bg-bg-dark py-16 sm:py-20" aria-label="Cross-medium">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-offwhite">
            {headline}
          </h2>
          <div className="mt-6 space-y-4 text-base sm:text-lg text-gray-300 leading-relaxed">
            {body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {/* Digital <-> Physical visual */}
          <div className="mt-10 flex items-center justify-center gap-6 text-sm" aria-hidden="true">
            <span className="text-offwhite/60 font-medium">Digital</span>
            <div className="flex items-center gap-2">
              <div className="w-16 h-px bg-accent/40" />
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-accent">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="w-16 h-px bg-accent/40" />
            </div>
            <span className="text-offwhite/60 font-medium">Physical</span>
          </div>
        </div>
      </div>
    </section>
  );
}
