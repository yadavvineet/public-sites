import { Link } from "react-router-dom";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-offwhite flex flex-col animate-fade-in md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <div className="flex justify-end p-4">
        <button
          className="w-12 h-12 flex items-center justify-center text-charcoal"
          onClick={onClose}
          aria-label="Close menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2"
               strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <nav className="flex flex-col items-center justify-center flex-1 gap-8" aria-label="Mobile navigation">
        <Link to="/" className="text-2xl text-charcoal hover:text-accent transition-colors" onClick={onClose}>
          Home
        </Link>
        <Link to="/about" className="text-2xl text-charcoal hover:text-accent transition-colors" onClick={onClose}>
          About
        </Link>
        <a href="#capabilities" className="text-2xl text-charcoal hover:text-accent transition-colors" onClick={onClose}>
          What We Do
        </a>
        <Link to="/contact" className="text-2xl text-charcoal hover:text-accent transition-colors" onClick={onClose}>
          Contact
        </Link>
        <Link to="/contact" className="mt-4" onClick={onClose}>
          <div className="min-h-[44px] px-6 py-3 text-sm font-medium rounded bg-accent text-white hover:bg-accent-hover transition-colors text-center">
            Contact Us
          </div>
        </Link>
      </nav>
    </div>
  );
}
