import { useId, type ReactNode } from "react";
import { cn } from "@/utils/cn";

interface RotatingBadgeProps {
  text: string;
  center: ReactNode;
  className?: string;
}

/** Круглый стикер с текстом, бегущим по окружности. */
export function RotatingBadge({ text, center, className }: RotatingBadgeProps) {
  const rawId = useId();
  const id = "rb" + rawId.replace(/[^a-zA-Z0-9]/g, "");

  return (
    <div
      className={cn(
        "relative grid aspect-square place-items-center rounded-full border-[3px] border-ink shadow-[5px_5px_0_#0a0a0a]",
        className,
      )}
    >
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden>
        <defs>
          <path id={id} d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
        </defs>
        <text className="font-rmono" fontSize="15.5" fill="currentColor" letterSpacing="1">
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>
      <div className="relative">{center}</div>
    </div>
  );
}
