import { getChallengeById } from "../data/challenges";
import { getLessonById } from "../data/lessons";
import { getPathById } from "../data/learningPaths";
import type { AssistantContext } from "../types/assistant";
import type { LearnerProgress } from "../types/progress";
import { type AssistantLinkOptions } from "./assistantLinks";
import { lessonToPlainText } from "./lessonText";
import { getNextLessonId, getSubmissionsForChallenge } from "./progress";

/** States only facts the app really knows, so Usha never has to guess. */
export function buildLearnerState(progress: LearnerProgress, pathId?: string): string {
  const lessons = progress.completedLessonIds
    .map((id) => getLessonById(id)?.title)
    .filter((title): title is string => Boolean(title));
  const challenges = progress.completedChallengeIds
    .map((id) => getChallengeById(id)?.title)
    .filter((title): title is string => Boolean(title));

  const lines: string[] = [];
  lines.push(
    lessons.length > 0
      ? `Completed lessons: ${lessons.join("; ")}.`
      : "No lessons completed yet."
  );
  lines.push(
    challenges.length > 0
      ? `Completed challenges: ${challenges.join("; ")}.`
      : "No challenges completed yet."
  );
  const path = pathId ? getPathById(pathId) : getPathById("web-development");
  if (path) {
    const nextId = getNextLessonId(path, progress);
    const next = nextId ? getLessonById(nextId)?.title : undefined;
    lines.push(next ? `Next lesson in the path: ${next}.` : "All lessons in the path are completed.");
  }
  return lines.join(" ");
}

export interface BuiltContext {
  context: AssistantContext;
  /** Short label for the "Talking about" chip, if there is any context. */
  label?: string;
  /** The attempt Usha's feedback should be attached to, if any. */
  targetSubmissionId?: string;
}

/** Turns link options (from the URL) into the context sent to the server. */
export function buildAssistantContext(
  options: AssistantLinkOptions,
  progress: LearnerProgress
): BuiltContext {
  const lesson = options.lessonId ? getLessonById(options.lessonId) : undefined;
  const challenge = options.challengeId ? getChallengeById(options.challengeId) : undefined;
  const path = getPathById(lesson?.pathId ?? challenge?.pathId ?? options.pathId ?? "");

  const context: AssistantContext = {
    learnerQuestionType: options.type ?? "general",
    learnerState: buildLearnerState(progress, path?.id),
  };
  if (path) {
    context.pathId = path.id;
    context.pathTitle = path.title;
  }

  let label: string | undefined;
  let targetSubmissionId: string | undefined;

  if (lesson) {
    context.lessonId = lesson.id;
    context.lessonTitle = lesson.title;
    context.lessonContent = lessonToPlainText(lesson);
    label = `Lesson: ${lesson.title}`;
  }

  if (challenge) {
    context.challengeId = challenge.id;
    context.challengeTitle = challenge.title;
    context.challengeDescription = [
      challenge.description,
      "Instructions:",
      ...challenge.instructions.map((step, index) => `${index + 1}. ${step}`),
      `Expected outcome: ${challenge.expectedOutcome}`,
    ].join("\n");
    label = `Challenge: ${challenge.title}`;

    const attempts = getSubmissionsForChallenge(progress, challenge.id); // newest first
    const chosen =
      attempts.find((attempt) => attempt.id === options.submissionId) ?? attempts[0];
    if (chosen) {
      context.learnerAnswer = chosen.answer;
      targetSubmissionId = chosen.id;
    }
  }

  return { context, label, targetSubmissionId };
}
