import { DEMO_USER } from "../data/demoUser";
import type { Submission } from "../types/challenge";
import type { LearnerProgress } from "../types/progress";
import type { DemoSession } from "../types/user";
import { isDateKey } from "./date";

/** Learner progress. Survives sign-out; only "Reset progress" clears it. */
export const STORAGE_KEY = "shikhore-demo-state-v1";
/** Demo sign-in session. Cleared on sign-out. */
export const SESSION_KEY = "shikhore-demo-session-v1";

export function createInitialProgress(
  userId: string = DEMO_USER.id
): LearnerProgress {
  return {
    userId,
    completedLessonIds: [],
    completedChallengeIds: [],
    lessonAnswers: {},
    submissions: [],
    activityDates: [],
    earnedAchievementIds: [],
  };
}

/* ---------- validation helpers ---------- */

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function unique(items: string[]): string[] {
  return Array.from(new Set(items));
}

const SUBMISSION_STATUSES: readonly Submission["status"][] = [
  "submitted",
  "reviewed",
  "completed",
];

function parseSubmission(value: unknown): Submission | null {
  if (!isRecord(value)) return null;
  const { id, challengeId, answer, submittedAt, feedback, status } = value;
  if (
    typeof id !== "string" ||
    typeof challengeId !== "string" ||
    typeof answer !== "string" ||
    typeof submittedAt !== "string" ||
    typeof status !== "string" ||
    !SUBMISSION_STATUSES.includes(status as Submission["status"])
  ) {
    return null;
  }
  if (feedback !== undefined && typeof feedback !== "string") return null;

  const submission: Submission = {
    id,
    challengeId,
    answer,
    submittedAt,
    status: status as Submission["status"],
  };
  if (feedback !== undefined) submission.feedback = feedback;
  return submission;
}

function parseLessonAnswers(value: unknown): Record<string, number[]> | null {
  if (!isRecord(value)) return null;
  const result: Record<string, number[]> = {};
  for (const [lessonId, answers] of Object.entries(value)) {
    if (
      !Array.isArray(answers) ||
      !answers.every((a) => Number.isInteger(a) && a >= -1)
    ) {
      return null;
    }
    result[lessonId] = answers as number[];
  }
  return result;
}

function parseProgress(value: unknown): LearnerProgress | null {
  if (!isRecord(value)) return null;
  const {
    userId,
    completedLessonIds,
    completedChallengeIds,
    lessonAnswers,
    submissions,
    activityDates,
    earnedAchievementIds,
    lastActiveAt,
  } = value;

  if (typeof userId !== "string" || userId.length === 0) return null;
  if (
    !isStringArray(completedLessonIds) ||
    !isStringArray(completedChallengeIds) ||
    !isStringArray(earnedAchievementIds)
  ) {
    return null;
  }
  if (!isStringArray(activityDates) || !activityDates.every(isDateKey)) {
    return null;
  }
  const answers = parseLessonAnswers(lessonAnswers);
  if (!answers) return null;
  if (!Array.isArray(submissions)) return null;

  const parsedSubmissions: Submission[] = [];
  for (const item of submissions) {
    const submission = parseSubmission(item);
    if (!submission) return null;
    parsedSubmissions.push(submission);
  }
  if (lastActiveAt !== undefined && typeof lastActiveAt !== "string") return null;

  const progress: LearnerProgress = {
    userId,
    completedLessonIds: unique(completedLessonIds),
    completedChallengeIds: unique(completedChallengeIds),
    lessonAnswers: answers,
    submissions: parsedSubmissions,
    activityDates,
    earnedAchievementIds: unique(earnedAchievementIds),
  };
  if (lastActiveAt !== undefined) progress.lastActiveAt = lastActiveAt;
  return progress;
}

/* ---------- progress storage ---------- */

/** Never throws. Invalid, corrupt or missing data gives a fresh state. */
export function loadProgress(): LearnerProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return createInitialProgress();
    const parsed = parseProgress(JSON.parse(raw));
    if (parsed) return parsed;
    localStorage.removeItem(STORAGE_KEY); // corrupt: discard it
  } catch {
    // Unreadable JSON or storage blocked: recover below.
  }
  return createInitialProgress();
}

/** Returns false if the browser refused the write (quota, private mode). */
export function saveProgress(progress: LearnerProgress): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    return true;
  } catch {
    return false;
  }
}

export function clearProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing to do.
  }
}

/* ---------- session storage ---------- */

export function loadSession(): DemoSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw === null) return null;
    const value: unknown = JSON.parse(raw);
    if (
      isRecord(value) &&
      typeof value.userId === "string" &&
      typeof value.signedInAt === "string"
    ) {
      return { userId: value.userId, signedInAt: value.signedInAt };
    }
    localStorage.removeItem(SESSION_KEY);
  } catch {
    // Treat unreadable session as signed out.
  }
  return null;
}

export function saveSession(session: DemoSession): boolean {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return true;
  } catch {
    return false;
  }
}

export function clearSession(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    // Nothing to do.
  }
}
