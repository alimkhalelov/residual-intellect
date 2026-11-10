import { useCallback, useRef, useState, type CSSProperties, type PointerEvent as RPointerEvent } from "react";

/** Делает окно перетаскиваемым за «заголовок». */
export function useDraggable() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const startRef = useRef<{ px: number; py: number; x: number; y: number } | null>(null);

  const onPointerDown = useCallback((e: RPointerEvent<HTMLElement>) => {
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest("button, a, input, textarea, select")) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    startRef.current = { px: e.clientX, py: e.clientY, x: posRef.current.x, y: posRef.current.y };
  }, []);

  const onPointerMove = useCallback((e: RPointerEvent<HTMLElement>) => {
    const s = startRef.current;
    if (!s) return;
    const next = { x: s.x + e.clientX - s.px, y: s.y + e.clientY - s.py };
    posRef.current = next;
    setPos(next);
  }, []);

  const onPointerEnd = useCallback(() => {
    startRef.current = null;
  }, []);

  const style: CSSProperties = { transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` };
  const handleProps = {
    onPointerDown,
    onPointerMove,
    onPointerUp: onPointerEnd,
    onPointerCancel: onPointerEnd,
    style: { touchAction: "none", cursor: "move" } as CSSProperties,
  };

  return { style, handleProps };
}
