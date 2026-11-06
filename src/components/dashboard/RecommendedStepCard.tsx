import { Target } from "lucide-react";
import type { StepInfo } from "../../utils/learning";
import { Badge } from "../common/Badge";
import { ButtonLink } from "../common/Button";
import { Card } from "../common/Card";

export function RecommendedStepCard({
  step,
  reason,
  className,
}: {
  step: StepInfo;
  reason: string;
  className?: string;
}) {
  const label =
    step.kind === "challenge" ? "Try the challenge" : step.kind === "lesson" ? "Open lesson" : "View path";

  return (
    <Card className={`flex flex-col ${className ?? ""}`}>
      <div className="flex items-center gap-2 text-sm font-semibold">
        <Target className="size-4" aria-hidden />
        Recommended next step
      </div>
      <div className="mt-3">
        <Badge tone={step.kind === "challenge" ? "accent" : "lime"}>
          {step.kind === "challenge" ? "Challenge" : step.kind === "lesson" ? "Lesson" : "Complete"}
        </Badge>
        <h3 className="mt-2 font-semibold">{step.title}</h3>
        <p className="mt-1 text-sm text-muted">{reason}</p>
      </div>
      <div className="mt-auto pt-4">
        <ButtonLink to={step.to} variant="secondary" size="sm">
          {label}
        </ButtonLink>
      </div>
    </Card>
  );
}
