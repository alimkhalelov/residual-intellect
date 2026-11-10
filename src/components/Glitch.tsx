import type { ElementType } from "react";
import { cn } from "@/utils/cn";

interface GlitchProps {
  text: string;
  className?: string;
  as?: ElementType;
}

export function Glitch({ text, className, as: Tag = "span" }: GlitchProps) {
  return (
    <Tag data-text={text} className={cn("glitch", className)}>
      {text}
    </Tag>
  );
}
