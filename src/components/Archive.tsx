import { useMemo, useState } from "react";
import hand from "@/assets/hand.jpg";
import { AVG_LAG, lagOf, prophecies, TAGS, type Prophecy, type Tag } from "@/data";
import { TG_URL } from "@/config";
import { cn } from "@/utils/cn";
import { plural, shuffle } from "@/utils/helpers";
import { Glitch } from "./Glitch";

type Sort = "book" | "lag-asc" | "lag-desc" | "random";
type Filter = Tag | "ВСЁ";

const CARD_STYLES = [
  { box: "bg-white text-ink", accent: "text-warn", line: "bg-ink", stamp: "text-warn" },
  { box: "bg-acid text-ink", accent: "text-blu", line: "bg-ink", stamp: "text-warn" },
  { box: "bg-pink text-ink", accent: "text-white", line: "bg-ink", stamp: "text-white" },
  { box: "bg-blu text-white", accent: "text-acid", line: "bg-white", stamp: "text-acid" },
  { box: "bg-paper pat-dots text-ink", accent: "text-pink", line: "bg-ink", stamp: "text-warn" },
  { box: "bg-warn text-ink", accent: "text-white", line: "bg-ink", stamp: "text-white" },
  { box: "bg-cyan text-ink", accent: "text-blu", line: "bg-ink", stamp: "text-warn" },
  { box: "bg-win text-ink", accent: "text-warn", line: "bg-ink", stamp: "text-warn" },
];
const ROT = [-2.2, 1.6, -1, 2.4, -1.8, 0.8, 2, -2.6];

function Card({ p }: { p: Prophecy }) {
  const s = CARD_STYLES[p.id % CARD_STYLES.length];
  const rot = ROT[p.id % ROT.length];
  const lag = lagOf(p);

  return (
    <article
      className={cn(
        "group relative flex flex-col border-[3px] border-ink p-4 pt-5 shadow-[7px_7px_0_var(--color-acid)] transition-[rotate,translate,box-shadow] duration-200 hover:z-10 hover:-translate-y-1 hover:rotate-0! hover:shadow-[12px_12px_0_var(--color-pink)]",
        s.box,
      )}
      style={{ rotate: `${rot}deg` }}
    >
      <header className="flex items-center justify-between gap-2 font-pixel text-[8px] uppercase leading-none">
        <span>№{String(p.id).padStart(3, "0")}</span>
        <span className="border-2 border-current px-1.5 py-1">{p.tag}</span>
      </header>

      <p className="mt-4 font-mono text-[11px] uppercase tracking-widest opacity-80">Было · {p.bookYear}</p>
      <h3 className="mt-1 font-serif text-[25px] italic leading-[1.05]">«{p.book}»</h3>
      <p className="mt-1.5 font-rmono text-[11px] uppercase">{p.author}</p>
      <p className="mt-3 font-serif text-[17px] leading-snug">{p.was}</p>

      <div className="my-4 flex items-center gap-2">
        <span className={cn("h-[3px] flex-1", s.line)} />
        <span className="font-brut text-lg leading-none">
          ↓ {lag} {plural(lag, ["год", "года", "лет"])}
        </span>
        <span className={cn("h-[3px] flex-1", s.line)} />
      </div>

      <p className="font-mono text-[11px] uppercase tracking-widest opacity-80">Стало · {p.realYear}</p>
      <p className="mt-1 font-wide text-[13.5px] font-bold leading-snug">{p.became}</p>
      <p className={cn("mt-auto pt-4 font-hand text-[23px] leading-tight", s.accent)}>{p.comment}</p>

      <span
        aria-hidden
        className={cn(
          "stamp absolute -top-4 right-3 rotate-[9deg] bg-transparent text-[11px] transition-transform duration-200 group-hover:scale-125 group-hover:rotate-[-6deg]",
          s.stamp,
        )}
      >
        Сбылось
      </span>
    </article>
  );
}

