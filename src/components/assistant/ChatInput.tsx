import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { cn } from "../../utils/cn";

const MAX_LENGTH = 2000;
const MAX_HEIGHT_PX = 160;

export function ChatInput({
  disabled,
  onSend,
}: {
  disabled: boolean;
  onSend: (text: string) => void;
}) {
  const [text, setText] = useState("");
  const areaRef = useRef<HTMLTextAreaElement>(null);
  const tooLong = text.length > MAX_LENGTH;
  const canSend = !disabled && text.trim().length > 0 && !tooLong;

  // Grows with the text (up to a limit), shrinks back after sending.
  useEffect(() => {
    const area = areaRef.current;
    if (!area) return;
    area.style.height = "auto";
    area.style.height = `${Math.min(area.scrollHeight, MAX_HEIGHT_PX)}px`;
  }, [text]);

  function submit() {
    if (!canSend) return;
    onSend(text);
    setText("");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    // On touch screens Enter makes a new line and the round button sends,
    // like other chat apps. On a keyboard, Enter sends and Shift+Enter is a new line.
    const touchScreen = window.matchMedia("(pointer: coarse)").matches;
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing && !touchScreen) {
      event.preventDefault();
      submit();
    }
  }

  return (
    <div>
      <div
        className={cn(
          "flex items-end gap-2 rounded-3xl border bg-surface py-1.5 pl-4 pr-1.5 shadow-sm transition duration-200 focus-within:ring-2 focus-within:ring-lime",
          tooLong ? "border-red-500" : "border-line focus-within:border-ink"
        )}
      >
        <label htmlFor="usha-input" className="sr-only">
          Ask Usha a question
        </label>
        <textarea
          id="usha-input"
          ref={areaRef}
          rows={1}
          value={text}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setText(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Usha anything..."
          className="max-h-40 min-h-10 flex-1 resize-none bg-transparent py-2 text-base leading-6 outline-none placeholder:text-muted md:text-sm"
        />
        <button
          type="button"
          onClick={submit}
          disabled={!canSend}
          aria-label="Send message"
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-full transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
            canSend ? "bg-lime text-ink hover:bg-lime-dark" : "bg-line text-muted"
          )}
        >
          <ArrowUp className="size-5" aria-hidden />
        </button>
      </div>
      {tooLong ? (
        <p className="mt-1.5 px-3 text-xs font-semibold text-red-700">
          Too long: {text.length} / {MAX_LENGTH} characters
        </p>
      ) : (
        <p className="mt-1.5 hidden px-3 text-xs text-muted md:block">
          Enter to send · Shift+Enter for a new line
        </p>
      )}
    </div>
  );
}
