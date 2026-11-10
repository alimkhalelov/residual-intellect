import { rubrics } from "@/data";
import { CHANNEL_NAME, TG_URL } from "@/config";
import { cn } from "@/utils/cn";

const REACTIONS: [string, string][] = [
  ["🤯", "451"],
  ["🤖", "2077"],
  ["😭", "1984"],
  ["🔥", "88"],
];

function PostMock() {
  return (
    <div className="relative mx-auto max-w-md">
      <p className="mb-5 ml-4 -rotate-3 font-hand text-[28px] leading-none text-acid">так выглядит типичный пост ↓</p>

      <div className="relative rotate-[2.5deg]">
        {/* скотч */}
        <span
          aria-hidden
          className="absolute -left-7 -top-1 z-10 h-8 w-32 -rotate-[32deg] border border-ink/20 bg-acid/80"
        />
        <span aria-hidden className="stamp absolute -right-4 top-24 z-10 rotate-[14deg] bg-white text-sm text-warn">
          Пример
        </span>

        <div className="overflow-hidden rounded-[20px] border-[3px] border-ink shadow-[12px_12px_0_#0a0a0a] pat-tg">
          <div className="flex items-center gap-3 border-b border-black/10 bg-white px-4 py-3 font-sans text-ink">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink font-brut text-sm text-acid">
              ОИ
            </span>
            <div className="min-w-0">
              <p className="truncate font-bold leading-tight">{CHANNEL_NAME}</p>
              <p className="text-sm text-gray-500">канал · подписчики прибывают</p>
            </div>
            <span aria-hidden className="ml-auto text-xl text-gray-400">
              ⋮
            </span>
          </div>

          <div className="p-3 sm:p-4">
            <div className="relative rounded-2xl rounded-bl-sm bg-white p-4 font-sans text-[15px] leading-relaxed text-ink shadow-sm">
              <p className="font-semibold text-[#168acd]">#этоужебыло</p>
              <p className="mt-2">
                📰 <b>Новость:</b> BMW продаёт подписку на подогрев сидений — в машине, которую вы уже купили.
              </p>
              <p className="mt-2">
                📕 <b>Книга:</b> Филип К. Дик, «Убик», 1969. Дверь квартиры требует у героя пять центов, чтобы
                открыться.
              </p>
              <p className="mt-2">
                💀 <b>Чем кончилось:</b> герой попытался снять дверь с петель. Дверь пригрозила ему судом.
              </p>
              <p className="mt-2">Ждём подписку на дверные петли.</p>

              <div className="mt-3 flex flex-wrap gap-1.5 text-[13px]">
                {REACTIONS.map(([e, n]) => (
                  <span key={e} className="rounded-full bg-[#e8f3ff] px-2 py-0.5 font-medium text-[#168acd]">
                    {e} {n}
                  </span>
                ))}
              </div>
              <div className="mt-2 flex justify-end gap-3 text-xs text-gray-400">
                <span>👁 2 077</span>
                <span>13:37</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-8 ml-auto max-w-[19rem] rotate-2 text-right font-hand text-[25px] leading-tight text-white">
        ↑ реакции читателей. Самая частая — 🤯, на втором месте — «а ведь Дик предупреждал»
      </p>
    </div>
  );
}

export function Inside() {
  return (
    <section id="inside" className="relative overflow-hidden border-b-4 border-ink bg-blu text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 pat-dots-light" />

      <div className="relative mx-auto max-w-[1500px] px-4 py-20 sm:px-6 md:py-28">
        <h2 className="font-wide text-[clamp(2.5rem,9vw,8rem)] font-black uppercase leading-[0.85] [text-shadow:6px_6px_0_var(--color-pink)]">
          Что внутри
        </h2>
        <p className="mt-3 -rotate-2 font-hand text-[28px] leading-tight text-acid md:ml-[28vw] md:text-[34px]">
          (канала, а не вас — с вами пусть разбирается нейроинтерфейс)
        </p>

        <div className="mt-16 grid gap-16 lg:grid-cols-12 lg:gap-10">
          <ul className="space-y-6 lg:col-span-7">
            {rubrics.map((r, i) => (
              <li
                key={r.tag}
                className={cn(
                  "relative border-[3px] border-ink p-4 text-ink shadow-[6px_6px_0_#0a0a0a] sm:p-5",
                  i % 2 ? "rotate-1 md:ml-14" : "-rotate-1 md:mr-14",
                  r.cls,
                )}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <span className="break-all font-rmono text-[clamp(0.9rem,2vw,1.3rem)]">{r.tag}</span>
                  <span className="font-pixel text-[8px]">РУБРИКА {String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-1 font-serif text-3xl italic">{r.title}</h3>
                <p className="mt-1 font-mono text-sm leading-relaxed">{r.text}</p>
              </li>
            ))}
            <li className="pt-4">
              <a
                href={TG_URL}
                target="_blank"
                rel="noreferrer"
                className="font-serif text-xl text-white underline decoration-acid decoration-2 underline-offset-4 hover:bg-acid hover:text-ink"
              >
                Читать все рубрики в Telegram →
              </a>
            </li>
          </ul>

          <div className="lg:col-span-5">
            <PostMock />
          </div>
        </div>
      </div>
    </section>
  );
}
