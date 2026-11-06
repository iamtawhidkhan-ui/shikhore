import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Achievement } from "../../types/achievement";
import type { NextMilestone } from "../../utils/achievements";
import { getAchievementIcon } from "../../utils/achievementIcons";
import { Card } from "../common/Card";
import { ProgressBar } from "../common/ProgressBar";

export function AchievementPreview({
  latest,
  nextMilestone,
  className,
}: {
  latest?: Achievement;
  nextMilestone: NextMilestone | null;
  className?: string;
}) {
  const LatestIcon = latest ? getAchievementIcon(latest.icon) : null;

  return (
    <Card className={className}>
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Milestones</h2>
        <Link
          to="/progress"
          className="inline-flex items-center gap-1 text-sm font-medium text-success hover:underline"
        >
          View all <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      </div>

      {latest && LatestIcon ? (
        <div className="mt-4 flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent/25">
            <LatestIcon className="size-5" aria-hidden />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Recently unlocked
            </p>
            <p className="font-semibold">{latest.title}</p>
            <p className="text-sm text-muted">{latest.description}</p>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-sm text-muted">
          No milestones yet. Complete your first lesson to unlock your first one.
        </p>
      )}

      {nextMilestone ? (
        <div className="mt-5 border-t border-line pt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            Next milestone
          </p>
          <p className="text-sm font-medium">{nextMilestone.achievement.title}</p>
          <p className="mb-2 text-xs text-muted">{nextMilestone.achievement.description}</p>
          <ProgressBar
            value={(nextMilestone.current / nextMilestone.target) * 100}
            ariaLabel={`${nextMilestone.achievement.title} progress`}
          />
          <p className="mt-1 text-xs text-muted">
            {nextMilestone.current} of {nextMilestone.target}
          </p>
        </div>
      ) : (
        <p className="mt-5 border-t border-line pt-4 text-sm text-muted">
          You have unlocked every milestone. Well done!
        </p>
      )}
    </Card>
  );
}
