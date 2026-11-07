import { useCallback, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { AssistantPanel } from "../components/assistant/AssistantPanel";
import { AUTO_MESSAGES, type SuggestedPrompt } from "../data/assistantPrompts";
import { useAssistant } from "../hooks/useAssistant";
import { useProgress } from "../hooks/useProgress";
import { buildAssistantContext } from "../utils/assistantContext";
import { parseAssistantParams, type QuestionType } from "../utils/assistantLinks";

export default function AssistantPage() {
  const [params, setParams] = useSearchParams();
  const { progress, saveSubmissionFeedback } = useProgress();
  const assistant = useAssistant();
  const { send, retry, clear } = assistant;

  const options = useMemo(() => parseAssistantParams(params), [params]);
  const built = useMemo(() => buildAssistantContext(options, progress), [options, progress]);
  const { context, label, targetSubmissionId } = built;

  // Remembers what kind of question was last asked, so a retry behaves the same.
  const lastTypeRef = useRef<QuestionType>("general");

  const saveIfFeedback = useCallback(
    (answer: string | undefined, type: QuestionType) => {
      // Feedback on a challenge attempt is saved with that attempt.
      if (answer && type === "feedback" && targetSubmissionId) {
        saveSubmissionFeedback(targetSubmissionId, answer);
      }
    },
    [targetSubmissionId, saveSubmissionFeedback]
  );

  const handleSend = useCallback(
    async (text: string, type: QuestionType = "general") => {
      lastTypeRef.current = type;
      const answer = await send(text, { ...context, learnerQuestionType: type });
      saveIfFeedback(answer, type);
    },
    [send, context, saveIfFeedback]
  );

  const handleRetry = useCallback(async () => {
    saveIfFeedback(await retry(), lastTypeRef.current);
  }, [retry, saveIfFeedback]);

  // Arriving from "Ask Usha for a hint / feedback ..." sends that request once.
  const handledRef = useRef<string | null>(null);
  const autoKey = [options.lessonId, options.challengeId, options.submissionId, options.type].join("|");
  useEffect(() => {
    const type = options.type;
    const message = type ? AUTO_MESSAGES[type] : undefined;
    if (!type || !message || handledRef.current === autoKey) return;
    handledRef.current = autoKey;
    void handleSend(message, type);
    setParams(
      (previous: URLSearchParams) => {
        const next = new URLSearchParams(previous);
        next.delete("type");
        next.delete("submissionId");
        return next;
      },
      { replace: true }
    );
  }, [autoKey, options.type, handleSend, setParams]);

  function handlePrompt(prompt: SuggestedPrompt) {
    void handleSend(prompt.message, prompt.type);
  }

  function clearContext() {
    setParams({}, { replace: true });
  }

  return (
    <AssistantPanel
      messages={assistant.messages}
      status={assistant.status}
      error={assistant.error}
      contextLabel={label}
      hasChallenge={Boolean(context.challengeId)}
      onSend={(text) => void handleSend(text)}
      onPrompt={handlePrompt}
      onRetry={() => void handleRetry()}
      onClear={clear}
      onClearContext={clearContext}
    />
  );
}
