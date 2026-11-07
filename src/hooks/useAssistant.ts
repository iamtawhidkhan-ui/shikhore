import { useCallback, useRef, useState } from "react";
import { askUsha, UshaError } from "../services/aiService";
import type { AssistantContext, ChatMessage } from "../types/assistant";
import { clearChat, loadChat, saveChat } from "../utils/chatStorage";
import { nowIso } from "../utils/date";
import { createId } from "../utils/progress";

export type AssistantStatus = "idle" | "loading" | "error";

interface PendingRequest {
  message: string;
  context: AssistantContext;
  history: Array<{ role: ChatMessage["role"]; content: string }>;
}

const HISTORY_LIMIT = 10;

function toHistory(messages: ChatMessage[]): PendingRequest["history"] {
  return messages
    .slice(-HISTORY_LIMIT)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));
}

function createMessage(role: ChatMessage["role"], content: string): ChatMessage {
  return { id: createId("msg"), role, content, createdAt: nowIso() };
}

/**
 * Chat state for Usha. A failed request never removes earlier messages:
 * the learner's question stays visible and "Try again" re-sends it.
 */
export function useAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>(loadChat);
  const [status, setStatus] = useState<AssistantStatus>("idle");
  const [error, setError] = useState<{ message: string; retryable: boolean } | null>(null);

  const messagesRef = useRef<ChatMessage[]>(messages);
  const busyRef = useRef(false);
  const requestIdRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);
  const pendingRef = useRef<PendingRequest | null>(null);

  const commit = useCallback((next: ChatMessage[]) => {
    messagesRef.current = next;
    setMessages(next);
    saveChat(next);
  }, []);

  /** Sends one request. Resolves with Usha's answer, or undefined on failure. */
  const run = useCallback(
    async (request: PendingRequest): Promise<string | undefined> => {
      pendingRef.current = request;
      busyRef.current = true;
      setStatus("loading");
      setError(null);

      const id = ++requestIdRef.current;
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const response = await askUsha(
          {
            message: request.message,
            context: request.context,
            conversationHistory: request.history,
          },
          controller.signal
        );
        if (id !== requestIdRef.current) return undefined; // cleared or replaced
        commit([...messagesRef.current, createMessage("assistant", response.answer)]);
        pendingRef.current = null;
        busyRef.current = false;
        setStatus("idle");
        return response.answer;
      } catch (caught) {
        if (id !== requestIdRef.current) return undefined;
        busyRef.current = false;
        setStatus("error");
        if (caught instanceof UshaError) {
          setError({ message: caught.message, retryable: caught.retryable });
        } else {
          setError({ message: "Something went wrong. Please try again.", retryable: true });
        }
        return undefined;
      }
    },
    [commit]
  );

  const send = useCallback(
    async (text: string, context: AssistantContext): Promise<string | undefined> => {
      const message = text.trim();
      if (!message || busyRef.current) return undefined;

      const history = toHistory(messagesRef.current);
      commit([...messagesRef.current, createMessage("user", message)]);
      return run({ message, context, history });
    },
    [commit, run]
  );

  const retry = useCallback(async (): Promise<string | undefined> => {
    const pending = pendingRef.current;
    if (!pending || busyRef.current) return undefined;
    return run(pending);
  }, [run]);

  const clear = useCallback(() => {
    requestIdRef.current += 1; // ignore any answer still on its way
    abortRef.current?.abort();
    pendingRef.current = null;
    busyRef.current = false;
    messagesRef.current = [];
    setMessages([]);
    clearChat();
    setStatus("idle");
    setError(null);
  }, []);

  return { messages, status, error, send, retry, clear };
}
