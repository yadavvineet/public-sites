import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import CTAButton from "../shared/CTAButton";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.currentTarget.textContent === "What We Do") {
      e.preventDefault();
      const capabilities = document.getElementById("capabilities");
      capabilities?.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-shadow duration-200 ${
        isScrolled ? "shadow-sm" : ""
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold tracking-tight text-charcoal"
            aria-label="V2K Media home"
          >
            <span className="font-bold">v2k</span>{" "}
            <span className="font-light">Media</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            <Link
              to="/"
              className="text-sm text-muted hover:text-charcoal transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-sm text-muted hover:text-charcoal transition-colors"
            >
              About
            </Link>
            <Link
              to="/"
              onClick={handleNavClick}
              className="text-sm text-muted hover:text-charcoal transition-colors"
            >
              What We Do
            </Link>
            <Link
              to="/contact"
              className="text-sm text-muted hover:text-charcoal transition-colors"
            >
              Contact
            </Link>
            <CTAButton href="/contact">Contact Us</CTAButton>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-12 h-12 text-charcoal"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-5 space-y-1.5">
              <span className="block h-0.5 bg-current transition-all" />
              <span className="block h-0.5 bg-current transition-all" />
              <span className="block h-0.5 bg-current transition-all" />
            </span>
          </button>
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
