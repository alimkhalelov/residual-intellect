import { HEADLINES, SLOGANS } from "@/data";
import { Marquee } from "./Marquee";

/** Две перекрещённые «ленты ограждения» с бегущими строками. */
export function Tapes() {
  return (
    <div className="relative z-20 -my-8 h-[128px] sm:h-[150px]">
      <div aria-hidden className="absolute inset-x-0 bottom-8 top-8 bg-ink pat-dots-light" />
      <Marquee
        items={HEADLINES}
        label="Новости и книги, где это уже было"
        duration={70}
        className="absolute left-[-5%] top-[28px] w-[110%] -rotate-[2.5deg] border-y-[3px] border-ink bg-acid py-2 font-rmono text-[13px] uppercase text-ink shadow-[0_6px_0_#0a0a0a] sm:top-[34px] sm:text-lg"
      />
      <Marquee
        items={SLOGANS}
        label="Слоганы канала"
        reverse
        duration={48}
        sep="◆"
        className="absolute left-[-5%] top-[64px] w-[110%] rotate-[2deg] border-y-[3px] border-ink bg-pink py-2 font-brut text-[14px] uppercase text-ink sm:top-[76px] sm:text-xl"
      />
    </div>
  );
}
