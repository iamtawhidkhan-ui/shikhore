import { SUGGESTED_PROMPTS, type SuggestedPrompt } from "../../data/assistantPrompts";

export function SuggestedPrompts({
  hasChallenge,
  disabled,
  onPick,
}: {
  hasChallenge: boolean;
  disabled: boolean;
  onPick: (prompt: SuggestedPrompt) => void;
}) {
  // "Why is my answer incorrect" only makes sense next to a challenge.
  const prompts = SUGGESTED_PROMPTS.filter((prompt) => hasChallenge || prompt.id !== "incorrect");

  return (
    <div role="group" aria-label="Suggested questions" className="flex gap-2 overflow-x-auto pb-1">
      {prompts.map((prompt) => (
        <button
          key={prompt.id}
          type="button"
          disabled={disabled}
          onClick={() => onPick(prompt)}
          className="shrink-0 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-medium transition duration-200 hover:border-ink hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-not-allowed disabled:opacity-50"
        >
          {prompt.label}
        </button>
      ))}
    </div>
  );
}
