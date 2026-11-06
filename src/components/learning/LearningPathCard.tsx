import { BookOpen, Check, Clock } from "lucide-react";
import type { LearningPath } from "../../types/learning";
import {
  DIFFICULTY_LABELS,
  difficultyTone,
  formatHours,
} from "../../utils/labels";
import { getLessonCount } from "../../data/learningPaths";
import { Badge } from "../common/Badge";
import { Button, ButtonLink } from "../common/Button";
import { Card } from "../common/Card";
import { ProgressBar } from "../common/ProgressBar";

export function LearningPathCard({
  path,
  progressPercent = 0,
}: {
  path: LearningPath;
  /** Overall progress, shown only for available paths that were started. */
  progressPercent?: number;
}) {
  const available = path.status === "available";
  const lessonCount = getLessonCount(path);

  return (
    <Card className="flex h-full flex-col transition duration-200 hover:shadow-md">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="neutral">{path.category}</Badge>
        <Badge tone={difficultyTone(path.difficulty)}>
          {DIFFICULTY_LABELS[path.difficulty]}
        </Badge>
        {!available && <Badge tone="lime">Coming soon</Badge>}
      </div>

      <h2 className="mt-3 text-lg font-semibold leading-snug">{path.title}</h2>
      <p className="mt-1 text-sm text-muted">{path.description}</p>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="size-4" aria-hidden />
          {formatHours(path.estimatedHours)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <BookOpen className="size-4" aria-hidden />
          {lessonCount} {lessonCount === 1 ? "lesson" : "lessons"}
        </span>
      </div>

      <ul className="mt-4 space-y-1.5 text-sm">
        {path.outcomes.slice(0, 3).map((outcome) => (
          <li key={outcome} className="flex items-start gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
            <span>{outcome}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-5">
        {available && progressPercent > 0 && (
          <ProgressBar
            className="mb-4"
            value={progressPercent}
            label="Your progress"
            showValue
          />
        )}
        {available ? (
          <ButtonLink to={`/paths/${path.id}`} variant="primary" className="w-full">
            View path
          </ButtonLink>
        ) : (
          <Button variant="secondary" className="w-full" disabled>
            Coming soon
          </Button>
        )}
      </div>
    </Card>
  );
}
