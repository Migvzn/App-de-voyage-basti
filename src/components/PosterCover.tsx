import { cn } from "@/lib/utils";
import { DynIcon } from "@/components/ui/icon";

/**
 * Editorial poster cover. Renders a designed gradient + grain + glyph.
 * Always paints — no broken-image placeholders. Swap for real
 * photography by wiring UNSPLASH_ACCESS_KEY and a CityImage proxy.
 */
export function PosterCover({
  gradient,
  iconKey,
  label,
  sublabel,
  className,
  rounded = "rounded-3xl",
}: {
  gradient: string;
  iconKey?: string;
  label?: string;
  sublabel?: string;
  className?: string;
  rounded?: string;
}) {
  return (
    <div
      className={cn(
        "poster-grain relative overflow-hidden",
        rounded,
        className,
      )}
      style={{ background: gradient }}
    >
      <div className="absolute -right-6 -top-8 h-32 w-32 rounded-full bg-white/15 blur-2xl" />
      <div className="absolute -left-8 bottom-0 h-28 w-28 rounded-full bg-black/10 blur-2xl" />
      {iconKey && (
        <DynIcon
          name={iconKey}
          strokeWidth={1.25}
          className="absolute right-4 top-4 h-8 w-8 text-white/80"
        />
      )}
      {label && (
        <div className="absolute inset-x-0 bottom-0 p-5">
          {sublabel && (
            <div className="text-[11px] font-medium uppercase tracking-widest text-white/75">
              {sublabel}
            </div>
          )}
          <div className="font-display text-2xl font-semibold leading-tight text-white drop-shadow-sm">
            {label}
          </div>
        </div>
      )}
    </div>
  );
}
