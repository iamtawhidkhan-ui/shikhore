import { ArrowLeft, BookOpen, Check, Clock, SearchX } from "lucide-react";
import { useParams } from "react-router-dom";
import { Badge } from "../components/common/Badge";
import { ButtonLink } from "../components/common/Button";
import { Card } from "../components/common/Card";
import { EmptyState } from "../components/common/EmptyState";
import { ProgressBar } from "../components/common/ProgressBar";
import { CurriculumList } from "../components/learning/CurriculumList";
import { FinalProjectCard } from "../components/learning/FinalProjectCard";
import { getLessonCount, getPathById } from "../data/learningPaths";
import { useProgress } from "../hooks/useProgress";
import {
  DIFFICULTY_LABELS,
  difficultyTone,
  formatHours,
} from "../utils/labels";
import { describeStep, hasStartedPath, lessonUrl } from "../utils/learning";
import { calcPathProgress, getRecommendedNextStep } from "../utils/progress";

export default function LearningPathPage() {
  const { pathId } = useParams();
  const { progress } = useProgress();
  const path = pathId ? getPathById(pathId) : undefined;

  if (!path) {
    return (
      <EmptyState
        icon={SearchX}
        title="Learning path not found"
        description="This path does not exist or the link is out of date."
        action={<ButtonLink to="/explore">Browse learning paths</ButtonLink>}
      />
    );
  }

  const available = path.status === "available";
  const stats = calcPathProgress(path, progress);
  const next = describeStep(path, getRecommendedNextStep(path, progress));
  const started = hasStartedPath(path, progress);
  const complete = next.kind === "path-complete";

  const ctaLabel = complete ? "Review the path" : started ? "Continue learning" : "Start learning";
  const ctaTarget = complete ? lessonUrl(path.id, path.lessonIds[0]) : next.to;

  return (
    <>
      <ButtonLink to="/explore" variant="ghost" size="sm" className="-ml-3 mb-4">
        <ArrowLeft className="size-4" aria-hidden />
        Back to Explore
      </ButtonLink>

      <Card className="p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{path.category}</Badge>
          <Badge tone={difficultyTone(path.difficulty)}>
            {DIFFICULTY_LABELS[path.difficulty]}
          </Badge>
          {!available && <Badge tone="lime">Coming soon</Badge>}
        </div>
        <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{path.title}</h1>
        <p className="mt-2 max-w-2xl text-muted">{path.description}</p>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-4" aria-hidden />
            {formatHours(path.estimatedHours)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BookOpen className="size-4" aria-hidden />
            {getLessonCount(path)} lessons
            {available && ` · ${path.challengeIds.length} challenges · 1 final project`}
          </span>
        </div>

        {available ? (
          <div className="mt-6 max-w-xl">
            <ProgressBar
              value={stats.overallProgress}
              label="Overall progress"
              showValue
            />
            <p className="mt-2 text-sm text-muted">
              {stats.completedLessons}/{stats.totalLessons} lessons ·{" "}
              {stats.completedChallenges}/{stats.totalChallenges} challenges
            </p>
            <ButtonLink to={ctaTarget} size="lg" className="mt-5">
              {ctaLabel}
            </ButtonLink>
          </div>
        ) : (
          <p className="mt-6 rounded-lg bg-lime/20 p-4 text-sm">
            This path is on its way. The lessons and challenges are not ready yet,
            so check back soon.
          </p>
        )}
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {available && (
            <>
              <CurriculumList path={path} progress={progress} />
              <FinalProjectCard />
            </>
          )}
        </div>
        <aside className={available ? "" : "lg:col-span-3"}>
          <Card>
            <h2 className="font-semibold">What you will learn</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {path.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </Card>
        </aside>
      </div>
    </>
  );
}
