import type { Difficulty } from "./learning";

export interface Challenge {
  id: string;
  pathId: string;
  lessonId?: string;
  title: string;
  description: string;
  instructions: string[];
  hints: string[];
  expectedOutcome: string;
  difficulty: Difficulty;
  order: number;
}

export interface Submission {
  id: string;
  challengeId: string;
  answer: string;
  submittedAt: string;
  feedback?: string;
  status: "submitted" | "reviewed" | "completed";
}
