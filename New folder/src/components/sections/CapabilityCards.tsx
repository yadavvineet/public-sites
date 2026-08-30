import { homeContent } from "@/content/home";

const icons: Record<string, React.ReactNode> = {
  digital: (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="26" height="18" rx="2" />
      <line x1="3" y1="24" x2="29" y2="24" />
      <line x1="12" y1="24" x2="12" y2="28" />
      <line x1="20" y1="24" x2="20" y2="28" />
    </svg>
  ),
  print: (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="6" y="3" width="20" height="26" rx="2" />
      <line x1="11" y1="9" x2="21" y2="9" />
      <line x1="11" y1="14" x2="21" y2="14" />
      <line x1="11" y1="19" x2="17" y2="19" />
    </svg>
  ),
  custom: (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="16" cy="16" r="5" />
      <path d="M16 3v4M16 25v4M3 16h4M25 16h4M7.1 7.1l2.8 2.8M22.1 22.1l2.8 2.8M7.1 24.9l2.8-2.8M22.1 9.9l2.8-2.8" />
    </svg>
  ),
  gifting: (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="12" width="24" height="16" rx="2" />
      <path d="M12 12V8a4 4 0 018 0v4" />
      <line x1="16" y1="12" x2="16" y2="28" />
    </svg>
  ),
};

export default function CapabilityCards() {
  return (
    <section
      id="capabilities"
      className="py-20 sm:py-28 bg-surface"
      aria-label="Capabilities"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal mb-12 sm:mb-16">
          What We Do
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {homeContent.capabilities.map((cap) => (
            <div
              key={cap.title}
              className="p-6 sm:p-8 rounded-lg bg-offwhite border border-charcoal/10 card-hover"
            >
              <div className="text-accent mb-4">{icons[cap.icon]}</div>
              <h3 className="text-lg font-semibold text-charcoal">
                {cap.title}
              </h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
