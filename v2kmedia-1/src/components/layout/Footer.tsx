import Link from "next/link";
import { company } from "@/lib/company";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-charcoal/5" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <p className="text-lg font-bold text-charcoal">
              <span className="font-bold">v2k</span>{" "}
              <span className="font-light">Media</span>
            </p>
            <p className="mt-2 text-sm text-muted">
              Digital &bull; Print &bull; Products &bull; Custom Solutions
            </p>
            <p className="mt-4 text-sm text-muted">{company.location}</p>
            <p className="mt-2 text-sm">
              <a
                href={`mailto:${company.email}`}
                className="text-accent hover:underline"
              >
                {company.email}
              </a>
            </p>
            <p className="mt-1 text-sm">
              <a
                href={`tel:${company.phoneLink}`}
                className="text-accent hover:underline"
              >
                {company.phone}
              </a>
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-sm font-medium text-charcoal mb-4">Navigation</p>
            <nav className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-sm text-muted hover:text-accent transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-sm text-muted hover:text-accent transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm text-muted hover:text-accent transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Policy Links */}
          <div>
            <p className="text-sm font-medium text-charcoal mb-4">Legal</p>
            <nav className="flex flex-col gap-3">
              <Link
                href="/privacy"
                className="text-sm text-muted hover:text-accent transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted hover:text-accent transition-colors"
              >
                Terms
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-charcoal/5 text-sm text-muted text-center">
          <p>&copy; {currentYear} {company.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
