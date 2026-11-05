import { Mountain } from "lucide-react";
import { cn } from "../../utils/cn";

export function Brand({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={cn(
          "flex size-9 items-center justify-center rounded-lg",
          tone === "dark" ? "bg-ink text-lime" : "bg-lime text-ink"
        )}
      >
        <Mountain className="size-5" aria-hidden />
      </span>
      <span
        className={cn(
          "text-lg font-bold tracking-tight",
          tone === "light" && "text-white"
        )}
      >
        Shikhore
      </span>
    </span>
  );
}
