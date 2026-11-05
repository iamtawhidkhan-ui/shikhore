import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import { DEMO_USER } from "../data/demoUser";
import { LEARNING_PATHS } from "../data/learningPaths";
import type { Achievement } from "../types/achievement";
import type { LearnerProgress } from "../types/progress";
import { getNewlyUnlocked, syncAchievements } from "../utils/achievements";
import {
  MAX_SUBMISSION_LENGTH,
  addSubmissionState,
  completeChallengeState,
  completeLessonState,
  isValidSubmission,
  saveKnowledgeAnswerState,
  saveSubmissionFeedbackState,
} from "../utils/progress";
import {
  clearProgress,
  createInitialProgress,
  loadProgress,
  saveProgress,
} from "../utils/storage";
import {
  ProgressContext,
  type ProgressContextValue,
} from "./progressContextValue";

const KNOWN_LESSON_IDS = new Set(LEARNING_PATHS.flatMap((p) => p.lessonIds));
const KNOWN_CHALLENGE_IDS = new Set(LEARNING_PATHS.flatMap((p) => p.challengeIds));

function loadInitialProgress(): LearnerProgress {
  const loaded = loadProgress();
  const valid = loaded.userId === DEMO_USER.id ? loaded : createInitialProgress();
  return syncAchievements(valid, LEARNING_PATHS);
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [initialProgress] = useState(loadInitialProgress);
  const [progress, setProgress] = useState<LearnerProgress>(initialProgress);
  // The ref always holds the latest state, so two quick actions in a row
  // (for example submit then complete) never read stale data.
  const progressRef = useRef<LearnerProgress>(initialProgress);
  const [recentlyUnlocked, setRecentlyUnlocked] = useState<Achievement[]>([]);
  const [saveFailed, setSaveFailed] = useState(false);

  /** Applies a change, recalculates achievements, saves, and publishes. */
  const update = useCallback(
    (mutate: (current: LearnerProgress) => LearnerProgress) => {
      const previous = progressRef.current;
      const next = syncAchievements(mutate(previous), LEARNING_PATHS);
      if (next === previous) return; // nothing changed

      progressRef.current = next;
      setProgress(next);
      setSaveFailed(!saveProgress(next));

      const unlocked = getNewlyUnlocked(previous, next);
      if (unlocked.length > 0) setRecentlyUnlocked(unlocked);
    },
    []
  );

  const completeLesson = useCallback<ProgressContextValue["completeLesson"]>(
    (lessonId) => {
      if (!KNOWN_LESSON_IDS.has(lessonId)) return;
      update((current) => completeLessonState(current, lessonId));
    },
    [update]
  );

  const saveKnowledgeAnswer = useCallback<
    ProgressContextValue["saveKnowledgeAnswer"]
  >(
    (lessonId, answers) => {
      if (!KNOWN_LESSON_IDS.has(lessonId)) return;
      update((current) => saveKnowledgeAnswerState(current, lessonId, answers));
    },
    [update]
  );

  const submitChallenge = useCallback<ProgressContextValue["submitChallenge"]>(
    (challengeId, answer) => {
      if (!KNOWN_CHALLENGE_IDS.has(challengeId)) {
        return { ok: false, error: "This challenge could not be found." };
      }
      if (answer.trim().length === 0) {
        return { ok: false, error: "Please write an answer before submitting." };
      }
      if (!isValidSubmission(answer)) {
        return {
          ok: false,
          error: `Your answer is too long. Please keep it under ${MAX_SUBMISSION_LENGTH} characters.`,
        };
      }
      update((current) => addSubmissionState(current, challengeId, answer));
      const saved = progressRef.current.submissions.at(-1);
      if (!saved) return { ok: false, error: "Something went wrong. Please try again." };
      return { ok: true, submissionId: saved.id };
    },
    [update]
  );

  const completeChallenge = useCallback<ProgressContextValue["completeChallenge"]>(
    (challengeId) => {
      if (!KNOWN_CHALLENGE_IDS.has(challengeId)) return false;
      update((current) => completeChallengeState(current, challengeId));
      return progressRef.current.completedChallengeIds.includes(challengeId);
    },
    [update]
  );

  const saveSubmissionFeedback = useCallback<
    ProgressContextValue["saveSubmissionFeedback"]
  >(
    (submissionId, feedback) => {
      update((current) =>
        saveSubmissionFeedbackState(current, submissionId, feedback)
      );
    },
    [update]
  );

  const resetProgress = useCallback(() => {
    const fresh = createInitialProgress();
    clearProgress();
    progressRef.current = fresh;
    setProgress(fresh);
    setRecentlyUnlocked([]);
    setSaveFailed(false);
  }, []);

  const dismissUnlocked = useCallback(() => setRecentlyUnlocked([]), []);

  const value = useMemo<ProgressContextValue>(
    () => ({
      progress,
      completeLesson,
      saveKnowledgeAnswer,
      submitChallenge,
      completeChallenge,
      saveSubmissionFeedback,
      resetProgress,
      recentlyUnlocked,
      dismissUnlocked,
      saveFailed,
    }),
    [
      progress,
      completeLesson,
      saveKnowledgeAnswer,
      submitChallenge,
      completeChallenge,
      saveSubmissionFeedback,
      resetProgress,
      recentlyUnlocked,
      dismissUnlocked,
      saveFailed,
    ]
  );

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}
