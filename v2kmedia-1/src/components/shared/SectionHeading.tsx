interface SectionHeadingProps {
  level?: "h2" | "h3";
  title: string;
  subtitle?: string;
}

export default function SectionHeading({
  level = "h2",
  title,
  subtitle,
}: SectionHeadingProps) {
  const Tag = level;

  return (
    <div>
      <Tag className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal relative">
        {title}
        <div className="mt-3 h-0.5 w-12 bg-accent rounded" />
      </Tag>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-muted max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
