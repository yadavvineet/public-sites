import { homeContent } from "@/content/home";

export default function CrossMedium() {
  const { headline, body } = homeContent.crossMedium;

  return (
    <section
      className="py-20 sm:py-28 bg-bg-dark text-offwhite"
      aria-label="Cross-medium positioning"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight max-w-3xl">
          {headline}
        </h2>
        <p className="mt-6 text-base sm:text-lg text-offwhite/70 max-w-3xl leading-relaxed">
          {body}
        </p>

        {/* Digital <-> Physical visual */}
        <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <div className="text-center">
            <p className="text-lg font-semibold tracking-wide uppercase text-offwhite/90">
              Digital
            </p>
          </div>
          <svg
            width="48"
            height="24"
            viewBox="0 0 48 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-offwhite/50"
          >
            <line x1="0" y1="12" x2="40" y2="12" />
            <polyline points="34,6 40,12 34,18" />
          </svg>
          <div className="text-center">
            <p className="text-lg font-semibold tracking-wide uppercase text-offwhite/90">
              Physical
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
