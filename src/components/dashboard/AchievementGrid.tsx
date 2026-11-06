import { Lock } from "lucide-react";
import { ACHIEVEMENTS } from "../../data/achievements";
import { LEARNING_PATHS } from "../../data/learningPaths";
import type { LearnerProgress } from "../../types/progress";
import { getRequirementProgress } from "../../utils/achievements";
import { getAchievementIcon } from "../../utils/achievementIcons";
import { cn } from "../../utils/cn";
import { Badge } from "../common/Badge";
import { Card } from "../common/Card";
import { ProgressBar } from "../common/ProgressBar";

/** Every milestone, unlocked or not, with real progress toward the locked ones. */
export function AchievementGrid({ progress }: { progress: LearnerProgress }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {ACHIEVEMENTS.map((achievement) => {
        const earned = progress.earnedAchievementIds.includes(achievement.id);
        const Icon = getAchievementIcon(achievement.icon);
        const { current, target } = getRequirementProgress(
          achievement.requirement,
          progress,
          LEARNING_PATHS
        );

        return (
          <li key={achievement.id}>
            <Card className={cn("h-full", !earned && "bg-warm-white")}>
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    "flex size-11 shrink-0 items-center justify-center rounded-full",
                    earned ? "bg-accent/25" : "bg-line text-muted"
                  )}
                >
                  {earned ? (
                    <Icon className="size-5" aria-hidden />
                  ) : (
                    <Lock className="size-5" aria-hidden />
                  )}
                </span>
                <div className="min-w-0">
                  <p className="font-semibold">{achievement.title}</p>
                  <p className="text-sm text-muted">{achievement.description}</p>
                </div>
              </div>
              <div className="mt-4">
                {earned ? (
                  <Badge tone="success">Unlocked</Badge>
                ) : (
                  <>
                    <ProgressBar
                      value={(Math.min(current, target) / target) * 100}
                      ariaLabel={`${achievement.title} progress`}
                    />
                    <p className="mt-1 text-xs text-muted">
                      {Math.min(current, target)} of {target}
                    </p>
                  </>
                )}
              </div>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}
