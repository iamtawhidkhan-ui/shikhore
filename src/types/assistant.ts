export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
}

export interface AssistantContext {
  pathId?: string;
  pathTitle?: string;
  lessonId?: string;
  lessonTitle?: string;
  lessonContent?: string;
  challengeId?: string;
  challengeTitle?: string;
  challengeDescription?: string;
  learnerQuestionType?:
    | "explanation"
    | "example"
    | "hint"
    | "feedback"
    | "general";
  /** Progress facts the app states explicitly, so Usha never has to guess. */
  learnerState?: string;
  /** The learner's latest submitted answer for the current challenge. */
  learnerAnswer?: string;
}

export interface AssistantRequest {
  message: string;
  context: AssistantContext;
  conversationHistory?: Array<{
    role: ChatRole;
    content: string;
  }>;
}

export interface AssistantResponse {
  answer: string;
  requestId?: string;
}
