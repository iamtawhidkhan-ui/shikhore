import { createContext } from "react";
import type { Achievement } from "../types/achievement";
import type { LearnerProgress } from "../types/progress";

export type SubmitChallengeResult =
  | { ok: true; submissionId: string }
  | { ok: false; error: string };

export interface ProgressContextValue {
  progress: LearnerProgress;
  completeLesson: (lessonId: string) => void;
  saveKnowledgeAnswer: (lessonId: string, answers: number[]) => void;
  /** Rejects empty answers and returns a message the UI can show. */
  submitChallenge: (challengeId: string, answer: string) => SubmitChallengeResult;
  /** Returns true if the challenge is completed after the call. */
  completeChallenge: (challengeId: string) => boolean;
  saveSubmissionFeedback: (submissionId: string, feedback: string) => void;
  resetProgress: () => void;
  /** Achievements unlocked by the most recent action (for a subtle toast). */
  recentlyUnlocked: Achievement[];
  dismissUnlocked: () => void;
  /** True if the browser refused to save (storage full or blocked). */
  saveFailed: boolean;
}

export const ProgressContext = createContext<ProgressContextValue | null>(null);
