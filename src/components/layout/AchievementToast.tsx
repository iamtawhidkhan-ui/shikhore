import { X } from "lucide-react";
import { useEffect } from "react";
import { useProgress } from "../../hooks/useProgress";
import { getAchievementIcon } from "../../utils/achievementIcons";

/** A small, quiet notice when a milestone is unlocked. */
export function AchievementToast() {
  const { recentlyUnlocked, dismissUnlocked } = useProgress();

  useEffect(() => {
    if (recentlyUnlocked.length === 0) return;
    const timer = window.setTimeout(dismissUnlocked, 6000);
    return () => window.clearTimeout(timer);
  }, [recentlyUnlocked, dismissUnlocked]);

  if (recentlyUnlocked.length === 0) return null;

  return (
    <div
      role="status"
      className="fixed bottom-20 right-4 z-50 w-72 space-y-2 md:bottom-6 md:right-6"
    >
      {recentlyUnlocked.map((achievement) => {
        const Icon = getAchievementIcon(achievement.icon);
        return (
          <div
            key={achievement.id}
            className="flex items-start gap-3 rounded-card border border-line bg-surface p-3 shadow-lg"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent/25">
              <Icon className="size-5" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                Milestone unlocked
              </p>
              <p className="text-sm font-semibold">{achievement.title}</p>
            </div>
            <button
              type="button"
              onClick={dismissUnlocked}
              aria-label="Dismiss"
              className="rounded p-1 hover:bg-ink/5"
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>
        );
      })}
    </div>
  );
}
