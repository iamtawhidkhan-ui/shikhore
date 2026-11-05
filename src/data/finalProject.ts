import type { FinalProject } from "../types/project";

export const FINAL_PROJECT: FinalProject = {
  id: "personal-learning-dashboard",
  pathId: "web-development",
  title: "Build a Personal Learning Dashboard",
  description:
    "Bring everything together by building a small dashboard that helps someone track what they are learning. This is a guided project brief: you build it yourself, and the evaluation guide below shows what good work looks like.",
  difficulty: "intermediate",
  estimatedHours: 4,
  outcomes: [
    "Structure a multi-section page with semantic HTML",
    "Create a responsive layout with CSS",
    "Manage changing data with JavaScript or React state",
    "Fetch and display data from an API with loading and error states",
  ],
  steps: [
    {
      title: "Plan the dashboard",
      detail:
        "Sketch the screen. Decide on the sections: a greeting, a list of topics being learned with progress, an area to add a topic, and one box that shows data from an API (for example a daily quote or a tip).",
    },
    {
      title: "Build the structure",
      detail:
        "Write semantic HTML or React components for the header, main sections and footer. Use real headings and lists.",
    },
    {
      title: "Style and make it responsive",
      detail:
        "Use CSS to give it a clear visual hierarchy. Make sure it works on a phone, a tablet and a desktop.",
    },
    {
      title: "Add interaction and state",
      detail:
        "Let the learner add a topic, update its progress and remove it. Keep topics in one array or state variable and draw the screen from it.",
    },
    {
      title: "Connect an API",
      detail:
        "Fetch data from a public API. Show a loading message, a friendly error message and a retry option.",
    },
    {
      title: "Polish and reflect",
      detail:
        "Check keyboard use and alt text, fix any console errors, and write a short note on what you built and what you would improve.",
    },
  ],
  deliverables: [
    "Your HTML, CSS and JavaScript (or React) code",
    "A short written reflection (five sentences or more)",
    "Optional: a link or screenshots of the working result",
  ],
  evaluationGuidance: [
    {
      criterion: "Structure",
      lookFor: "Semantic elements, one h1 and a logical heading order.",
    },
    {
      criterion: "Responsiveness",
      lookFor: "The layout adapts cleanly from phone to desktop without sideways scrolling.",
    },
    {
      criterion: "Interactivity and state",
      lookFor: "Adding, updating and removing topics all work and stay in sync with the data.",
    },
    {
      criterion: "API handling",
      lookFor: "Loading, success and error states are all handled, and no secret keys are in the code.",
    },
    {
      criterion: "Clarity",
      lookFor: "Readable code, sensible names and a reflection that explains your choices.",
    },
  ],
};
