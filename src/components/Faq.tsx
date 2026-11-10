import { faq } from "@/data";
import { TG_URL } from "@/config";

export function Faq() {
  return (
    <section id="faq" className="relative overflow-hidden border-b-4 border-ink bg-white">
      <div aria-hidden className="h-6 border-b-2 border-ink pat-hazard-y" />
      <div className="border-b-2 border-ink bg-sun py-1 text-center font-mono text-[11px] uppercase tracking-wide sm:text-xs">
        🚧 Раздел находится в разработке с 1997 года 🚧
      </div>

      <div className="mx-auto grid max-w-[1250px] gap-12 px-4 py-20 sm:px-6 md:grid-cols-12 md:py-28">
        <div className="relative md:col-span-4">
          <h2 className="font-serif text-[clamp(3.6rem,10vw,9rem)] font-bold leading-[0.85]">ЧаВо</h2>
          <p className="mt-3 max-w-xs font-serif text-xl italic leading-snug">
            часто задаваемые вопросы и редко получаемые ответы
          </p>
          <div className="mt-10 inline-block -rotate-6 border-[3px] border-ink bg-pink px-4 py-3 font-rmono text-sm uppercase leading-tight shadow-[6px_6px_0_#0a0a0a]">
            Нет, это
            <br />
            не про крипту
          </div>
          <p className="mt-10 hidden font-mono text-[11px] leading-relaxed text-[#777] md:block">
            &lt;!-- TODO: добавить дизайн --&gt;
            <br />
            &lt;!-- TODO: убрать TODO --&gt;
          </p>
        </div>

        <div className="faq font-serif md:col-span-8">
          <div>
            {faq.map((f, i) => (
              <details key={f.q} className="border-t-2 border-ink py-5 last:border-b-2" open={i === 0}>
                <summary className="text-[clamp(1.25rem,2.4vw,1.9rem)] font-bold leading-tight text-link underline decoration-1 underline-offset-4 hover:bg-link hover:text-white">
                  {f.q}
                </summary>
                <p className="mt-3 max-w-2xl pl-2 font-mono text-[15px] leading-relaxed sm:pl-12">{f.a}</p>
              </details>
            ))}
          </div>

          <hr className="hr-90s my-10" />
          <p className="text-lg">
            Не нашли ответ?{" "}
            <a href={TG_URL} target="_blank" rel="noreferrer" className="link-raw">
              Спросите в комментариях канала
            </a>
            . Отвечает человек. Медленно.
          </p>
        </div>
      </div>
    </section>
  );
}
