import { CircleAlert, CircleCheck, Send } from "lucide-react";
import type { ChangeEvent } from "react";
import { cn } from "../../utils/cn";
import { MAX_SUBMISSION_LENGTH } from "../../utils/progress";
import { Button } from "../common/Button";
import { Card } from "../common/Card";

export function AnswerEditor({
  value,
  onChange,
  onSubmit,
  error,
  notice,
}: {
  value: string;
  onChange: (next: string) => void;
  onSubmit: () => void;
  error: string | null;
  notice: string | null;
}) {
  const tooLong = value.length > MAX_SUBMISSION_LENGTH;

  return (
    <Card className="p-6">
      <label htmlFor="answer" className="font-semibold">
        Your answer
      </label>
      <p className="mt-1 text-sm text-muted">
        Write or paste your work and explanation. Each submit is saved as a new attempt.
      </p>

      <textarea
        id="answer"
        value={value}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onChange(event.target.value)}
        rows={12}
        spellCheck={false}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "answer-error" : undefined}
        placeholder="Paste your code and write a short explanation here..."
        className={cn(
          "mt-3 w-full resize-y rounded-lg border bg-surface p-3 font-mono text-sm leading-6 outline-none transition duration-200 focus:border-ink focus:ring-2 focus:ring-lime",
          error ? "border-red-500" : "border-line"
        )}
      />

      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <span className={cn("text-xs", tooLong ? "font-semibold text-red-700" : "text-muted")}>
          {value.length} / {MAX_SUBMISSION_LENGTH} characters
        </span>
        <Button onClick={onSubmit}>
          <Send className="size-4" aria-hidden />
          Submit answer
        </Button>
      </div>

      {error && (
        <p id="answer-error" role="alert" className="mt-3 flex items-start gap-2 text-sm text-red-700">
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
          {error}
        </p>
      )}
      {notice && !error && (
        <p role="status" className="mt-3 flex items-start gap-2 text-sm text-success">
          <CircleCheck className="mt-0.5 size-4 shrink-0" aria-hidden />
          {notice}
        </p>
      )}
    </Card>
  );
}
