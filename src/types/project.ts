import type { Difficulty } from "./learning";

export interface FinalProject {
  id: string;
  pathId: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  estimatedHours: number;
  outcomes: string[];
  steps: Array<{ title: string; detail: string }>;
  deliverables: string[];
  evaluationGuidance: Array<{ criterion: string; lookFor: string }>;
}
