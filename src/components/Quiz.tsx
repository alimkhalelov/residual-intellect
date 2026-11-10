import { useMemo, useState } from "react";
import eye from "@/assets/eye.jpg";
import { quizItems, type QuizItem } from "@/data";
import { TG_URL } from "@/config";
import { cn } from "@/utils/cn";
import { shuffle } from "@/utils/helpers";
import { Win95Window } from "./Win95Window";

const ROUND = 8;
type Answer = QuizItem["answer"];

const ICONS = [
  { e: "🖥️", l: "Мой киберпанк" },
  { e: "🗑️", l: "Утопии" },
  { e: "📄", l: "нейромант.txt" },
  { e: "📁", l: "Сбылось" },
  { e: "💾", l: "сознание_бэкап" },
  { e: "🌐", l: "Netscape" },
];

function resultFor(score: number) {
  if (score <= 2)
    return {
      title: "Вы живёте в 2007-м",
      text: "Там уютно: айфон только вышел, нейросети — в книжках. Но будущее уже идёт за вами. Лучше встретить его подготовленным.",
    };
  if (score <= 4)
    return {
      title: "Реальность = фантастика",
      text: "Для вас между ними нет разницы. Для нас тоже. Добро пожаловать — вы наш читатель.",
    };
  if (score <= 6)
    return {
      title: "Подозрительно хорошо",
      text: "Вы точно не андроид? На всякий случай пройдите тест Войта-Кампфа в комментариях.",
    };
  return {
    title: "Идеальный результат",
    text: "Вы либо фантаст, либо уже читаете наш канал. Либо вы — нейросеть. В любом случае — подписывайтесь.",
  };
}

function DesktopIcons() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <div aria-hidden className="mt-12 hidden w-max grid-cols-2 gap-x-6 gap-y-7 sm:grid">
      {ICONS.map((ic, i) => (
        <div
          key={ic.l}
          onClick={() => setSelected(i)}
          className="flex w-24 select-none flex-col items-center gap-1 text-center"
        >
          <span className="text-4xl drop-shadow-[2px_2px_0_rgba(0,0,0,.4)]">{ic.e}</span>
          <span
            className={cn(
              "px-1 font-win text-[12px] leading-tight text-white",
              selected === i && "bg-navy outline outline-1 outline-dotted outline-white",
            )}
          >
            {ic.l}
          </span>
        </div>
      ))}
    </div>
  );
}

