import type { Difficulty } from "../types/learning";

export const DIFFICULTIES: Difficulty[] = ["beginner", "intermediate", "advanced"];

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export function difficultyTone(difficulty: Difficulty): "success" | "accent" | "ink" {
  if (difficulty === "beginner") return "success";
  if (difficulty === "intermediate") return "accent";
  return "ink";
}

export function formatHours(hours: number): string {
  return hours === 1 ? "1 hour" : `${hours} hours`;
}

export function formatMinutes(minutes: number): string {
  return `${minutes} min`;
}

export function getGreeting(date: Date = new Date()): string {
  const hour = date.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}
