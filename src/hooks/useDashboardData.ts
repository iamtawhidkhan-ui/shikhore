import { useMemo } from "react";
import { LEARNING_PATHS } from "../data/learningPaths";
import { getEarnedAchievements, getNextMilestone } from "../utils/achievements";
import {
  describeStep,
  getCurrentPath,
  getRecommendedStep,
} from "../utils/learning";
import {
  calcPathProgress,
  getOverviewStats,
  getRecommendedNextStep,
  getWeeklyActivity,
} from "../utils/progress";
import { useProgress } from "./useProgress";

/** Everything the dashboard shows, derived from real learner state. */
export function useDashboardData() {
  const { progress } = useProgress();

  return useMemo(() => {
    const available = LEARNING_PATHS.filter((path) => path.status === "available");
    const currentPath = getCurrentPath(LEARNING_PATHS, progress);

    const pathProgress = currentPath
      ? calcPathProgress(currentPath, progress)
      : undefined;
    const nextStep = currentPath
      ? describeStep(currentPath, getRecommendedNextStep(currentPath, progress))
      : undefined;

    let recommended: (ReturnType<typeof describeStep> & { reason: string }) | undefined;
    if (currentPath) {
      const suggestion = getRecommendedStep(currentPath, progress);
      recommended = {
        ...describeStep(currentPath, suggestion.step),
        reason: suggestion.reason,
      };
    }

    const earned = getEarnedAchievements(progress);

    return {
      progress,
      currentPath,
      pathProgress,
      nextStep,
      recommended,
      stats: {
        ...getOverviewStats(LEARNING_PATHS, progress),
        totalLessons: available.reduce((sum, p) => sum + p.lessonIds.length, 0),
        totalChallenges: available.reduce((sum, p) => sum + p.challengeIds.length, 0),
      },
      weekly: getWeeklyActivity(progress),
      latestAchievement: earned.length > 0 ? earned[earned.length - 1] : undefined,
      nextMilestone: getNextMilestone(progress, LEARNING_PATHS),
    };
  }, [progress]);
}
