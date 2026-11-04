import type { Submission } from "../types/challenge";
import type { LearningPath } from "../types/learning";
import type { LearnerProgress } from "../types/progress";
import { formatWeekday, lastNDateKeys, nowIso, todayKey } from "./date";

export const MAX_SUBMISSION_LENGTH = 5000;

/* ---------- small helpers ---------- */

export function createId(prefix: string): string {
  const random =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  return `${prefix}-${random}`;
}

export function calcPercent(completed: number, total: number): number {
  return total === 0 ? 0 : Math.round((completed / total) * 100);
}

/* ---------- path progress (the ONE formula used everywhere) ---------- */

export interface PathProgress {
  completedLessons: number;
  totalLessons: number;
  completedChallenges: number;
  totalChallenges: number;
  lessonProgress: number;
  challengeProgress: number;
  overallProgress: number;
}

export function calcPathProgress(
  path: LearningPath,
  progress: LearnerProgress
): PathProgress {
  const totalLessons = path.lessonIds.length;
  const totalChallenges = path.challengeIds.length;
  // Only count ids that belong to this path, so unknown ids never inflate it.
  const completedLessons = path.lessonIds.filter((id) =>
    progress.completedLessonIds.includes(id)
  ).length;
  const completedChallenges = path.challengeIds.filter((id) =>
    progress.completedChallengeIds.includes(id)
  ).length;

  const lessonProgress = calcPercent(completedLessons, totalLessons);
  const challengeProgress = calcPercent(completedChallenges, totalChallenges);
  const overallProgress = Math.round(
    lessonProgress * 0.7 + challengeProgress * 0.3
  );

  return {
    completedLessons,
    totalLessons,
    completedChallenges,
    totalChallenges,
    lessonProgress,
    challengeProgress,
    overallProgress,
  };
}

/* ---------- statuses and next steps ---------- */

export type ItemStatus = "completed" | "current" | "not-started";

/** First lesson in path order that is not completed yet. */
export function getNextLessonId(
  path: LearningPath,
  progress: LearnerProgress
): string | undefined {
  return path.lessonIds.find((id) => !progress.completedLessonIds.includes(id));
}

export function getLessonStatus(
  path: LearningPath,
  progress: LearnerProgress,
  lessonId: string
): ItemStatus {
  if (progress.completedLessonIds.includes(lessonId)) return "completed";
  return getNextLessonId(path, progress) === lessonId ? "current" : "not-started";
}

export function getSubmissionsForChallenge(
  progress: LearnerProgress,
  challengeId: string
): Submission[] {
  // Newest first.
  return progress.submissions
    .filter((s) => s.challengeId === challengeId)
    .reverse();
}

/** "current" means the learner has made attempts but has not completed it. */
export function getChallengeStatus(
  progress: LearnerProgress,
  challengeId: string
): ItemStatus {
  if (progress.completedChallengeIds.includes(challengeId)) return "completed";
  const hasAttempts = progress.submissions.some(
    (s) => s.challengeId === challengeId
  );
  return hasAttempts ? "current" : "not-started";
}

export type NextStep =
  | { type: "lesson"; id: string }
  | { type: "challenge"; id: string }
  | { type: "path-complete" };

/** Next lesson first, then the next unfinished challenge. */
export function getRecommendedNextStep(
  path: LearningPath,
  progress: LearnerProgress
): NextStep {
  const lessonId = getNextLessonId(path, progress);
  if (lessonId) return { type: "lesson", id: lessonId };
  const challengeId = path.challengeIds.find(
    (id) => !progress.completedChallengeIds.includes(id)
  );
  if (challengeId) return { type: "challenge", id: challengeId };
  return { type: "path-complete" };
}

/* ---------- dashboard statistics (always derived, never hardcoded) ---------- */

export interface OverviewStats {
  lessonsCompleted: number;
  challengesCompleted: number;
  pathsInProgress: number;
}

