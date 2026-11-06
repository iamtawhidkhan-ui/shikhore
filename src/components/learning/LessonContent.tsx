import { Lightbulb } from "lucide-react";
import type { ContentBlock } from "../../types/learning";

const NUMBERED = /^\d+\.\s/;

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "heading":
      return <h2 className="mt-8 text-xl font-semibold tracking-tight">{block.text}</h2>;

    case "paragraph":
      return <p className="mt-3 leading-7">{block.text}</p>;

    case "bulletList": {
      if (block.items.every((item) => NUMBERED.test(item))) {
        return (
          <ol className="mt-3 list-decimal space-y-2 pl-6 leading-7">
            {block.items.map((item) => (
              <li key={item}>{item.replace(NUMBERED, "")}</li>
            ))}
          </ol>
        );
      }
      return (
        <ul className="mt-3 list-disc space-y-2 pl-6 leading-7">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    }

    case "code":
      return (
        <div className="mt-4 overflow-hidden rounded-lg bg-ink">
          <div className="px-4 pt-2 text-xs uppercase tracking-wide text-white/50">
            {block.language}
          </div>
          <pre
            tabIndex={0}
            className="overflow-x-auto px-4 pb-4 pt-2 text-sm leading-6 text-white"
          >
            <code>{block.code}</code>
          </pre>
        </div>
      );

    case "callout":
      return (
        <aside className="mt-5 rounded-card border border-lime-dark/40 bg-lime/20 p-4">
          <p className="flex items-center gap-2 font-semibold">
            <Lightbulb className="size-4" aria-hidden />
            {block.title}
          </p>
          <p className="mt-1 text-sm leading-6">{block.text}</p>
        </aside>
      );
  }
}

export function LessonContent({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div>
      {blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </div>
  );
}
