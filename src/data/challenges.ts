import type { Challenge } from "../types/challenge";

const PATH_ID = "web-development";

export const CHALLENGES: Challenge[] = [
  {
    id: "personal-profile-page",
    pathId: PATH_ID,
    lessonId: "html-structure",
    title: "Personal Profile Page",
    description:
      "Create a semantic personal profile page that a screen reader and a search engine could both understand.",
    difficulty: "beginner",
    order: 1,
    instructions: [
      "Plan your sections on paper first: a header with your name and navigation, a main area with an About section and a Skills or Projects section, and a footer.",
      "Write the HTML using header, nav, main, section and footer elements.",
      "Use exactly one h1 for your name, and h2 headings for each section.",
      "Include a list of at least three skills, one link, and one image with meaningful alt text.",
      "Paste your HTML into the answer box, then add two or three sentences explaining why you chose each semantic element.",
    ],
    hints: [
      "Start with the outline of headings before adding any content.",
      "Choose elements by purpose, not by how they look. Ask: what is this content for?",
      "Check that your page has only one h1 and that heading levels do not skip.",
    ],
    expectedOutcome:
      "A complete, valid HTML structure that uses semantic elements correctly, with a short written explanation of your choices.",
  },
  {
    id: "responsive-product-card",
    pathId: PATH_ID,
    lessonId: "css-interfaces",
    title: "Responsive Product Card",
    description:
      "Design a product card that looks good on a phone and rearranges itself on a wider screen.",
    difficulty: "beginner",
    order: 2,
    instructions: [
      "Write the HTML for a card with an image, a product name, a price, a short description and a button.",
      "Style it with CSS: padding, rounded corners, a subtle shadow and readable text.",
      "Make the layout stack vertically on narrow screens.",
      "Add a media query so that from about 600px wide the image sits beside the text.",
      "Paste your HTML and CSS into the answer box and explain in a few sentences how the card adapts.",
    ],
    hints: [
      "Write the small-screen styles first, then add the media query.",
      "Give the image max-width: 100% so it never overflows the card.",
      "Set box-sizing: border-box so padding does not break your widths.",
    ],
    expectedOutcome:
      "HTML and CSS for a card that stacks on small screens and becomes side by side on wider screens, with a clear explanation of how the media query works.",
  },
  {
    id: "interactive-task-tracker",
    pathId: PATH_ID,
    lessonId: "javascript-behaviour",
    title: "Interactive Task Tracker",
    description:
      "Build a small task tracker where you can add tasks, mark them done and see how many remain.",
    difficulty: "intermediate",
    order: 3,
    instructions: [
      "Create HTML with a text input, an Add button, a list and a line that shows how many tasks are left.",
      "Keep your tasks in an array of objects such as { id, text, done }.",
      "Write a render function that draws the list and the remaining count from that array.",
      "Add tasks when the button is clicked, and reject empty text with a friendly message.",
      "Let the user toggle a task between done and not done by clicking it.",
      "Paste your HTML and JavaScript into the answer box and explain how data flows from the array to the screen.",
    ],
    hints: [
      "Treat the array as the single source of truth and redraw after every change.",
      "Trim the input before checking whether it is empty.",
      "Use a unique id for each task so you can find the right one when toggling.",
    ],
    expectedOutcome:
      "Working HTML and JavaScript that adds, toggles and counts tasks from a single array, plus an explanation of the data flow.",
  },
];

export function getChallengeById(challengeId: string): Challenge | undefined {
  return CHALLENGES.find((challenge) => challenge.id === challengeId);
}

/** Challenges of one path, in order. */
export function getChallengesForPath(pathId: string): Challenge[] {
  return CHALLENGES.filter((challenge) => challenge.pathId === pathId).sort(
    (a, b) => a.order - b.order
  );
}
