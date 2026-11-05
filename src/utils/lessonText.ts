import type { ContentBlock, Lesson } from "../types/learning";

function blockToText(block: ContentBlock): string {
  switch (block.type) {
    case "heading":
      return `## ${block.text}`;
    case "paragraph":
      return block.text;
    case "bulletList":
      return block.items.map((item) => `- ${item}`).join("\n");
    case "code":
      return `Code (${block.language}):\n${block.code}`;
    case "callout":
      return `${block.title}: ${block.text}`;
  }
}

/**
 * Flattens a lesson into plain text so Usha can use it as context.
 * Long lessons are trimmed so requests stay a sensible size.
 */
export function lessonToPlainText(lesson: Lesson, maxLength = 6000): string {
  const text = lesson.content.map(blockToText).join("\n\n");
  return text.length <= maxLength ? text : `${text.slice(0, maxLength)}...`;
}
