import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { useDraggable } from "@/hooks/useDraggable";

interface Win95WindowProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  draggable?: boolean;
  onClose?: () => void;
  menu?: string[];
  status?: ReactNode;
}

export function Win95Window({
  title,
  icon,
  children,
  className,
  bodyClassName,
  draggable = false,
  onClose,
  menu,
  status,
}: Win95WindowProps) {
  const drag = useDraggable();
  const [collapsed, setCollapsed] = useState(false);
  const [shake, setShake] = useState(false);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    if (!shake) return;
    const t = window.setTimeout(() => setShake(false), 460);
    return () => window.clearTimeout(t);
  }, [shake]);

  useEffect(() => {
    if (!denied) return;
    const t = window.setTimeout(() => setDenied(false), 2800);
    return () => window.clearTimeout(t);
  }, [denied]);

  const handleClose = () => {
    if (onClose) {
      onClose();
      return;
    }
    setShake(true);
    setDenied(true);
  };

  return (
    <div className={className} style={draggable ? drag.style : undefined}>
      <div className={cn("win-raised bg-win p-[3px] font-win text-black", shake && "animate-shake")}>
        <div
          className="win-title flex select-none items-center justify-between gap-2 py-[3px] pl-1.5 pr-[3px]"
          {...(draggable ? drag.handleProps : {})}
        >
          <span className="flex min-w-0 items-center gap-1.5 text-[13px] font-bold">
            {icon && (
              <span aria-hidden className="shrink-0">
                {icon}
              </span>
            )}
            <span className="truncate">{title}</span>
          </span>
          <span className="flex shrink-0 gap-[2px]">
            <button type="button" className="win-ctl" aria-label="Свернуть" onClick={() => setCollapsed((c) => !c)}>
              _
            </button>
            <button type="button" className="win-ctl" aria-label="Развернуть" title="Будущее не помещается на экран">
              □
            </button>
            <button type="button" className="win-ctl ml-[2px]" aria-label="Закрыть" onClick={handleClose}>
              ×
            </button>
          </span>
        </div>

        {!collapsed && (
          <>
            {menu && (
              <div className="flex flex-wrap gap-x-4 px-2 py-1 text-[13px]">
                {menu.map((m) => (
                  <span key={m}>
                    <span className="underline">{m[0]}</span>
                    {m.slice(1)}
                  </span>
                ))}
              </div>
            )}
            {denied && (
              <div className="mx-1 mt-1 border border-black bg-[#ffffe1] px-2 py-1 text-[12px]" role="status">
                Закрыть будущее невозможно. Можно только подписаться.
              </div>
            )}
            <div className={cn("p-3", bodyClassName)}>{children}</div>
            {status && <div className="mx-[2px] mb-[2px] flex gap-[2px] text-[12px]">{status}</div>}
          </>
        )}
      </div>
    </div>
  );
}
