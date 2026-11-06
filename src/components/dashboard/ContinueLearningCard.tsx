import { ArrowRight } from "lucide-react";
import type { LearningPath } from "../../types/learning";
import type { StepInfo } from "../../utils/learning";
import type { PathProgress } from "../../utils/progress";
import { ButtonLink } from "../common/Button";
import { ProgressBar } from "../common/ProgressBar";

export function ContinueLearningCard({
  path,
  pathProgress,
  nextStep,
  started,
  className,
}: {
  path: LearningPath;
  pathProgress: PathProgress;
  nextStep: StepInfo;
  started: boolean;
  className?: string;
}) {
  const complete = nextStep.kind === "path-complete";
  const buttonLabel = complete
    ? "Review the path"
    : started
      ? "Continue learning"
      : "Start learning";

  return (
    <section
      aria-labelledby="continue-heading"
      className={`rounded-card bg-ink p-6 text-white ${className ?? ""}`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-lime">
        {started ? "Continue learning" : "Start here"}
      </p>
      <h2 id="continue-heading" className="mt-1 text-xl font-bold sm:text-2xl">
        {path.title}
      </h2>

      <div className="mt-4 rounded-lg bg-white/10 p-4">
        <p className="text-xs text-white/60">{complete ? "Status" : "Up next"}</p>
        <p className="font-semibold">{nextStep.title}</p>
        <p className="text-sm text-white/70">{nextStep.meta}</p>
      </div>

      <div className="mt-5">
        <div className="mb-1.5 flex justify-between text-xs text-white/70">
          <span>
            {pathProgress.completedLessons}/{pathProgress.totalLessons} lessons ·{" "}
            {pathProgress.completedChallenges}/{pathProgress.totalChallenges} challenges
          </span>
          <span>{pathProgress.overallProgress}%</span>
        </div>
        <ProgressBar
          value={pathProgress.overallProgress}
          ariaLabel={`${path.title} progress`}
        />
      </div>

      <ButtonLink
        to={complete ? `/paths/${path.id}` : nextStep.to}
        size="lg"
        className="mt-6"
      >
        {buttonLabel}
        <ArrowRight className="size-4" aria-hidden />
      </ButtonLink>
    </section>
  );
}
