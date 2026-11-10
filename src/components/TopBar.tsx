import { TG_URL } from "@/config";
import { cn } from "@/utils/cn";

interface TopBarProps {
  chaos: boolean;
  onChaos: () => void;
}

export function TopBar({ chaos, onChaos }: TopBarProps) {
  return (
    <div className="relative z-30 flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 border-b-2 border-acid bg-ink px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide text-acid sm:px-4">
      <p className="flex items-center gap-2">
        <span aria-hidden className="animate-blink text-warn">
          ⚠
        </span>
        <span className="hidden sm:inline">Этот сайт не адаптирован под ваш мозг. Адаптируйте мозг.</span>
        <span className="sm:hidden">Сайт не адаптирован под ваш мозг</span>
      </p>

      <p className="hidden items-center gap-2 lg:flex">
        Вы — посетитель №
        <span
          className="flex gap-[2px]"
          title="451° по Фаренгейту — температура, при которой горит бумага"
          aria-label="000451"
        >
          {"000451".split("").map((d, i) => (
            <span
              key={i}
              aria-hidden
              className="grid h-[18px] w-[13px] place-items-center border border-[#333] bg-black text-[12px] text-[#39ff14]"
            >
              {d}
            </span>
          ))}
        </span>
      </p>

      <div className="flex items-center gap-3">
        <a
          href={TG_URL}
          target="_blank"
          rel="noreferrer"
          className="underline decoration-dotted underline-offset-2 hover:bg-acid hover:text-ink"
        >
          t.me →
        </a>
        <button
          type="button"
          onClick={onChaos}
          aria-pressed={chaos}
          className={cn(
            "border-2 px-2 py-0.5 font-pixel text-[8px] leading-none tracking-normal transition-colors",
            chaos
              ? "border-acid bg-acid text-ink"
              : "animate-flicker border-warn bg-warn text-white hover:bg-white hover:text-warn",
          )}
        >
          {chaos ? "ПОЧИНИТЬ" : "НЕ НАЖИМАТЬ"}
        </button>
      </div>
    </div>
  );
}
