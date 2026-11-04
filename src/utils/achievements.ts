import { ACHIEVEMENTS } from "../data/achievements";
import type { Achievement, AchievementRequirement } from "../types/achievement";
import type { LearningPath } from "../types/learning";
import type { LearnerProgress } from "../types/progress";
import { countDistinctActiveDays } from "./progress";

export interface AchievementProgress {
  current: number;
  target: number;
}

/** How close the learner is to one requirement, from real activity only. */
export function getRequirementProgress(
  requirement: AchievementRequirement,
  progress: LearnerProgress,
  paths: LearningPath[]
): AchievementProgress {
  switch (requirement) {
    case "first-lesson":
      return { current: progress.completedLessonIds.length, target: 1 };
    case "three-lessons":
      return { current: progress.completedLessonIds.length, target: 3 };
    case "first-challenge":
      return { current: progress.completedChallengeIds.length, target: 1 };
    case "three-active-days":
      // Distinct dates: ten activities on one day still count as one day.
      return { current: countDistinctActiveDays(progress), target: 3 };
    case "path-completed": {
      let best: AchievementProgress = { current: 0, target: 1 };
      for (const path of paths) {
        if (path.status !== "available") continue;
        const target = path.lessonIds.length + path.challengeIds.length;
        if (target === 0) continue;
        const current =
          path.lessonIds.filter((id) => progress.completedLessonIds.includes(id))
            .length +
          path.challengeIds.filter((id) =>
            progress.completedChallengeIds.includes(id)
          ).length;
        if (current / target >= best.current / best.target) {
          best = { current, target };
        }
      }
      return best;
    }
  }
}

export function isAchievementMet(
  achievement: Achievement,
  progress: LearnerProgress,
  paths: LearningPath[]
): boolean {
  const { current, target } = getRequirementProgress(
    achievement.requirement,
    progress,
    paths
  );
  return current >= target;
}

/** Ids of every achievement the learner currently qualifies for. */
export function evaluateAchievements(
  progress: LearnerProgress,
  paths: LearningPath[]
): string[] {
  return ACHIEVEMENTS.filter((a) => isAchievementMet(a, progress, paths)).map(
    (a) => a.id
  );
}

/**
 * Adds newly earned achievements. Call it after every progress change.
 * Returns the SAME object when nothing changed.
 */
export function syncAchievements(
  progress: LearnerProgress,
  paths: LearningPath[]
): LearnerProgress {
  const earned = new Set([
    ...progress.earnedAchievementIds,
    ...evaluateAchievements(progress, paths),
  ]);
  const ordered = ACHIEVEMENTS.filter((a) => earned.has(a.id)).map((a) => a.id);

  const unchanged =
    ordered.length === progress.earnedAchievementIds.length &&
    ordered.every((id) => progress.earnedAchievementIds.includes(id));
  return unchanged ? progress : { ...progress, earnedAchievementIds: ordered };
}

/** Achievement ids present in `after` but not in `before` (for a toast). */
export function getNewlyUnlocked(
  before: LearnerProgress,
  after: LearnerProgress
): Achievement[] {
  return ACHIEVEMENTS.filter(
    (a) =>
      after.earnedAchievementIds.includes(a.id) &&
      !before.earnedAchievementIds.includes(a.id)
  );
}

export function getEarnedAchievements(progress: LearnerProgress): Achievement[] {
  return ACHIEVEMENTS.filter((a) => progress.earnedAchievementIds.includes(a.id));
}

export interface NextMilestone extends AchievementProgress {
  achievement: Achievement;
}

/** The first achievement not earned yet, with how far along the learner is. */
export function getNextMilestone(
  progress: LearnerProgress,
  paths: LearningPath[]
): NextMilestone | null {
  const next = ACHIEVEMENTS.find(
    (a) => !progress.earnedAchievementIds.includes(a.id)
  );
  if (!next) return null;
  const { current, target } = getRequirementProgress(
    next.requirement,
    progress,
    paths
  );
  return { achievement: next, current: Math.min(current, target), target };
}
