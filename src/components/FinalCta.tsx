import crowd from "@/assets/crowd.jpg";
import { TG_HANDLE, TG_URL } from "@/config";
import { RotatingBadge } from "./RotatingBadge";

function PlaneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M2 11.4 21.2 3.2c.6-.25 1.2.3 1 .93L18.4 20.5c-.15.6-.85.85-1.35.5l-5.3-3.9-2.7 2.6c-.3.3-.85.1-.85-.35l.25-4.1 7.9-7.3-9.8 6.2-4.4-1.5c-.75-.25-.8-1.3-.15-1.25Z" />
    </svg>
  );
}

export function FinalCta() {
  return (
    <section id="subscribe" className="relative overflow-hidden border-b-4 border-ink bg-warn">
      <img
        src={crowd}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover opacity-75 mix-blend-multiply"
      />
      <div aria-hidden className="relative h-8 border-b-[3px] border-ink pat-hazard" />

      <div className="relative mx-auto max-w-[1500px] px-4 pb-44 pt-20 sm:px-6 md:py-32">
        <p className="inline-block bg-ink px-2 py-1 font-pixel text-[9px] uppercase text-acid sm:text-[10px]">
          // последний шанс · дальше только нейроинтерфейс
        </p>

        <h2 className="mt-8 font-brut text-[clamp(2rem,7.8vw,8.5rem)] uppercase leading-[0.98] tracking-[-0.03em] md:leading-[0.9]">
          <span className="block text-white [text-shadow:5px_5px_0_#0a0a0a]">Подпишись,</span>
          <span className="block text-ink md:ml-[10vw]">пока это</span>
          <span className="block">
            <span className="my-1 inline-block -rotate-2 border-[3px] border-ink bg-acid px-3 text-ink">ещё</span>
          </span>
          <span className="block text-white [text-shadow:5px_5px_0_#0a0a0a] md:ml-[4vw]">добровольно</span>
        </h2>

        <div className="mt-14 flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-10">
          <a
            href={TG_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-brut px-5 py-4 font-rmono text-base uppercase sm:px-7 sm:py-5 sm:text-xl"
          >
            <PlaneIcon className="h-7 w-7 shrink-0" />
            <span className="md:hidden">Подписаться</span>
            <span className="hidden normal-case md:inline">t.me/{TG_HANDLE}</span>
            <span aria-hidden className="text-2xl leading-none">
              →
            </span>
          </a>
          <p className="max-w-xs border-2 border-ink bg-white px-3 py-2 font-mono text-sm text-ink">
            * Отписаться можно в любой момент. Пока что.
          </p>
        </div>

        <RotatingBadge
          text="БЕСПЛАТНО ✱ БЕЗ ЧИПА ✱ БЕЗ СМС ✱ "
          center={<span className="font-brut text-xl leading-none sm:text-2xl">0 ₽</span>}
          className="absolute bottom-8 right-4 w-28 bg-white text-ink sm:w-36 md:bottom-auto md:right-[6vw] md:top-24 md:w-44"
        />
      </div>
    </section>
  );
}