export function getOverviewStats(
  paths: LearningPath[],
  progress: LearnerProgress
): OverviewStats {
  const pathsInProgress = paths.filter((path) => {
    if (path.status !== "available") return false;
    const { overallProgress } = calcPathProgress(path, progress);
    return overallProgress > 0 && overallProgress < 100;
  }).length;

  return {
    lessonsCompleted: progress.completedLessonIds.length,
    challengesCompleted: progress.completedChallengeIds.length,
    pathsInProgress,
  };
}

export interface DayActivity {
  date: string;
  label: string;
  count: number;
  isToday: boolean;
}

/** Activities per day for the last `days` days, from real saved dates. */
export function getWeeklyActivity(
  progress: LearnerProgress,
  days = 7,
  endKey: string = todayKey()
): DayActivity[] {
  const counts = new Map<string, number>();
  for (const date of progress.activityDates) {
    counts.set(date, (counts.get(date) ?? 0) + 1);
  }
  return lastNDateKeys(days, endKey).map((date) => ({
    date,
    label: formatWeekday(date),
    count: counts.get(date) ?? 0,
    isToday: date === endKey,
  }));
}

/** Number of DIFFERENT calendar days with activity. */
export function countDistinctActiveDays(progress: LearnerProgress): number {
  return new Set(progress.activityDates).size;
}

/* ---------- pure state updates (used by ProgressContext in Step 3) ---------- */

/** Completing the same lesson again returns the SAME object: no inflation. */
export function completeLessonState(
  progress: LearnerProgress,
  lessonId: string,
  date: string = todayKey(),
  now: string = nowIso()
): LearnerProgress {
  if (progress.completedLessonIds.includes(lessonId)) return progress;
  return {
    ...progress,
    completedLessonIds: [...progress.completedLessonIds, lessonId],
    activityDates: [...progress.activityDates, date],
    lastActiveAt: now,
  };
}

export function saveKnowledgeAnswerState(
  progress: LearnerProgress,
  lessonId: string,
  answers: number[]
): LearnerProgress {
  return {
    ...progress,
    lessonAnswers: { ...progress.lessonAnswers, [lessonId]: [...answers] },
  };
}

export function isValidSubmission(answer: string): boolean {
  const length = answer.trim().length;
  return length > 0 && length <= MAX_SUBMISSION_LENGTH;
}

/** Appends a new attempt. Empty or oversized answers are rejected (no change). */
export function addSubmissionState(
  progress: LearnerProgress,
  challengeId: string,
  answer: string,
  now: string = nowIso()
): LearnerProgress {
  if (!isValidSubmission(answer)) return progress;
  const submission: Submission = {
    id: createId("sub"),
    challengeId,
    answer: answer.trim(),
    submittedAt: now,
    status: "submitted",
  };
  return {
    ...progress,
    submissions: [...progress.submissions, submission],
    lastActiveAt: now,
  };
}

/**
 * Completes a challenge. Requires at least one saved attempt, and
 * completing it twice changes nothing.
 */
export function completeChallengeState(
  progress: LearnerProgress,
  challengeId: string,
  date: string = todayKey(),
  now: string = nowIso()
): LearnerProgress {
  if (progress.completedChallengeIds.includes(challengeId)) return progress;

  let lastIndex = -1;
  progress.submissions.forEach((s, index) => {
    if (s.challengeId === challengeId) lastIndex = index;
  });
  if (lastIndex === -1) return progress;

  return {
    ...progress,
    completedChallengeIds: [...progress.completedChallengeIds, challengeId],
    submissions: progress.submissions.map((s, index) =>
      index === lastIndex ? { ...s, status: "completed" as const } : s
    ),
    activityDates: [...progress.activityDates, date],
    lastActiveAt: now,
  };
}

/** Saves Usha's (or any) feedback on one attempt without losing history. */
export function saveSubmissionFeedbackState(
  progress: LearnerProgress,
  submissionId: string,
  feedback: string
): LearnerProgress {
  const text = feedback.trim();
  if (text.length === 0) return progress;
  return {
    ...progress,
    submissions: progress.submissions.map((s) =>
      s.id === submissionId
        ? {
            ...s,
            feedback: text,
            status: s.status === "completed" ? s.status : ("reviewed" as const),
          }
        : s
    ),
  };
}
