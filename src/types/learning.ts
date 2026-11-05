export type Difficulty = "beginner" | "intermediate" | "advanced";

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "bulletList"; items: string[] }
  | { type: "code"; language: string; code: string }
  | { type: "callout"; title: string; text: string };

export interface KnowledgeQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  pathId: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  objectives: string[];
  content: ContentBlock[];
  knowledgeCheck: KnowledgeQuestion[];
  challengeIds?: string[];
  order: number;
}

export interface LearningPath {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  difficulty: Difficulty;
  estimatedHours: number;
  outcomes: string[];
  lessonIds: string[];
  challengeIds: string[];
  status: "available" | "coming-soon";
  /** Lesson count shown on "Coming soon" previews, which have no lessons yet. */
  previewLessonCount?: number;
}
