import { MessageSquareText, Sparkles } from "lucide-react";
import type { Submission } from "../../types/challenge";
import { ButtonLink } from "../common/Button";
import { Card } from "../common/Card";

export function FeedbackPanel({
  latest,
  feedbackHref,
}: {
  /** The most recent attempt, if any. */
  latest?: Submission;
  feedbackHref: string;
}) {
  return (
    <Card className="p-6">
      <h2 className="flex items-center gap-2 font-semibold">
        <MessageSquareText className="size-4" aria-hidden />
        Feedback
      </h2>

      {!latest ? (
        <p className="mt-2 text-sm text-muted">
          Submit an answer first. Then you can ask Usha for feedback on it.
        </p>
      ) : latest.feedback ? (
        <>
          <p className="mt-2 text-xs text-muted">On your latest attempt</p>
          <p className="mt-1 whitespace-pre-wrap text-sm leading-6">{latest.feedback}</p>
          <ButtonLink to={feedbackHref} variant="secondary" size="sm" className="mt-4">
            <Sparkles className="size-3.5" aria-hidden />
            Ask Usha again
          </ButtonLink>
        </>
      ) : (
        <>
          <p className="mt-2 text-sm text-muted">
            No feedback on your latest attempt yet. Usha can point out what works and what
            to improve, without simply handing you the answer.
          </p>
          <ButtonLink to={feedbackHref} size="sm" className="mt-4">
            <Sparkles className="size-3.5" aria-hidden />
            Ask Usha for feedback
          </ButtonLink>
        </>
      )}
    </Card>
  );
}
