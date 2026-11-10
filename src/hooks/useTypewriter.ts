import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/utils/helpers";

export function useTypewriter(text: string, speed = 20, delay = 500) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setCount(text.length);
      return;
    }
    let i = 0;
    let timer = 0;
    const tick = () => {
      i += 1;
      setCount(i);
      if (i < text.length) timer = window.setTimeout(tick, speed + Math.random() * 45);
    };
    timer = window.setTimeout(tick, delay);
    return () => window.clearTimeout(timer);
  }, [text, speed, delay]);

  return { typed: text.slice(0, count), done: count >= text.length };
}
