import brain from "@/assets/brain.jpg";
import { cn } from "@/utils/cn";

const STEPS = [
  {
    n: "01",
    t: "Ловим новость",
    d: "Пресс-релизы, презентации, твиты основателей и прочие тёмные углы техно-тусовки.",
    cls: "bg-ink text-acid -rotate-2",
  },
  {
    n: "02",
    t: "Ищем книгу",
    d: "Роман, повесть или рассказ из забытого журнала 70-х — где это уже было.",
    cls: "bg-white text-ink rotate-[1.5deg] lg:translate-y-6",
  },
  {
    n: "03",
    t: "Читаем финал",
    d: "Смотрим, чем всё закончилось у фантастов. Спойлер: по-разному, но обычно плохо.",
    cls: "bg-pink text-ink -rotate-1",
  },
  {
    n: "04",
    t: "Нервно смеёмся",
    d: "Вместе с вами, в комментариях. Это и есть остаточный интеллект.",
    cls: "bg-blu text-white rotate-[2.5deg] lg:translate-y-4",
  },
];

export function Manifesto() {
  return (
    <section id="manifest" className="relative overflow-hidden border-b-4 border-ink bg-acid">
      <div aria-hidden className="pointer-events-none absolute inset-0 pat-dots opacity-50" />

      <div className="relative mx-auto grid max-w-[1500px] gap-8 px-4 pb-12 pt-20 sm:px-6 md:grid-cols-12 md:gap-10 md:pb-16 md:pt-28">
        <h2 className="txt-outline font-rmono text-[clamp(2.4rem,12.5vw,6rem)] leading-none md:col-span-2 md:rotate-180 md:text-[clamp(4rem,7.2vw,8rem)] md:[writing-mode:vertical-rl]">
          МАНИФЕСТ
        </h2>

        <div className="md:col-span-10">
          <p className="font-pixel text-[9px] uppercase">§ 1. О чём это всё</p>
          <p className="mt-4 font-serif text-[clamp(1.65rem,4vw,3.5rem)] leading-[1.08]">
            Нам обещали летающие машины. Выдали{" "}
            <s className="decoration-warn decoration-[0.1em]">искусственный</s>{" "}
            <span className="marker-pink">остаточный</span> интеллект, подписку на подогрев сидений и чипы в мозг от
            миллиардера с собственной соцсетью.
          </p>
          <p className="mt-8 font-brut text-[clamp(1.5rem,3.8vw,3.2rem)] leading-[1.1]">
            Киберпанк больше не жанр.{" "}
            <span className="mt-2 inline-block -rotate-2 bg-ink px-3 py-1 text-acid">Это раздел новостей.</span>
          </p>

          <div className="mt-14 grid items-start gap-12 lg:grid-cols-[1.15fr_1fr]">
            <div className="space-y-4 font-mono text-[15px] leading-relaxed md:text-base">
              <p>Мы читаем техно-новости и ищем книгу, в которой это уже случилось. Спойлер: почти всегда находим.</p>
              <p>
                Гибсон, Дик, Стивенсон, Лем, Стругацкие, Пелевин — кто-то из них уже всё описал. Чаще всего в 80-х.
                Чаще всего — как предупреждение, которое кто-то принял за инструкцию.
              </p>
              <p className="inline-block -rotate-1 border-2 border-ink bg-white px-2 py-1 font-serif text-lg italic">
                Никакой магии — только чтение и плохие предчувствия.
              </p>
            </div>

            <figure className="relative mt-6 rotate-2 border-[3px] border-ink bg-white p-3 pat-grid shadow-[8px_8px_0_#0a0a0a] lg:mt-0">
              <img
                src={brain}
                alt="Мозг в банке, подключённый проводами к старому компьютеру"
                className="w-full mix-blend-multiply"
              />
              <figcaption className="mt-2 border-t-2 border-ink pt-2 font-serif text-sm italic">
                Рис. 1. Остаточный интеллект в естественной среде обитания.
              </figcaption>
              <span className="absolute -top-10 right-2 -rotate-3 font-hand text-[26px] leading-none text-warn">
                это вы после 6 часов в ленте ↓
              </span>
            </figure>
          </div>
        </div>
      </div>

      <ol className="relative mx-auto grid max-w-[1500px] gap-7 px-4 pb-20 sm:grid-cols-2 sm:px-6 md:pb-28 lg:grid-cols-4">
        {STEPS.map((s) => (
          <li key={s.n} className={cn("border-[3px] border-ink p-5 shadow-[6px_6px_0_#0a0a0a]", s.cls)}>
            <span className="font-brut text-6xl leading-none">{s.n}</span>
            <h3 className="mt-3 font-rmono text-lg uppercase leading-tight">{s.t}</h3>
            <p className="mt-2 font-serif text-lg leading-snug">{s.d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
