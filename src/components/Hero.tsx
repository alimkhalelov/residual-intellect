import { useEffect, useState, type PointerEvent as RPointerEvent } from "react";
import bust from "@/assets/bust.jpg";
import { TG_URL } from "@/config";
import { useTypewriter } from "@/hooks/useTypewriter";
import { cn } from "@/utils/cn";
import { Win95Window } from "./Win95Window";
import { RotatingBadge } from "./RotatingBadge";

const DESCRIPTION =
  "Канал о киберпанке и сай-фае, которые сбываются прямо сейчас. Берём свежие новости техно-тусовки и находим роман, где это уже было. Обычно — в главе, после которой всё пошло не так.";

const DENY_STAGES = [
  "Отрицание — первая стадия. Следующая — подписка.",
  "Будущее не отменяется нажатием кнопки. Мы проверяли.",
  "Кнопка устала от вас убегать.",
  "Ладно, вы победили. Кнопка тоже подписалась.",
];

function ErrorDialog() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [flees, setFlees] = useState(0);
  const [stage, setStage] = useState(-1);
  const surrendered = stage >= DENY_STAGES.length - 1;

  const flee = (e: RPointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== "mouse" || flees >= 5) return;
    setFlees((f) => f + 1);
    setOffset({ x: (Math.random() - 0.5) * 240, y: (Math.random() - 0.5) * 110 });
  };

  const deny = () => {
    setStage((s) => Math.min(s + 1, DENY_STAGES.length - 1));
    setOffset({ x: 0, y: 0 });
  };

  return (
    <Win95Window
      title="future.exe — Ошибка"
      icon="⚠"
      draggable
      className="relative z-30 w-full max-w-[25rem] md:-rotate-2"
    >
      <div className="flex gap-3">
        <span
          aria-hidden
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#e00000] text-2xl font-bold leading-none text-white shadow-[inset_-2px_-2px_0_rgba(0,0,0,.35)]"
        >
          ×
        </span>
        <div className="text-[14px] leading-snug">
          <p>
            <b>Будущее наступило раньше запланированного срока.</b>
          </p>
          <p className="mt-1">Нейроинтерфейс не обнаружен. Что делаем?</p>
          {stage >= 0 && (
            <p className="mt-2 border border-ink bg-[#ffffe1] px-2 py-1 text-[13px]" role="status">
              {DENY_STAGES[stage]}
            </p>
          )}
        </div>
      </div>
      <div className="mt-5 flex justify-center gap-3">
        <a href={TG_URL} target="_blank" rel="noreferrer" className="win-btn font-bold outline outline-1 outline-black">
          Подписаться
        </a>
        {surrendered ? (
          <a href={TG_URL} target="_blank" rel="noreferrer" className="win-btn">
            Подписаться (тоже)
          </a>
        ) : (
          <button
            type="button"
            className="win-btn transition-transform duration-150"
            style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
            onPointerEnter={flee}
            onClick={deny}
          >
            Отрицать
          </button>
        )}
      </div>
    </Win95Window>
  );
}

function LoadingBar() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setDone(true), 4600);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="mt-10 max-w-md font-mono text-[11px] uppercase">
      <div className="mb-1 flex justify-between gap-4">
        <span>Загрузка будущего{done ? ":" : "..."}</span>
        <span className={done ? "font-bold text-warn" : "animate-blink"}>{done ? "99%" : "▮▮▮"}</span>
      </div>
      <div className="h-6 border-[3px] border-ink bg-white p-[2px]">
        <div className="load-bar h-full" />
      </div>
      <p className={cn("mt-1 normal-case text-warn transition-opacity duration-500", done ? "opacity-100" : "opacity-0")}>
        Осталось ~2 мин. (с 1984 года)
      </p>
    </div>
  );
}

