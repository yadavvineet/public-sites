import { Link } from "react-router-dom";
import { company } from "../config/company";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-charcoal/5" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <span className="text-lg font-bold tracking-tight text-charcoal">
              <span className="font-bold">v2k</span>{" "}
              <span className="font-light">Media</span>
            </span>
            <p className="mt-3 text-sm text-muted">
              Digital &bull; Print &bull; Products &bull; Custom Solutions
            </p>
            <p className="mt-2 text-sm text-muted">{company.location}</p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-charcoal mb-3">Contact</h3>
            <div className="space-y-2 text-sm">
              <a href={`mailto:${company.email}`} className="block text-muted hover:text-accent transition-colors">
                {company.email}
              </a>
              <a href={`tel:${company.phoneLink}`} className="block text-muted hover:text-accent transition-colors">
                {company.phone}
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-charcoal mb-3">Navigation</h3>
            <nav className="space-y-2 text-sm" aria-label="Footer navigation">
              <Link to="/" className="block text-muted hover:text-accent transition-colors">
                Home
              </Link>
              <Link to="/about" className="block text-muted hover:text-accent transition-colors">
                About
              </Link>
              <Link to="/contact" className="block text-muted hover:text-accent transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-charcoal/5 text-sm text-muted text-center">
          &copy; {currentYear} {company.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
