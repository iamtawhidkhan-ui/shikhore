import type { Achievement } from "../types/achievement";

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-step",
    title: "First Step",
    description: "Complete your first lesson.",
    icon: "Footprints",
    requirement: "first-lesson",
  },
  {
    id: "curious-mind",
    title: "Curious Mind",
    description: "Complete three lessons.",
    icon: "Lightbulb",
    requirement: "three-lessons",
  },
  {
    id: "problem-solver",
    title: "Problem Solver",
    description: "Complete your first challenge.",
    icon: "Puzzle",
    requirement: "first-challenge",
  },
  {
    id: "consistent-learner",
    title: "Consistent Learner",
    description: "Complete learning activities on three different days.",
    icon: "CalendarCheck",
    requirement: "three-active-days",
  },
  {
    id: "path-explorer",
    title: "Path Explorer",
    description: "Complete every lesson and challenge in a learning path.",
    icon: "Flag",
    requirement: "path-completed",
  },
];
