import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/utils/helpers";

const N = 9;

/** Шлейф курсора в духе 1998 года. Только для мыши. */
export function CursorTrail() {
  const [enabled] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches && !prefersReducedMotion(),
  );
  const refs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!enabled) return;
    const pts = Array.from({ length: N }, () => ({ x: -100, y: -100 }));
    const mouse = { x: -100, y: -100 };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const tick = () => {
      let tx = mouse.x;
      let ty = mouse.y;
      for (let i = 0; i < N; i++) {
        const p = pts[i];
        p.x += (tx - p.x) * 0.42;
        p.y += (ty - p.y) * 0.42;
        const el = refs.current[i];
        if (el) el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
        tx = p.x;
        ty = p.y;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {Array.from({ length: N }).map((_, i) => {
        const size = 14 - i;
        return (
          <span
            key={i}
            aria-hidden
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="pointer-events-none fixed left-0 top-0 z-[90] block bg-white mix-blend-difference"
            style={{
              width: size,
              height: size,
              marginLeft: -size / 2,
              marginTop: -size / 2,
              opacity: 1 - i * 0.07,
            }}
          />
        );
      })}
    </>
  );
}
