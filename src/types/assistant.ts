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
