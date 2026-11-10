import { useEffect, useState } from "react";
import { TG_URL } from "@/config";
import { Win95Window } from "./Win95Window";

const KEY = "oi-diagnostics-shown";
const DELAY = 25000;

/** Назойливый попап через 25 секунд. Один раз за сессию — мы же не звери. */
export function AnnoyingPopup() {
  const [open, setOpen] = useState(false);
  const [pct] = useState(() => 37 + Math.floor(Math.random() * 37));

  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY)) return;
    } catch {
      /* приватный режим — значит, тоже покажем */
    }
    const t = window.setTimeout(() => {
      setOpen(true);
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {
        /* ничего страшного */
      }
    }, DELAY);
    return () => window.clearTimeout(t);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[60] sm:right-auto sm:w-[390px]">
      <Win95Window title="Диагностика.exe" icon="🧠" draggable onClose={() => setOpen(false)}>
        <div className="flex gap-3">
          <span aria-hidden className="text-3xl">
            🧠
          </span>
          <div className="text-[14px] leading-snug">
            <p>Вы провели на сайте 25 секунд.</p>
            <p className="mt-1">
              Уровень остаточного интеллекта: <b>{pct}%</b>
            </p>
            <div className="win-sunken mt-2 h-4 bg-white p-[2px]">
              <div className="h-full bg-navy" style={{ width: `${pct}%` }} />
            </div>
            <p className="mt-2">
              Обнаружено непрочитанных антиутопий: <b>3</b>. Рекомендуется подзарядка.
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap justify-end gap-2">
          <a href={TG_URL} target="_blank" rel="noreferrer" className="win-btn font-bold" onClick={() => setOpen(false)}>
            Подзарядить
          </a>
          <button type="button" className="win-btn" onClick={() => setOpen(false)}>
            Позже (врёте)
          </button>
        </div>
      </Win95Window>
    </div>
  );
}
