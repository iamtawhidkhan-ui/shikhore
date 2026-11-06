import { Lightbulb, Sparkles } from "lucide-react";
import { ButtonLink, Button } from "../common/Button";
import { Card } from "../common/Card";

/** Hints appear one at a time, so learners try before they peek. */
export function HintsPanel({
  hints,
  shown,
  onShowNext,
  ushaHintHref,
}: {
  hints: string[];
  shown: number;
  onShowNext: () => void;
  ushaHintHref: string;
}) {
  return (
    <div className="space-y-4 lg:sticky lg:top-24">
      <Card>
        <h2 className="flex items-center gap-2 font-semibold">
          <Lightbulb className="size-4" aria-hidden />
          Helpful hints
        </h2>
        <p className="mt-1 text-sm text-muted">Try first, then reveal a hint if you need it.</p>

        {shown > 0 && (
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6">
            {hints.slice(0, shown).map((hint) => (
              <li key={hint}>{hint}</li>
            ))}
          </ol>
        )}

        {shown < hints.length ? (
          <Button variant="secondary" size="sm" className="mt-3" onClick={onShowNext}>
            {shown === 0 ? "Show a hint" : "Show another hint"}
          </Button>
        ) : (
          <p className="mt-3 text-xs text-muted">That is every hint for this challenge.</p>
        )}
      </Card>

      <Card className="bg-lime/20">
        <h2 className="flex items-center gap-2 font-semibold">
          <Sparkles className="size-4" aria-hidden />
          Still stuck?
        </h2>
        <p className="mt-1 text-sm text-ink/70">
          Usha can give you a nudge in the right direction.
        </p>
        <ButtonLink to={ushaHintHref} size="sm" className="mt-3">
          Ask Usha for a hint
        </ButtonLink>
      </Card>
    </div>
  );
}