export function Hero() {
  const { typed } = useTypewriter(DESCRIPTION, 16, 700);

  return (
    <section id="top" className="relative overflow-hidden border-b-4 border-ink bg-white pat-grid">
      {/* служебная строка */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 border-b-2 border-dashed border-ink/40 px-3 py-2 font-pixel text-[8px] uppercase leading-relaxed sm:px-5 sm:text-[10px]">
        <span className="bg-ink px-1.5 py-1 text-white">Telegram-канал</span>
        <span className="hidden md:inline">Основан в настоящем, которое было будущим</span>
        <span className="text-warn">v0.9 beta (навсегда)</span>
      </div>

      {/* коллаж: бюст в VR-шлеме */}
      <img
        src={bust}
        alt="Мраморный бюст философа в VR-шлеме, из головы торчат провода"
        className="pointer-events-none absolute right-[-9vw] top-[3.4rem] z-10 w-[47vw] max-w-[620px] rotate-[8deg] select-none mix-blend-multiply sm:right-[-4vw] md:right-[-1vw] md:top-[4rem] md:w-[37vw] lg:right-[3vw] lg:w-[31vw]"
      />

      {/* заголовок */}
      <h1 aria-label="Остаточный интеллект" className="relative z-[5] px-2 pt-6 sm:px-5 md:pt-10">
        <span className="block font-brut text-[clamp(3rem,13.4vw,15rem)] leading-[0.82] tracking-[-0.04em]">
          ОСТАТОЧ<span className="text-pink">-</span>
        </span>
        <span className="mt-[0.08em] flex items-start gap-3 sm:gap-6">
          <span className="ml-[5vw] inline-block -rotate-2 bg-pink px-[0.12em] font-brut text-[clamp(3rem,13.4vw,15rem)] leading-[0.98] tracking-[-0.04em] shadow-[0.06em_0.06em_0_#0a0a0a]">
            НЫЙ
          </span>
          <span className="mt-[1.4vw] hidden max-w-[19rem] border-l-4 border-ink bg-white/85 py-1 pl-3 pr-2 font-mono text-[11px] font-normal leading-snug tracking-normal sm:block md:text-[13px]">
            <b>ос·та́·точ·ный</b> <i>[прил.]</i> — то, что остаётся от интеллекта, когда искусственный уже всё сделал
            за вас.<sup className="text-link">[1]</sup>
          </span>
        </span>
        <span className="-mt-[0.04em] ml-[1.5vw] block font-serif text-[clamp(3.4rem,16.5vw,18rem)] font-normal italic leading-[0.95] tracking-[-0.035em] text-link underline decoration-[0.045em] underline-offset-[0.13em]">
          интеллект
        </span>
      </h1>

      <div className="relative z-20 grid gap-14 px-3 pb-16 pt-10 sm:px-5 md:grid-cols-12 md:gap-8 md:pb-24">
        {/* левая колонка */}
        <div className="md:col-span-7 lg:col-span-6">
          <div className="relative -rotate-1 border-[3px] border-ink bg-ink p-4 pt-6 font-mono text-[15px] leading-relaxed text-acid shadow-[10px_10px_0_var(--color-pink)] sm:p-5 sm:pt-7 sm:text-base">
            <span className="absolute -top-3 left-3 border-2 border-ink bg-acid px-2 py-1 font-pixel text-[8px] text-ink">
              ~/о_канале.txt
            </span>
            <p className="relative">
              <span className="sr-only">{DESCRIPTION}</span>
              <span aria-hidden className="invisible">
                &gt; {DESCRIPTION}█
              </span>
              <span aria-hidden className="absolute inset-0">
                <span className="text-pink">&gt; </span>
                {typed}
                <span className="animate-blink">█</span>
              </span>
            </p>
          </div>

          <div className="mt-11 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a
              href={TG_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-brut px-5 py-4 font-rmono text-[15px] uppercase sm:text-lg"
            >
              Подключиться к каналу
              <span aria-hidden className="text-2xl leading-none">
                →
              </span>
            </a>
            <p className="-rotate-6 font-hand text-[27px] leading-none text-warn">
              ← жми, это не больно*
              <br />
              <span className="text-xl">*почти</span>
            </p>
          </div>

          <a href="#archive" className="link-raw mt-7 inline-block font-serif text-lg">
            сначала посмотреть архив сбывшегося ↓
          </a>

          <LoadingBar />
        </div>

        {/* правая колонка */}
        <div className="relative md:col-span-5 lg:col-span-6">
          <RotatingBadge
            text="ЭТО НЕ ФАНТАСТИКА ✱ ЭТО НОВОСТИ ✱ "
            center={<span className="font-brut text-2xl sm:text-3xl">ОИ</span>}
            className="absolute -top-16 right-0 z-40 w-28 bg-acid text-ink sm:w-36 md:-top-6 md:left-[-9%] md:right-auto md:w-40"
          />
          <div className="flex flex-col items-stretch gap-9 pt-12 md:items-end md:pt-20">
            <ErrorDialog />
            <div className="rotate-6 self-end border-[3px] border-ink bg-pink px-4 py-2 font-rmono text-sm uppercase shadow-[5px_5px_0_#0a0a0a] md:mr-10">
              Без ГМО и ИИ*
              <span className="mt-1 block font-mono text-[10px] normal-case">*ИИ остаточный, натуральный</span>
            </div>
            <p className="self-start font-serif text-sm italic md:self-end">
              ↑ Рис. 0. Философ, прочитавший техноновости.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
