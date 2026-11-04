export type AchievementRequirement =
  | "first-lesson"
  | "three-lessons"
  | "first-challenge"
  | "three-active-days"
  | "path-completed";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  /** Name of a Lucide icon, mapped to a component in the UI. */
  icon: string;
  requirement: AchievementRequirement;
}
