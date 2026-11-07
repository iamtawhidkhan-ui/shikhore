import type { ChatMessage } from "../types/assistant";

export const CHAT_STORAGE_KEY = "shikhore-usha-chat-v1";
const MAX_STORED_MESSAGES = 40;

function isMessage(value: unknown): value is ChatMessage {
  if (typeof value !== "object" || value === null) return false;
  const m = value as Record<string, unknown>;
  return (
    typeof m.id === "string" &&
    (m.role === "user" || m.role === "assistant") &&
    typeof m.content === "string" &&
    typeof m.createdAt === "string"
  );
}

/** Never throws. Anything unreadable becomes an empty conversation. */
export function loadChat(): ChatMessage[] {
  try {
    const raw = sessionStorage.getItem(CHAT_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isMessage).slice(-MAX_STORED_MESSAGES);
  } catch {
    return [];
  }
}

export function saveChat(messages: ChatMessage[]): void {
  try {
    sessionStorage.setItem(
      CHAT_STORAGE_KEY,
      JSON.stringify(messages.slice(-MAX_STORED_MESSAGES))
    );
  } catch {
    // Storage full or blocked: the chat still works for this visit.
  }
}

export function clearChat(): void {
  try {
    sessionStorage.removeItem(CHAT_STORAGE_KEY);
  } catch {
    // Nothing to do.
  }
}
