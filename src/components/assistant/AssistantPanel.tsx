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

/**
 * A full-height chat: the top bar and the input stay put, only the
 * messages in the middle scroll.
 */
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const loading = status === "loading";
  const isEmpty = messages.length === 0 && !loading;

  // Scroll only the message list (never the page) to the newest message.
  useEffect(() => {
    const list = scrollRef.current;
    if (list) list.scrollTo({ top: list.scrollHeight, behavior: "smooth" });
  }, [messages.length, status]);

  return (
    <section aria-label="Chat with Usha" className="flex min-h-0 flex-1 flex-col bg-warm-white">
      <div className="border-b border-line bg-surface">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-2 px-4 py-2.5">
          <div className="flex min-w-0 items-center gap-2 text-sm">
            <span className="shrink-0 text-muted">Talking about:</span>
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
              <span className="truncate font-medium">Anything about learning</span>
            )}
          </div>
          {messages.length > 0 && (
            <Button variant="ghost" size="sm" onClick={onClear} aria-label="Clear conversation">
              <Trash2 className="size-4" aria-hidden />
              <span className="hidden sm:inline">Clear</span>
            </Button>
          )}
        </div>
      </div>

      <div
        ref={scrollRef}
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
        aria-live="polite"
      >
        <div className="mx-auto w-full max-w-3xl space-y-4 px-4 py-5">
          {isEmpty && (
            <div className="mx-auto mt-4 max-w-md text-center sm:mt-10">
              <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-ink text-lime">
                <Sparkles className="size-7" aria-hidden />
              </span>
              <h2 className="mt-4 text-xl font-semibold">Hi, I'm Usha</h2>
              <p className="mt-1.5 text-sm text-muted">
                Your learning companion. Ask me to explain an idea, give an example, nudge you
                with a hint, or look at your answer. I will guide you rather than just hand
                you the solution.
              </p>
              <div className="mt-6">
                <SuggestedPrompts
                  layout="wrap"
                  hasChallenge={hasChallenge}
                  disabled={loading}
                  onPick={onPrompt}
                />
              </div>
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
        </div>
      </div>

      <div className="border-t border-line bg-warm-white px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
        <div className="mx-auto w-full max-w-3xl space-y-2.5">
          {!isEmpty && (
            <SuggestedPrompts
              layout="scroll"
              hasChallenge={hasChallenge}
              disabled={loading}
              onPick={onPrompt}
            />
          )}
          <ChatInput disabled={loading} onSend={onSend} />
        </div>
      </div>
    </section>
  );
}
