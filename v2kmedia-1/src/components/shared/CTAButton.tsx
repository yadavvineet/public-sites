import Link from "next/link";

interface CTAButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
  disabled?: boolean;
}

export default function CTAButton({
  children,
  href,
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

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type="button">
      {children}
    </button>
  );
}
