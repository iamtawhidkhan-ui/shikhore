import type { AssistantContext } from "../types/assistant";

export type QuestionType = NonNullable<AssistantContext["learnerQuestionType"]>;

export interface AssistantLinkOptions {
  pathId?: string;
  lessonId?: string;
  challengeId?: string;
  submissionId?: string;
  type?: QuestionType;
}

const QUESTION_TYPES: QuestionType[] = [
  "explanation",
  "example",
  "hint",
  "feedback",
  "general",
];

/** Builds a link to Usha that carries the current lesson or challenge. */
export function assistantUrl(options: AssistantLinkOptions = {}): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(options)) {
    if (value) params.set(key, value);
  }
  const query = params.toString();
  return query ? `/assistant?${query}` : "/assistant";
}

/** Reads the same options back from the URL (used by the Usha page). */
export function parseAssistantParams(params: URLSearchParams): AssistantLinkOptions {
  const type = params.get("type");
  return {
    pathId: params.get("pathId") ?? undefined,
    lessonId: params.get("lessonId") ?? undefined,
    challengeId: params.get("challengeId") ?? undefined,
    submissionId: params.get("submissionId") ?? undefined,
    type: QUESTION_TYPES.find((candidate) => candidate === type),
  };
}
