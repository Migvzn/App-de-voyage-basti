import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ── Button ────────────────────────────────────────────────── */

const button = cva(
  "inline-flex items-center justify-center gap-2 font-medium rounded-2xl transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)] whitespace-nowrap",
  {
    variants: {
      variant: {
        primary:
          "bg-brand text-white shadow-soft hover:bg-brand-dark hover:shadow-lift",
        secondary:
          "bg-[var(--elevated)] text-ink border border-line hover:border-brand/40",
        ghost: "text-ink hover:bg-[var(--elevated)]",
        outline: "border border-line text-ink hover:bg-[var(--elevated)]",
      },
      size: {
        sm: "h-9 px-3.5 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-[3.25rem] px-7 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button className={cn(button({ variant, size }), className)} {...props} />
  );
}

/* ── Card ──────────────────────────────────────────────────── */

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-[var(--surface)] border border-line rounded-3xl",
        className,
      )}
      {...props}
    />
  );
}

/* ── Chip ──────────────────────────────────────────────────── */

export function Chip({
  className,
  active,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { active?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border transition-colors",
        active
          ? "bg-brand text-white border-brand"
          : "bg-[var(--elevated)] text-muted border-line",
        className,
      )}
      {...props}
    />
  );
}

/* ── Progress ──────────────────────────────────────────────── */

export function Progress({
  value,
  className,
  color = "#FF5A3C",
}: {
  value: number;
  className?: string;
  color?: string;
}) {
  return (
    <div
      className={cn(
        "h-2 w-full rounded-full bg-[var(--line)] overflow-hidden",
        className,
      )}
    >
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
          background: color,
        }}
      />
    </div>
  );
}

/* ── Skeleton ──────────────────────────────────────────────── */

export function Skeleton({
  className,
}: {
  className?: string;
}) {
  return <div className={cn("skeleton rounded-2xl", className)} />;
}

/* ── Stat ──────────────────────────────────────────────────── */

export function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: React.ReactNode;
  sub?: string;
}) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-muted">{label}</div>
      <div className="mt-1 font-display text-2xl font-semibold">{value}</div>
      {sub && <div className="text-xs text-muted mt-0.5">{sub}</div>}
    </div>
  );
}
