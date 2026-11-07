import { Mountain } from "lucide-react";
import { cn } from "../../utils/cn";

export function Brand({
  tone = "dark",
  size = "md",
}: {
  tone?: "dark" | "light";
  size?: "md" | "lg";
}) {
  return (
    <span className={cn("inline-flex items-center", size === "lg" ? "gap-3" : "gap-2")}>
      <span
        className={cn(
          "flex items-center justify-center",
          size === "lg" ? "size-11 rounded-xl" : "size-9 rounded-lg",
          tone === "dark" ? "bg-ink text-lime" : "bg-lime text-ink"
        )}
      >
        <Mountain className={size === "lg" ? "size-6" : "size-5"} aria-hidden />
      </span>
      <span
        className={cn(
          "font-bold tracking-tight",
          size === "lg" ? "text-2xl" : "text-lg",
          tone === "light" && "text-white"
        )}
      >
        Shikhore
      </span>
    </span>
  );
}
