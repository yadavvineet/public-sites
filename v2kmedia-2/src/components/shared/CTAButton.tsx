import { Link } from "react-router-dom";

interface CTAButtonProps {
  children: React.ReactNode;
  href?: string;
  to?: string;
  variant?: "primary" | "secondary";
  className?: string;
  disabled?: boolean;
}

export default function CTAButton({
  children,
  href,
  to,
  variant = "primary",
  className = "",
  disabled = false,
}: CTAButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center min-h-[44px] px-6 py-3 text-sm font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses =
    variant === "primary"
      ? "bg-accent text-white hover:bg-accent-hover focus:ring-accent"
      : "border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-offwhite focus:ring-charcoal";

  const classes = `${baseClasses} ${variantClasses} ${className}`.trim();

  if (disabled) {
    return (
      <button className={`${classes} opacity-50 cursor-not-allowed`} disabled>
        {children}
      </button>
    );
  }

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} type="button">
      {children}
    </button>
  );
}
