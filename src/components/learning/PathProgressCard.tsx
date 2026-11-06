import type { LearningPath } from "../../types/learning";
import type { LearnerProgress } from "../../types/progress";
import { DIFFICULTY_LABELS, difficultyTone, formatHours } from "../../utils/labels";
import { describeStep, hasStartedPath } from "../../utils/learning";
import { calcPathProgress, getRecommendedNextStep } from "../../utils/progress";
import { Badge } from "../common/Badge";
import { ButtonLink } from "../common/Button";
import { Card } from "../common/Card";
import { ProgressBar } from "../common/ProgressBar";

/** A path the learner can work on, with real progress and a clear next action. */
export function PathProgressCard({
  path,
  progress,
}: {
  path: LearningPath;
  progress: LearnerProgress;
}) {
  const stats = calcPathProgress(path, progress);
  const next = describeStep(path, getRecommendedNextStep(path, progress));
  const started = hasStartedPath(path, progress);
  const complete = next.kind === "path-complete";

  return (
    <Card>
      <div className="flex flex-wrap items-center gap-2">
        <Badge>{path.category}</Badge>
        <Badge tone={difficultyTone(path.difficulty)}>
          {DIFFICULTY_LABELS[path.difficulty]}
        </Badge>
        <span className="text-xs text-muted">{formatHours(path.estimatedHours)}</span>
      </div>

      <h2 className="mt-3 text-lg font-semibold">{path.title}</h2>

      <ProgressBar
        className="mt-4"
        value={stats.overallProgress}
        label={complete ? "Path complete" : started ? "In progress" : "Not started"}
        showValue
      />
      <p className="mt-2 text-sm text-muted">
        {stats.completedLessons}/{stats.totalLessons} lessons ·{" "}
        {stats.completedChallenges}/{stats.totalChallenges} challenges
      </p>

      <div className="mt-4 rounded-lg bg-warm-white p-3 text-sm">
        <span className="text-muted">{complete ? "Status: " : "Up next: "}</span>
        <span className="font-medium">{next.title}</span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <ButtonLink to={complete ? `/paths/${path.id}` : next.to}>
          {complete ? "Review path" : started ? "Continue learning" : "Start learning"}
        </ButtonLink>
        <ButtonLink to={`/paths/${path.id}`} variant="secondary">
          View curriculum
        </ButtonLink>
      </div>
    </Card>
  );
}
