import { cn } from "../../utils/cn";

type Group =
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] };

function groupLines(text: string): Group[] {
  const groups: Group[] = [];
  let paragraph: string[] = [];
  const flush = () => {
    if (paragraph.length > 0) {
      groups.push({ kind: "p", text: paragraph.join("\n") });
      paragraph = [];
    }
  };

  for (const rawLine of text.split("\n")) {
    const line = rawLine.trimEnd();
    const bullet = /^\s*[-*]\s+(.*)$/.exec(line);
    const numbered = /^\s*\d+[.)]\s+(.*)$/.exec(line);

    if (bullet) {
      flush();
      const last = groups[groups.length - 1];
      if (last && last.kind === "ul") last.items.push(bullet[1]);
      else groups.push({ kind: "ul", items: [bullet[1]] });
    } else if (numbered) {
      flush();
      const last = groups[groups.length - 1];
      if (last && last.kind === "ol") last.items.push(numbered[1]);
      else groups.push({ kind: "ol", items: [numbered[1]] });
    } else if (line.trim() === "") {
      flush();
    } else {
      paragraph.push(line);
    }
  }
  flush();
  return groups;
}

/** **bold** and `code`, rendered as real elements (never raw HTML). */
function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*\n]+\*\*|`[^`\n]+`)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.length > 4 && part.startsWith("**") && part.endsWith("**")) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        if (part.length > 2 && part.startsWith("`") && part.endsWith("`")) {
          return (
            <code key={index} className="rounded bg-ink/10 px-1 py-0.5 font-mono text-[0.85em]">
              {part.slice(1, -1)}
            </code>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

function CodeBlock({ segment }: { segment: string }) {
  const match = /^([\w+#.-]*)\n([\s\S]*)$/.exec(segment);
  const language = match ? match[1] : "";
  const code = (match ? match[2] : segment).replace(/\n$/, "");
  return (
    <div className="my-2 overflow-hidden rounded-lg bg-ink">
      {language && (
        <div className="px-3 pt-2 text-[11px] uppercase tracking-wide text-white/50">{language}</div>
      )}
      <pre tabIndex={0} className="overflow-x-auto px-3 pb-3 pt-2 text-xs leading-5 text-white">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function MessageContent({ text, className }: { text: string; className?: string }) {
  const segments = text.split("```");
  return (
    <div className={cn("space-y-2 text-sm leading-6", className)}>
      {segments.map((segment, index) => {
        if (index % 2 === 1) return <CodeBlock key={index} segment={segment} />;
        return groupLines(segment).map((group, groupIndex) => {
          const key = `${index}-${groupIndex}`;
          if (group.kind === "p") {
            return (
              <p key={key} className="whitespace-pre-wrap">
                <Inline text={group.text} />
              </p>
            );
          }
          const Tag = group.kind === "ul" ? "ul" : "ol";
          return (
            <Tag
              key={key}
              className={cn("space-y-1 pl-5", group.kind === "ul" ? "list-disc" : "list-decimal")}
            >
              {group.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <Inline text={item} />
                </li>
              ))}
            </Tag>
          );
        });
      })}
    </div>
  );
}
