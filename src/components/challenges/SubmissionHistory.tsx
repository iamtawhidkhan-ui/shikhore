import { History } from "lucide-react";
import type { Submission } from "../../types/challenge";
import { formatDateTime } from "../../utils/date";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";
import { Card } from "../common/Card";

const STATUS_LABEL: Record<Submission["status"], string> = {
  submitted: "Submitted",
  reviewed: "Feedback received",
  completed: "Completed",
};

export function SubmissionHistory({
  submissions,
  onReuse,
}: {
  /** Newest first. */
  submissions: Submission[];
  onReuse: (answer: string) => void;
}) {
  return (
    <Card className="p-6">
      <h2 className="flex items-center gap-2 font-semibold">
        <History className="size-4" aria-hidden />
        Previous attempts
      </h2>

      {submissions.length === 0 ? (
        <p className="mt-2 text-sm text-muted">
          Your attempts will be listed here, so you can see how your work improves.
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {submissions.map((submission, index) => (
            <li key={submission.id} className="rounded-lg border border-line">
              <details>
                <summary className="flex cursor-pointer flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm">
                  <span className="font-medium">
                    Attempt {submissions.length - index}
                    <span className="ml-2 font-normal text-muted">
                      {formatDateTime(submission.submittedAt)}
                    </span>
                  </span>
                  <Badge tone={submission.status === "completed" ? "success" : "neutral"}>
                    {STATUS_LABEL[submission.status]}
                  </Badge>
                </summary>
                <div className="space-y-3 border-t border-line px-4 py-3">
                  <pre className="max-h-64 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-warm-white p-3 font-mono text-xs leading-5">
                    {submission.answer}
                  </pre>
                  {submission.feedback && (
                    <div className="rounded-lg bg-lime/20 p-3 text-sm">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                        Feedback
                      </p>
                      <p className="mt-1 whitespace-pre-wrap leading-6">{submission.feedback}</p>
                    </div>
                  )}
                  <Button variant="secondary" size="sm" onClick={() => onReuse(submission.answer)}>
                    Use as starting point
                  </Button>
                </div>
              </details>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
