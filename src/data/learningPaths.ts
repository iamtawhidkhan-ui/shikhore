import type { LearningPath } from "../types/learning";

export const WEB_DEVELOPMENT_PATH_ID = "web-development";

/**
 * Path metadata. Lesson and challenge CONTENT is added in Step 5; these ids
 * are the contract between the path, the lessons and the challenges.
 * Step 5 also adds the "Coming soon" preview paths for the Explore page.
 */
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
];

export function getPathById(pathId: string): LearningPath | undefined {
  return LEARNING_PATHS.find((path) => path.id === pathId);
}
