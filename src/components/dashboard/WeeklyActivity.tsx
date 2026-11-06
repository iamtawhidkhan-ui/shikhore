import { cn } from "../../utils/cn";
import type { DayActivity } from "../../utils/progress";
import { Card } from "../common/Card";

const MAX_BAR_HEIGHT = 88;

export function WeeklyActivity({
  days,
  className,
}: {
  days: DayActivity[];
  className?: string;
}) {
  const total = days.reduce((sum, day) => sum + day.count, 0);
  const max = Math.max(1, ...days.map((day) => day.count));
  const summary = days.map((day) => `${day.label}: ${day.count}`).join(", ");

  return (
    <Card className={className}>
      <h2 className="font-semibold">Weekly activity</h2>
      <p className="text-sm text-muted">
        {total === 0
          ? "No lessons or challenges completed in the last 7 days."
          : `${total} ${total === 1 ? "activity" : "activities"} completed in the last 7 days.`}
      </p>

      <div
        role="img"
        aria-label={`Activity in the last 7 days. ${summary}`}
        className="mt-6 flex h-36 items-end gap-2 sm:gap-3"
      >
        {days.map((day) => (
          <div
            key={day.date}
            className="flex h-full flex-1 flex-col items-center justify-end gap-2"
          >
            <span className="h-4 text-xs font-medium text-muted">
              {day.count > 0 ? day.count : ""}
            </span>
            <div
              className={cn(
                "w-full max-w-10 rounded-t-md transition-[height] duration-300",
                day.count > 0 ? "bg-lime" : "bg-line"
              )}
              style={{
                height:
                  day.count > 0
                    ? `${Math.max(12, Math.round((day.count / max) * MAX_BAR_HEIGHT))}px`
                    : "4px",
              }}
            />
            <span
              className={cn(
                "text-xs",
                day.isToday ? "font-bold text-ink" : "text-muted"
              )}
            >
              {day.label}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
