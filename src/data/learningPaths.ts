import type { LearningPath } from "../types/learning";

export const WEB_DEVELOPMENT_PATH_ID = "web-development";

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: WEB_DEVELOPMENT_PATH_ID,
    title: "Web Development: From Concepts to Practice",
    slug: "web-development",
    description:
      "Learn how the web works, then build real pages and interfaces with HTML, CSS, JavaScript and React, and finish by working with live data from an API.",
    category: "Web Development",
    difficulty: "beginner",
    estimatedHours: 8,
    outcomes: [
      "Explain how browsers, servers and HTTP work together",
      "Structure content with semantic HTML",
      "Design responsive interfaces with CSS",
      "Add interactive behaviour with JavaScript",
      "Build reusable UI with React components",
      "Fetch and display data from an API",
    ],
    lessonIds: [
      "how-the-web-works",
      "html-structure",
      "css-interfaces",
      "javascript-behaviour",
      "react-components",
      "working-with-apis",
    ],
    challengeIds: [
      "personal-profile-page",
      "responsive-product-card",
      "interactive-task-tracker",
    ],
    status: "available",
  },
  {
    id: "ui-ux-design-fundamentals",
    title: "UI/UX Design Fundamentals",
    slug: "ui-ux-design-fundamentals",
    description:
      "Learn how to design interfaces people find clear, useful and pleasant, from user research to polished layouts.",
    category: "Design",
    difficulty: "beginner",
    estimatedHours: 6,
    outcomes: [
      "Understand users and their goals",
      "Apply layout, colour and typography principles",
      "Create and test simple prototypes",
    ],
    lessonIds: [],
    challengeIds: [],
    status: "coming-soon",
    previewLessonCount: 5,
  },
  {
    id: "ai-prompting-basics",
    title: "AI and Prompting Basics",
    slug: "ai-prompting-basics",
    description:
      "Learn how modern AI assistants work and how to ask better questions to get reliable, useful results.",
    category: "AI",
    difficulty: "beginner",
    estimatedHours: 4,
    outcomes: [
      "Explain what AI assistants can and cannot do",
      "Write clear, structured prompts",
      "Check AI answers before trusting them",
    ],
    lessonIds: [],
    challengeIds: [],
    status: "coming-soon",
    previewLessonCount: 4,
  },
  {
    id: "python-data-analysis",
    title: "Data Analysis with Python",
    slug: "python-data-analysis",
    description:
      "Clean, explore and visualise real datasets with Python, and turn numbers into decisions.",
    category: "Data",
    difficulty: "intermediate",
    estimatedHours: 10,
    outcomes: [
      "Load and clean data with pandas",
      "Summarise and visualise patterns",
      "Communicate findings clearly",
    ],
    lessonIds: [],
    challengeIds: [],
    status: "coming-soon",
    previewLessonCount: 8,
  },
  {
    id: "system-design-essentials",
    title: "System Design Essentials",
    slug: "system-design-essentials",
    description:
      "Learn how large applications are structured, from databases and caching to scaling and reliability.",
    category: "Engineering",
    difficulty: "advanced",
    estimatedHours: 12,
    outcomes: [
      "Break a product into services and data stores",
      "Reason about scale, latency and failure",
      "Explain trade-offs in design reviews",
    ],
    lessonIds: [],
    challengeIds: [],
    status: "coming-soon",
    previewLessonCount: 7,
  },
];

export function getPathById(pathId: string): LearningPath | undefined {
  return LEARNING_PATHS.find((path) => path.id === pathId);
}

/** Real lesson count for available paths, planned count for previews. */
export function getLessonCount(path: LearningPath): number {
  return path.status === "available"
    ? path.lessonIds.length
    : (path.previewLessonCount ?? 0);
}

/** Unique categories, in the order they first appear (for the Explore filter). */
export const PATH_CATEGORIES: string[] = Array.from(
  new Set(LEARNING_PATHS.map((path) => path.category))
);
