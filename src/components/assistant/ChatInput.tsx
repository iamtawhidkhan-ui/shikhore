import { SendHorizontal } from "lucide-react";
import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import { cn } from "../../utils/cn";
import { Button } from "../common/Button";

const MAX_LENGTH = 2000;

export function ChatInput({
  disabled,
  onSend,
}: {
  disabled: boolean;
  onSend: (text: string) => void;
}) {
  const [text, setText] = useState("");
  const tooLong = text.length > MAX_LENGTH;
  const canSend = !disabled && text.trim().length > 0 && !tooLong;

  function submit() {
    if (!canSend) return;
    onSend(text);
    setText("");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      submit();
    }
  }

  return (
    <div>
      <div className="flex items-end gap-2">
        <label htmlFor="usha-input" className="sr-only">
          Ask Usha a question
        </label>
        <textarea
          id="usha-input"
          value={text}
          rows={2}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setText(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Usha anything about your learning..."
          className={cn(
            "min-h-12 flex-1 resize-none rounded-lg border bg-surface px-3.5 py-2.5 text-sm outline-none transition duration-200 focus:border-ink focus:ring-2 focus:ring-lime",
            tooLong ? "border-red-500" : "border-line"
          )}
        />
        <Button onClick={submit} disabled={!canSend} aria-label="Send message" className="h-12">
          <SendHorizontal className="size-4" aria-hidden />
          <span className="hidden sm:inline">Send</span>
        </Button>
      </div>
      <p className={cn("mt-1 text-xs", tooLong ? "font-semibold text-red-700" : "text-muted")}>
        {tooLong
          ? `Too long: ${text.length} / ${MAX_LENGTH} characters`
          : "Enter to send · Shift+Enter for a new line"}
      </p>
    </div>
  );
}
