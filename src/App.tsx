import { useEffect, useState } from "react";
import { TopBar } from "./components/TopBar";
import { Hero } from "./components/Hero";
import { Tapes } from "./components/Tapes";
import { Manifesto } from "./components/Manifesto";
import { Archive } from "./components/Archive";
import { Inside } from "./components/Inside";
import { Quiz } from "./components/Quiz";
import { Guestbook } from "./components/Guestbook";
import { Faq } from "./components/Faq";
import { FinalCta } from "./components/FinalCta";
import { Footer } from "./components/Footer";
import { CursorTrail } from "./components/CursorTrail";
import { AnnoyingPopup } from "./components/AnnoyingPopup";
import { Win95Window } from "./components/Win95Window";

function ChaosToast({ onFix }: { onFix: () => void }) {
  return (
    <div className="fixed left-1/2 top-14 z-[70] w-[min(92vw,420px)] -translate-x-1/2">
      <Win95Window title="Критическая ошибка" icon="💥" onClose={onFix}>
        <p className="text-[14px] leading-snug">
          <b>Вы сломали сайт.</b> Спасибо — это было в ТЗ.
          <br />
          Остаточный интеллект перезагружается...
        </p>
        <div className="mt-4 flex justify-end">
          <button type="button" className="win-btn font-bold" onClick={onFix}>
            Починить
          </button>
        </div>
      </Win95Window>
    </div>
  );
}

export default function App() {
  const [chaos, setChaos] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("chaos", chaos);
  }, [chaos]);

  return (
    <>
      <div className="chaos-root overflow-x-clip">
        <TopBar chaos={chaos} onChaos={() => setChaos((c) => !c)} />
        <main>
          <Hero />
          <Tapes />
          <Manifesto />
          <Archive />
          <Inside />
          <Quiz />
          <Guestbook />
          <Faq />
          <FinalCta />
        </main>
        <Footer />
      </div>

      <div aria-hidden className="noise-overlay" />
      <CursorTrail />
      <AnnoyingPopup />
      {chaos && <ChaosToast onFix={() => setChaos(false)} />}
    </>
  );
}
