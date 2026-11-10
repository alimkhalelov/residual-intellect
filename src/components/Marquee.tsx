import type { CSSProperties } from "react";
import { cn } from "@/utils/cn";

interface MarqueeProps {
  items: string[];
  className?: string;
  reverse?: boolean;
  duration?: number;
  sep?: string;
  label?: string;
}

export function Marquee({ items, className, reverse = false, duration = 40, sep = "✱", label }: MarqueeProps) {
  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className="px-5">{t}</span>
          <span aria-hidden className="px-1">
            {sep}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("group overflow-hidden whitespace-nowrap", className)} role="marquee" aria-label={label}>
      <div
        className={cn("marquee-track flex w-max", reverse && "is-rev")}
        style={{ "--dur": `${duration}s` } as CSSProperties}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
