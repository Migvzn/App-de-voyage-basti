export function PageHeader({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <div className="text-xs font-semibold uppercase tracking-widest text-brand">
            {eyebrow}
          </div>
        )}
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1.5 max-w-xl text-sm text-muted">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}
