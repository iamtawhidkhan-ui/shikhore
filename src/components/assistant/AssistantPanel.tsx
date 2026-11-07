import { Sparkles, Trash2, X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { SuggestedPrompt } from "../../data/assistantPrompts";
import type { AssistantStatus } from "../../hooks/useAssistant";
import type { ChatMessage } from "../../types/assistant";
import { Button } from "../common/Button";
import { ErrorMessage } from "../common/ErrorMessage";
import { ChatInput } from "./ChatInput";
import { ChatMessageView } from "./ChatMessage";
import { SuggestedPrompts } from "./SuggestedPrompts";

export function AssistantPanel({
  messages,
  status,
  error,
  contextLabel,
  hasChallenge,
  onSend,
  onPrompt,
  onRetry,
  onClear,
  onClearContext,
}: {
  messages: ChatMessage[];
  status: AssistantStatus;
  error: { message: string; retryable: boolean } | null;
  contextLabel?: string;
  hasChallenge: boolean;
  onSend: (text: string) => void;
  onPrompt: (prompt: SuggestedPrompt) => void;
  onRetry: () => void;
  onClear: () => void;
  onClearContext: () => void;
}) {
  const endRef = useRef<HTMLDivElement>(null);
  const loading = status === "loading";

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length, status]);

  return (
    <section
      aria-label="Chat with Usha"
      className="flex h-[calc(100dvh-11.5rem)] min-h-[26rem] flex-col rounded-card border border-line bg-warm-white md:h-[calc(100dvh-8rem)]"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-surface px-4 py-3">
        <div className="flex min-w-0 items-center gap-2 text-sm">
          <span className="text-muted">Talking about:</span>
          {contextLabel ? (
            <span className="inline-flex min-w-0 items-center gap-1 rounded-full bg-lime/40 py-0.5 pl-3 pr-1 font-medium">
              <span className="truncate">{contextLabel}</span>
              <button
                type="button"
                onClick={onClearContext}
                aria-label="Remove this context"
                className="rounded-full p-1 hover:bg-ink/10"
              >
                <X className="size-3.5" aria-hidden />
              </button>
            </span>
          ) : (
            <span className="font-medium">Anything about your learning</span>
          )}
        </div>
        {messages.length > 0 && (
          <Button variant="ghost" size="sm" onClick={onClear}>
            <Trash2 className="size-4" aria-hidden />
            Clear conversation
          </Button>
        )}
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5" aria-live="polite">
        {messages.length === 0 && !loading && (
          <div className="mx-auto mt-6 max-w-md text-center">
            <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-ink text-lime">
              <Sparkles className="size-6" aria-hidden />
            </span>
            <h2 className="mt-3 text-lg font-semibold">Hi, I'm Usha</h2>
            <p className="mt-1 text-sm text-muted">
              Your learning companion. Ask me to explain an idea, give an example, nudge you
              with a hint, or look at your answer. I will guide you rather than just hand
              you the solution.
            </p>
          </div>
        )}

        {messages.map((message) => (
          <ChatMessageView key={message.id} message={message} />
        ))}

        {loading && (
          <div className="flex items-center gap-3" role="status">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ink text-lime">
              <Sparkles className="size-4" aria-hidden />
            </span>
            <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-line bg-surface px-4 py-3">
              <span className="sr-only">Usha is thinking</span>
              <span className="size-2 animate-bounce rounded-full bg-muted [animation-delay:-0.3s]" />
              <span className="size-2 animate-bounce rounded-full bg-muted [animation-delay:-0.15s]" />
              <span className="size-2 animate-bounce rounded-full bg-muted" />
            </div>
          </div>
        )}

        {error && (
          <ErrorMessage message={error.message} onRetry={error.retryable ? onRetry : undefined} />
        )}
        <div ref={endRef} />
      </div>

      <div className="space-y-3 border-t border-line bg-surface p-4">
        <SuggestedPrompts hasChallenge={hasChallenge} disabled={loading} onPick={onPrompt} />
        <ChatInput disabled={loading} onSend={onSend} />
      </div>
    </section>
  );
}
