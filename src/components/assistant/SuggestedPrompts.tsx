import { SUGGESTED_PROMPTS, type SuggestedPrompt } from "../../data/assistantPrompts";
import { cn } from "../../utils/cn";

export function SuggestedPrompts({
  hasChallenge,
  disabled,
  layout,
  onPick,
}: {
  hasChallenge: boolean;
  disabled: boolean;
  /** "wrap": centred and larger (empty chat). "scroll": one compact row above the input. */
  layout: "wrap" | "scroll";
  onPick: (prompt: SuggestedPrompt) => void;
}) {
  // "Why is my answer incorrect" only makes sense next to a challenge.
  const prompts = SUGGESTED_PROMPTS.filter((prompt) => hasChallenge || prompt.id !== "incorrect");

  return (
    <div
      role="group"
      aria-label="Suggested questions"
      className={cn(
        layout === "wrap"
          ? "flex flex-wrap justify-center gap-2"
          : "flex gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none]"
      )}
    >
      {prompts.map((prompt) => (
        <button
          key={prompt.id}
          type="button"
          disabled={disabled}
          onClick={() => onPick(prompt)}
          className={cn(
            "rounded-full border border-line bg-surface font-medium transition duration-200 hover:border-ink hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-not-allowed disabled:opacity-50",
            layout === "wrap" ? "px-4 py-2 text-sm" : "shrink-0 px-3 py-1.5 text-[13px]"
          )}
        >
          {prompt.label}
        </button>
      ))}
    </div>
  );
}
