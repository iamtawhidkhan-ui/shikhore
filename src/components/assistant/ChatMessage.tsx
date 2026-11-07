import { Sparkles } from "lucide-react";
import type { ChatMessage as ChatMessageType } from "../../types/assistant";
import { cn } from "../../utils/cn";
import { MessageContent } from "./MessageContent";

export function ChatMessageView({ message }: { message: ChatMessageType }) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex gap-3", isUser && "flex-row-reverse")}>
      {!isUser && (
        <span
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ink text-lime"
          aria-hidden
        >
          <Sparkles className="size-4" />
        </span>
      )}
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3 sm:max-w-[75%]",
          isUser
            ? "rounded-tr-sm bg-lime text-ink"
            : "rounded-tl-sm border border-line bg-surface"
        )}
      >
        <p className="sr-only">{isUser ? "You said:" : "Usha said:"}</p>
        {isUser ? (
          <p className="whitespace-pre-wrap text-sm leading-6">{message.content}</p>
        ) : (
          <MessageContent text={message.content} />
        )}
      </div>
    </div>
  );
}
