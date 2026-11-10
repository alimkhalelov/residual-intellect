import { useState, type FormEvent } from "react";
import { guestbook as seed, type GuestEntry } from "@/data";

const LS_KEY = "oi-guestbook-v1";

function loadEntries(): GuestEntry[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    const mine = raw ? (JSON.parse(raw) as GuestEntry[]) : [];
    return [...mine, ...seed];
  } catch {
    return seed;
  }
}

export function Guestbook() {
  const [entries, setEntries] = useState<GuestEntry[]>(loadEntries);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [ok, setOk] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!msg.trim()) {
      setErr("Пустое сообщение? Это слишком даже для остаточного интеллекта.");
      setOk(false);
      return;
    }
    const entry: GuestEntry = {
      name: name.trim() || "Аноним",
      place: "ваш браузер",
      date: new Date().toLocaleDateString("ru-RU"),
      text: msg.trim().slice(0, 400),
      mine: true,
    };
    const next = [entry, ...entries];
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(next.filter((x) => x.mine).slice(0, 20)));
    } catch {
      /* память переполнена — как и у всех */
    }
    setEntries(next);
    setName("");
    setMsg("");
    setErr("");
    setOk(true);
  };

  return (
    <section id="guestbook" className="relative overflow-hidden border-b-4 border-ink pat-stars">
      <div className="relative mx-auto max-w-[1250px] px-4 py-20 sm:px-6 md:py-28">
        <div className="text-center">
          <h2 className="wordart inline-block font-brut text-[clamp(2.3rem,8vw,7rem)] leading-none">Гостевая книга</h2>
          <p className="mx-auto mt-6 inline-block -rotate-1 border-2 border-ink bg-acid px-3 py-1 font-comic text-lg text-ink">
            Отзывы читателей, бытовой техники и одного покойного фантаста{" "}
            <span className="animate-blink font-pixel text-[9px] text-warn">NEW!</span>
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_340px]">
          {/* «таблица» 1999 года */}
          <div className="border-4 border-[#808080] bg-white" style={{ borderStyle: "outset" }}>
            <div className="flex items-center justify-between bg-navy px-3 py-1 font-win text-[13px] font-bold text-white">
              <span>📖 Записей: {entries.length}</span>
              <span className="hidden sm:inline">Страница 1 из 1 (остальные съел кэш)</span>
            </div>
            <ul>
              {entries.map((g, i) => (
                <li
                  key={`${g.name}-${i}`}
                  className="grid border-t-2 border-[#c0c0c0] font-comic md:grid-cols-[200px_1fr]"
                  style={{ borderStyle: "inset" }}
                >
                  <div className="flex flex-wrap items-baseline gap-x-2 bg-[#efefef] px-3 py-2 md:block md:border-r-2 md:border-[#c0c0c0]">
                    <p className="font-bold text-link underline">{g.name}</p>
                    <p className="text-[13px] text-[#555]">{g.place}</p>
                    <p className="font-mono text-[11px] text-[#888]">{g.date}</p>
                    {g.mine && <p className="font-pixel text-[7px] text-warn">ЭТО ВЫ</p>}
                  </div>
                  <p className="px-3 py-3 text-[16px] leading-snug text-ink">{g.text}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* форма */}
          <form
            onSubmit={submit}
            className="h-max rotate-[1.5deg] border-[3px] border-ink bg-win p-4 font-win text-[14px] text-black shadow-[8px_8px_0_#0a0a0a] lg:sticky lg:top-6"
          >
            <fieldset className="border-2 border-[#808080] p-3" style={{ borderStyle: "groove" }}>
              <legend className="px-1 font-bold">Оставить запись ✍</legend>
              <label className="block">
                Имя:
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={40}
                  placeholder="Аноним из 2077"
                  className="win-sunken mt-1 block w-full bg-white px-2 py-1.5 font-serif text-base outline-none"
                />
              </label>
              <label className="mt-3 block">
                Сообщение:
                <textarea
                  value={msg}
                  onChange={(e) => {
                    setMsg(e.target.value);
                    if (err) setErr("");
                  }}
                  rows={4}
                  maxLength={400}
                  placeholder="Напишите что-нибудь человеческое"
                  className="win-sunken mt-1 block w-full resize-y bg-white px-2 py-1.5 font-serif text-base outline-none"
                />
              </label>
              {err && <p className="mt-2 text-[13px] text-[#e00000]">{err}</p>}
              {ok && (
                <p className="mt-2 border border-black bg-[#ffffe1] p-2 text-[13px]" role="status">
                  ✔ Запись отправлена в 2077 год. Модерация пройдена остаточным интеллектом.
                </p>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                <button type="submit" className="win-btn font-bold">
                  Отправить
                </button>
                <button
                  type="button"
                  className="win-btn"
                  onClick={() => {
                    setName("");
                    setMsg("");
                    setErr("");
                    setOk(false);
                  }}
                >
                  Стереть память
                </button>
              </div>
            </fieldset>
            <p className="mt-3 text-[11px] text-[#444]">
              * Записи хранятся только в вашем браузере. Мы не следим. В отличие от вашего телевизора.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
