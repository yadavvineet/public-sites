import { homeContent } from "../config/content";

const iconMap: Record<string, React.ReactNode> = {
  digital: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="4" y="6" width="24" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <line x1="12" y1="26" x2="20" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="22" x2="16" y2="26" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  print: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="6" y="4" width="20" height="24" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <line x1="10" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="10" y1="14" x2="22" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="10" y1="18" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  custom: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 8v16M8 16h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  gifting: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="6" y="12" width="20" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="4" y="8" width="24" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <line x1="16" y1="8" x2="16" y2="26" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
};

export default function CapabilityGrid() {
  const capabilities = homeContent.capabilities;

  return (
    <section id="capabilities" className="bg-offwhite py-16 sm:py-20" aria-label="Capabilities">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-charcoal">
            What We Do
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="group p-6 rounded-lg bg-surface border border-charcoal/5 hover:border-accent/20 transition-colors"
            >
              <div className="text-accent mb-4 group-hover:scale-110 transition-transform">
                {iconMap[cap.icon]}
              </div>
              <h3 className="text-lg font-semibold text-charcoal">{cap.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{cap.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
