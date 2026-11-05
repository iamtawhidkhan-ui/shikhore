import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

type Tone = "neutral" | "lime" | "success" | "accent" | "ink";

const tones: Record<Tone, string> = {
  neutral: "bg-ink/5 text-ink",
  lime: "bg-lime/40 text-ink",
  success: "bg-success/10 text-success",
  accent: "bg-accent/20 text-ink",
  ink: "bg-ink text-white",
};

export function Badge({
  tone = "neutral",
  children,
  className,
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
