import type { Submission } from "./challenge";

export interface LearnerProgress {
  userId: string;
  completedLessonIds: string[];
  completedChallengeIds: string[];
  /** lessonId -> chosen option index per question (-1 means not answered yet). */
  lessonAnswers: Record<string, number[]>;
  submissions: Submission[];
  /**
   * One "YYYY-MM-DD" (local date) entry per completed activity
   * (a completed lesson or a completed challenge). Duplicates are expected:
   * the weekly chart counts them, achievements count distinct dates.
   */
  activityDates: string[];
  earnedAchievementIds: string[];
  lastActiveAt?: string;
}
