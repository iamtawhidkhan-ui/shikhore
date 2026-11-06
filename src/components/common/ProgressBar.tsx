import { cn } from "../../utils/cn";

export function ProgressBar({
  value,
  label,
  ariaLabel,
  showValue = false,
  className,
}: {
  value: number;
  /** Visible text above the bar. */
  label?: string;
  /** Screen reader name when there is no visible label. */
  ariaLabel?: string;
  showValue?: boolean;
  className?: string;
}) {
  const percent = Math.min(100, Math.max(0, Math.round(value)));
  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="font-medium">{label}</span>
          {showValue && <span className="text-muted">{percent}%</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel ?? label ?? "Progress"}
        className="h-2 w-full overflow-hidden rounded-full bg-line"
      >
        <div
          className={cn(
            "h-full rounded-full transition-[width] duration-300 ease-out",
            percent === 100 ? "bg-success" : "bg-lime"
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