export function Quiz() {
  const [round, setRound] = useState(0);
  const deck = useMemo(() => (round >= 0 ? shuffle(quizItems).slice(0, ROUND) : []), [round]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<Answer | null>(null);
  const [score, setScore] = useState(0);

  const done = idx >= ROUND;
  const item = deck[Math.min(idx, ROUND - 1)];
  const correct = picked !== null && picked === item.answer;

  const pick = (a: Answer) => {
    if (picked) return;
    setPicked(a);
    if (a === item.answer) setScore((s) => s + 1);
  };
  const next = () => {
    setPicked(null);
    setIdx((i) => i + 1);
  };
  const restart = () => {
    setRound((r) => r + 1);
    setIdx(0);
    setPicked(null);
    setScore(0);
  };

  const result = resultFor(score);
  const answeredCount = idx + (picked ? 1 : 0);

  return (
    <section id="quiz" className="relative overflow-hidden border-b-4 border-ink bg-teal">
      <img
        src={eye}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -bottom-16 right-[-18%] w-[95vw] max-w-[980px] select-none opacity-80 mix-blend-multiply md:right-[-6%]"
      />

      <div className="relative mx-auto max-w-[1500px] px-4 py-20 sm:px-6 md:py-28">
        <p className="font-pixel text-[9px] uppercase text-acid sm:text-[10px]">// угадайка · {ROUND} вопросов · без регистрации и смс</p>
        <h2 className="mt-4 font-brut text-[clamp(2rem,7.4vw,6.5rem)] uppercase leading-[0.9] text-white [text-shadow:5px_5px_0_#0a0a0a]">
          Пресс-релиз
          <br />
          <span className="text-acid">или</span> фантастика?
        </h2>

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="max-w-sm border-[3px] border-ink bg-white p-4 font-serif text-xl leading-snug shadow-[6px_6px_0_#0a0a0a]">
              Восемь утверждений. Часть — из новостей, часть — из романов. Отличите? Мы вот уже не всегда.
            </p>
            <DesktopIcons />
          </div>

          <div className="lg:col-span-8">
            <Win95Window
              title="угадайка.exe — Пресс-релиз или фантастика?"
              icon="📟"
              draggable
              menu={["Файл", "Правка", "Вид", "Будущее", "Справка"]}
              bodyClassName="p-3 sm:p-5"
              status={
                <>
                  <span className="win-sunken flex-1 truncate px-2 py-0.5">
                    {done ? "Готово" : picked ? "Ожидание..." : "Думайте. Пока можете."}
                  </span>
                  <span className="win-sunken px-2 py-0.5">Счёт: {score}</span>
                  <span className="win-sunken hidden px-2 py-0.5 sm:block">ОИ: {60 + score * 5}%</span>
                </>
              }
            >
              {done ? (
                <div className="py-4 text-center" role="status">
                  <p className="font-pixel text-[9px] uppercase">диагностика завершена</p>
                  <p className="mt-4 font-brut text-7xl leading-none">
                    {score}/{ROUND}
                  </p>
                  <p className="mt-4 font-serif text-3xl italic">{result.title}</p>
                  <p className="mx-auto mt-2 max-w-md text-[15px] leading-snug">{result.text}</p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <button type="button" className="win-btn" onClick={restart}>
                      ↻ Ещё раз
                    </button>
                    <a href={TG_URL} target="_blank" rel="noreferrer" className="win-btn font-bold">
                      Обсудить в канале →
                    </a>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between text-[13px]">
                    <span>
                      Вопрос {idx + 1} из {ROUND}
                    </span>
                    <span>Правильных: {score}</span>
                  </div>
                  <div className="win-sunken mt-1 h-5 bg-white p-[3px]">
                    <div className="flex h-full gap-[2px]">
                      {Array.from({ length: ROUND }).map((_, i) => (
                        <span key={i} className={cn("h-full flex-1", i < answeredCount ? "bg-navy" : "bg-transparent")} />
                      ))}
                    </div>
                  </div>

                  <blockquote className="win-sunken mt-4 flex min-h-[9.5rem] items-center bg-white p-5 font-serif text-[clamp(1.25rem,2.5vw,1.9rem)] leading-snug">
                    «{item.text}»
                  </blockquote>

                  {!picked ? (
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <button type="button" className="win-btn py-3 text-base" onClick={() => pick("real")}>
                        📰 Это реальность
                      </button>
                      <button type="button" className="win-btn py-3 text-base" onClick={() => pick("book")}>
                        📕 Это из книги
                      </button>
                    </div>
                  ) : (
                    <div className="mt-4 border-2 border-ink bg-[#ffffe1] p-4" role="status">
                      <p className={cn("font-glitch text-4xl leading-none", correct ? "text-[#008000]" : "text-[#e00000]")}>
                        {correct ? "ВЕРНО" : "МИМО"}
                      </p>
                      <p className="mt-2 text-[15px] font-bold">
                        {item.answer === "real" ? "📰 Это реальность." : "📕 Это из книги."}{" "}
                        <span className="font-normal">{item.source}</span>
                      </p>
                      <p className="mt-1 text-[14px]">{item.note}</p>
                      <div className="mt-3 text-right">
                        <button type="button" className="win-btn" onClick={next}>
                          {idx + 1 < ROUND ? "Дальше →" : "Результат"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Win95Window>
          </div>
        </div>
      </div>
    </section>
  );
}
