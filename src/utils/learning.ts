import { getChallengeById } from "../data/challenges";
import { getLessonById } from "../data/lessons";
import type { LearningPath } from "../types/learning";
import type { LearnerProgress } from "../types/progress";
import { DIFFICULTY_LABELS, formatMinutes } from "./labels";
import {
  calcPathProgress,
  getRecommendedNextStep,
  type NextStep,
} from "./progress";

export const pathUrl = (pathId: string) => `/paths/${pathId}`;
export const lessonUrl = (pathId: string, lessonId: string) =>
  `/paths/${pathId}/lessons/${lessonId}`;
export const challengeUrl = (challengeId: string) => `/challenges/${challengeId}`;

export interface StepInfo {
  kind: NextStep["type"];
  title: string;
  description: string;
  /** Short line such as "Lesson 3 · 30 min". */
  meta: string;
  to: string;
}

/** Turns a next-step id into text and a link the UI can show. */
export function describeStep(path: LearningPath, step: NextStep): StepInfo {
  if (step.type === "lesson") {
    const lesson = getLessonById(step.id);
    return {
      kind: "lesson",
      title: lesson?.title ?? "Next lesson",
      description: lesson?.description ?? "",
      meta: lesson
        ? `Lesson ${lesson.order} · ${formatMinutes(lesson.estimatedMinutes)}`
        : "Lesson",
      to: lessonUrl(path.id, step.id),
    };
  }
  if (step.type === "challenge") {
    const challenge = getChallengeById(step.id);
    return {
      kind: "challenge",
      title: challenge?.title ?? "Next challenge",
      description: challenge?.description ?? "",
      meta: challenge
        ? `Challenge · ${DIFFICULTY_LABELS[challenge.difficulty]}`
        : "Challenge",
      to: challengeUrl(step.id),
    };
  }
  return {
    kind: "path-complete",
    title: "You have completed this path",
    description:
      "Review any lesson, or take on the final project to put everything together.",
    meta: "Path complete",
    to: pathUrl(path.id),
  };
}

/** The path the learner is working on: in progress first, else next unfinished. */
export function getCurrentPath(
  paths: LearningPath[],
  progress: LearnerProgress
): LearningPath | undefined {
  const available = paths.filter((path) => path.status === "available");
  const inProgress = available.find((path) => {
    const { overallProgress } = calcPathProgress(path, progress);
    return overallProgress > 0 && overallProgress < 100;
  });
  if (inProgress) return inProgress;
  const unfinished = available.find(
    (path) => calcPathProgress(path, progress).overallProgress < 100
  );
  return unfinished ?? available[0];
}

/**
 * One helpful suggestion. If a recently finished lesson has a related
 * challenge not done yet, suggest applying it; otherwise the next step.
 */
export function getRecommendedStep(
  path: LearningPath,
  progress: LearnerProgress
): { step: NextStep; reason: string } {
  const mostRecentFirst = [...progress.completedLessonIds].reverse();
  for (const lessonId of mostRecentFirst) {
    if (!path.lessonIds.includes(lessonId)) continue;
    const lesson = getLessonById(lessonId);
    const challengeId = lesson?.challengeIds?.find(
      (id) => !progress.completedChallengeIds.includes(id)
    );
    if (lesson && challengeId) {
      return {
        step: { type: "challenge", id: challengeId },
        reason: `Apply what you learned in "${lesson.title}".`,
      };
    }
  }

  const step = getRecommendedNextStep(path, progress);
  if (step.type === "lesson") {
    return {
      step,
      reason:
        progress.completedLessonIds.length === 0
          ? "A great place to start: the foundations everything else builds on."
          : "The next lesson in your path.",
    };
  }
  if (step.type === "challenge") {
    return { step, reason: "Practise what you have learned with a real task." };
  }
  return { step, reason: "You finished everything. Try the final project next." };
}

/** True once the learner has done anything in this path. */
export function hasStartedPath(
  path: LearningPath,
  progress: LearnerProgress
): boolean {
  const { completedLessons, completedChallenges } = calcPathProgress(path, progress);
  const hasAttempts = progress.submissions.some((submission) =>
    path.challengeIds.includes(submission.challengeId)
  );
  return completedLessons + completedChallenges > 0 || hasAttempts;
}
