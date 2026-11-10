import { TG_URL } from "@/config";
import { scrollToId } from "@/utils/helpers";

const SECTIONS = ["top", "manifest", "archive", "inside", "quiz", "guestbook", "faq", "subscribe"];

const BADGES = [
  { t: "MADE WITH\nNOTEPAD", c: "bg-white text-ink" },
  { t: "BEST VIEWED\nIN 2077", c: "bg-pink text-ink" },
  { t: "NO AI*\n*ТОЛЬКО ОИ", c: "bg-acid text-ink" },
  { t: "HTML 3.2\nVALID?", c: "bg-blu text-white" },
  { t: "КИБЕРПАНК\nНЕ МЁРТВ", c: "bg-warn text-ink" },
];

const LINKS = [
  { id: "archive", l: "Архив сбывшегося" },
  { id: "inside", l: "Рубрики" },
  { id: "quiz", l: "Угадайка" },
  { id: "guestbook", l: "Гостевая книга" },
  { id: "faq", l: "ЧаВо" },
];

export function Footer() {
  const random = () => scrollToId(SECTIONS[Math.floor(Math.random() * SECTIONS.length)]);

  return (
    <footer className="relative overflow-hidden bg-ink px-4 pb-10 pt-16 font-mono text-[13px] text-acid sm:px-6">
      <div className="mx-auto max-w-[1500px]">
        <p aria-hidden className="font-glitch text-[clamp(2.4rem,10.5vw,10rem)] leading-[0.9] text-white/90">
          ОСТАТОЧНЫЙ
        </p>
        <p aria-hidden className="text-right font-serif text-[clamp(2rem,8vw,7rem)] italic leading-none text-link underline decoration-2">
          интеллект
        </p>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          <ul className="space-y-1.5 leading-relaxed">
            <li>© 1984–2077 «Остаточный интеллект»</li>
            <li>Сайт свёрстан человеком. Наверное.</li>
            <li>Все совпадения с реальностью — вина реальности.</li>
            <li>Не является корпорацией «Тессье-Ашпул». Пока.</li>
          </ul>

          <ul className="space-y-1.5">
            <li>
              <a
                href={TG_URL}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-white underline decoration-acid decoration-2 underline-offset-2 hover:bg-acid hover:text-ink"
              >
                → Telegram-канал
              </a>
            </li>
            {LINKS.map((l) => (
              <li key={l.id}>
                <button type="button" onClick={() => scrollToId(l.id)} className="underline underline-offset-2 hover:bg-acid hover:text-ink">
                  {l.l}
                </button>
              </li>
            ))}
            <li>
              <button type="button" onClick={() => scrollToId("top")} className="underline underline-offset-2 hover:bg-acid hover:text-ink">
                Наверх ↑
              </button>
            </li>
          </ul>

          <div>
            <div className="inline-flex flex-wrap items-center gap-2 border-2 border-acid p-2 font-pixel text-[8px] uppercase leading-relaxed">
              <button type="button" onClick={() => scrollToId("top")} className="underline hover:bg-acid hover:text-ink">
                « пред.
              </button>
              <span className="px-1 text-white">Киберпанк-вебринг</span>
              <button type="button" onClick={random} className="underline hover:bg-acid hover:text-ink">
                случ.
              </button>
              <button type="button" onClick={() => scrollToId("subscribe")} className="underline hover:bg-acid hover:text-ink">
                след. »
              </button>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {BADGES.map((b) => (
                <span
                  key={b.t}
                  className={`inline-grid h-[31px] w-[88px] place-items-center whitespace-pre-line border-2 border-b-[#555] border-l-white border-r-[#555] border-t-white text-center font-pixel text-[6px] leading-[1.35] ${b.c}`}
                >
                  {b.t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-14 border-t border-dashed border-acid/40 pt-5 text-[11px] leading-relaxed text-white/50">
          Лучше всего смотреть в Netscape Navigator 4.0 при разрешении 800×600 и нейроинтерфейсе не ниже v0.3. Все
          упомянутые книги — настоящие, все новости — тоже. К сожалению.
        </p>
      </div>
    </footer>
  );
}
