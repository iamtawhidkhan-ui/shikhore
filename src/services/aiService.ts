import type { AssistantRequest, AssistantResponse } from "../types/assistant";

const CLIENT_TIMEOUT_MS = 30_000;

/** A friendly, displayable problem. `retryable` tells the UI to offer "Try again". */
export class UshaError extends Error {
  code: string;
  status: number | undefined;
  retryable: boolean;

  constructor(message: string, code: string, status?: number) {
    super(message);
    this.name = "UshaError";
    this.code = code;
    this.status = status;
    this.retryable = status !== 400 && status !== 413;
  }
}

function readError(data: unknown): { code?: string; message?: string } {
  if (typeof data !== "object" || data === null) return {};
  const error = (data as { error?: unknown }).error;
  if (typeof error !== "object" || error === null) return {};
  const { code, message } = error as { code?: unknown; message?: unknown };
  return {
    code: typeof code === "string" ? code : undefined,
    message: typeof message === "string" ? message : undefined,
  };
}

/**
 * Sends a question to Usha through OUR server endpoint (never to Gemini
 * directly, so no key is ever in the browser).
 */
export async function askUsha(
  payload: AssistantRequest,
  signal?: AbortSignal
): Promise<AssistantResponse> {
  const controller = new AbortController();
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, CLIENT_TIMEOUT_MS);
  const onCallerAbort = () => controller.abort();
  signal?.addEventListener("abort", onCallerAbort);

  let response: Response;
  try {
    response = await fetch("/api/assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } catch (error) {
    if (signal?.aborted) throw error; // the caller cancelled on purpose
    if (timedOut) {
      throw new UshaError("Usha took too long to answer. Please try again.", "TIMEOUT");
    }
    throw new UshaError(
      "Could not reach Usha. Check your connection and try again.",
      "NETWORK"
    );
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", onCallerAbort);
  }

  let data: unknown = null;
  try {
    data = await response.json();
  } catch {
    // Not JSON (for example an HTML error page): handled below.
  }

  if (!response.ok) {
    const { code, message } = readError(data);
    const fallback =
      response.status === 404
        ? "Usha is not set up on this server yet."
        : response.status === 429
          ? "Usha is busy right now. Please wait a moment and try again."
          : "Usha is temporarily unavailable. Please try again.";
    throw new UshaError(message ?? fallback, code ?? "HTTP_ERROR", response.status);
  }

  const answer = (data as { answer?: unknown } | null)?.answer;
  if (typeof answer !== "string" || answer.trim() === "") {
    throw new UshaError("Usha sent an unexpected reply. Please try again.", "BAD_RESPONSE");
  }
  const requestId = (data as { requestId?: unknown }).requestId;
  return { answer, requestId: typeof requestId === "string" ? requestId : undefined };
}
