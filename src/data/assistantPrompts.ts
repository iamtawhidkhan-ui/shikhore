import type { QuestionType } from "../utils/assistantLinks";

export interface SuggestedPrompt {
  id: string;
  label: string;
  /** The message that is sent to Usha. */
  message: string;
  type: QuestionType;
}

export const SUGGESTED_PROMPTS: SuggestedPrompt[] = [
  { id: "simpler", label: "Explain this in simpler terms", message: "Explain this in simpler terms.", type: "explanation" },
  { id: "example", label: "Give me a real-world example", message: "Give me a real-world example.", type: "example" },
  { id: "hint", label: "Give me a hint", message: "Give me a hint.", type: "hint" },
  { id: "incorrect", label: "Explain why my answer is incorrect", message: "Explain why my answer is incorrect.", type: "feedback" },
  { id: "next", label: "What should I learn next?", message: "What should I learn next?", type: "general" },
];

/** Messages used when a page sends the learner here with a ready-made request. */
export const AUTO_MESSAGES: Partial<Record<QuestionType, string>> = {
  explanation: "Explain this in simpler terms.",
  example: "Give me a real-world example.",
  hint: "Give me a hint.",
  feedback: "Please give me feedback on my latest attempt.",
};