export function Archive() {
  const [filter, setFilter] = useState<Filter>("ВСЁ");
  const [sort, setSort] = useState<Sort>("book");
  const [seed, setSeed] = useState(0);

  const records = useMemo(() => {
    const byLag = [...prophecies].sort((a, b) => lagOf(a) - lagOf(b));
    return { min: byLag[0], max: byLag[byLag.length - 1] };
  }, []);

  const list = useMemo(() => {
    const l = prophecies.filter((p) => filter === "ВСЁ" || p.tag === filter);
    switch (sort) {
      case "lag-asc":
        return [...l].sort((a, b) => lagOf(a) - lagOf(b));
      case "lag-desc":
        return [...l].sort((a, b) => lagOf(b) - lagOf(a));
      case "random":
        return seed >= 0 ? shuffle(l) : l;
      default:
        return [...l].sort((a, b) => a.bookYear - b.bookYear || a.id - b.id);
    }
  }, [filter, sort, seed]);

  const minLag = lagOf(records.min);
  const maxLag = lagOf(records.max);

  return (
    <section id="archive" className="relative overflow-hidden border-b-4 border-ink bg-ink text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 pat-scan" />
      <img
        src={hand}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-16 top-6 w-[52vw] max-w-[440px] -rotate-12 select-none opacity-40 invert mix-blend-screen sm:-right-8 md:right-[3vw] md:opacity-90"
      />

      <div className="relative mx-auto max-w-[1500px] px-4 py-20 sm:px-6 md:py-28">
        <p className="max-w-[70%] font-pixel text-[9px] uppercase leading-relaxed text-acid sm:text-[10px]">
          // архив сбывшегося · {prophecies.length} {plural(prophecies.length, ["запись", "записи", "записей"])} ·
          пополняется быстрее, чем хотелось бы
        </p>
        <h2 className="mt-5 font-brut text-[clamp(2.1rem,8.6vw,8.5rem)] leading-[0.88] tracking-[-0.03em]">
          <Glitch text="КНИГА" /> <span className="text-acid">→</span>
          <br />
          <span className="txt-outline txt-outline-white inline-block md:ml-[8vw]">РЕАЛЬНОСТЬ</span>
        </h2>

        <p className="mt-8 max-w-3xl font-serif text-xl leading-snug md:text-2xl">
          Каталог пророчеств, которые сбылись без нашего согласия. Средняя задержка между книгой и реальностью —{" "}
          <mark className="bg-acid px-1 text-ink">
            {AVG_LAG}&nbsp;{plural(AVG_LAG, ["год", "года", "лет"])}
          </mark>
          . Рекорд скорости — {minLag}&nbsp;{plural(minLag, ["год", "года", "лет"])} («{records.min.book}»). Рекорд
          неторопливости — {maxLag}&nbsp;{plural(maxLag, ["год", "года", "лет"])} («{records.max.book}»).
        </p>

        {/* фильтры в стиле Windows 95 на чёрном — намеренный конфликт */}
        <div className="mt-12 flex flex-wrap items-center gap-2">
          {(["ВСЁ", ...TAGS] as Filter[]).map((t) => {
            const count = t === "ВСЁ" ? prophecies.length : prophecies.filter((p) => p.tag === t).length;
            const active = filter === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setFilter(t)}
                aria-pressed={active}
                className={cn("win-btn min-w-0 px-3 py-1.5 text-[13px]", active && "win-pressed bg-[#dedede] font-bold")}
              >
                {t} <span className="opacity-60">({count})</span>
              </button>
            );
          })}

          <label className="flex items-center gap-2 bg-ink py-0.5 pl-1 font-mono text-xs uppercase text-white sm:ml-auto">
            Сортировать:
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value as Sort);
                setSeed((s) => s + 1);
              }}
              className="border-2 border-white bg-white px-1 py-0.5 font-serif text-sm normal-case text-black"
            >
              <option value="book">по году книги</option>
              <option value="lag-asc">быстрее всего сбылось</option>
              <option value="lag-desc">дольше всего ждали</option>
              <option value="random">как попало (рекомендуем)</option>
            </select>
          </label>
          {sort === "random" && (
            <button type="button" className="win-btn min-w-0 px-2 py-1 text-[13px]" onClick={() => setSeed((s) => s + 1)}>
              🎲 ещё раз
            </button>
          )}
        </div>

        <div className="mt-14 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p) => (
            <Card key={p.id} p={p} />
          ))}
        </div>

        <p className="mt-20 text-center font-serif text-2xl leading-snug md:text-3xl">
          Остальное сбывается прямо сейчас.{" "}
          <a
            href={TG_URL}
            target="_blank"
            rel="noreferrer"
            className="text-acid underline decoration-2 underline-offset-4 hover:bg-acid hover:text-ink"
          >
            Следите в канале →
          </a>
        </p>
      </div>
    </section>
  );
}
