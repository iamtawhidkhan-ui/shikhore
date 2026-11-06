import { Circle, CircleCheck, CirclePlay } from "lucide-react";
import { Link } from "react-router-dom";
import { getChallengesForPath } from "../../data/challenges";
import { getLessonsForPath } from "../../data/lessons";
import type { LearningPath } from "../../types/learning";
import type { LearnerProgress } from "../../types/progress";
import { cn } from "../../utils/cn";
import { DIFFICULTY_LABELS, formatMinutes } from "../../utils/labels";
import { challengeUrl, lessonUrl } from "../../utils/learning";
import {
  getChallengeStatus,
  getLessonStatus,
  type ItemStatus,
} from "../../utils/progress";
import { Card } from "../common/Card";

const STATUS_TEXT: Record<ItemStatus, string> = {
  completed: "Completed",
  current: "Up next",
  "not-started": "Not started",
};

function StatusIcon({ status }: { status: ItemStatus }) {
  if (status === "completed") {
    return <CircleCheck className="size-5 text-success" aria-hidden />;
  }
  if (status === "current") {
    return <CirclePlay className="size-5 text-ink" aria-hidden />;
  }
  return <Circle className="size-5 text-muted" aria-hidden />;
}

function Row({
  to,
  title,
  meta,
  status,
  statusText,
}: {
  to: string;
  title: string;
  meta: string;
  status: ItemStatus;
  statusText: string;
}) {
  return (
    <li>
      <Link
        to={to}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-3 transition duration-200 hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
          status === "current" && "bg-lime/20"
        )}
      >
        <StatusIcon status={status} />
        <span className="min-w-0 flex-1">
          <span className="block truncate font-medium">{title}</span>
          <span className="block text-sm text-muted">{meta}</span>
        </span>
        <span
          className={cn(
            "shrink-0 text-xs font-medium",
            status === "completed" ? "text-success" : "text-muted"
          )}
        >
          {statusText}
        </span>
      </Link>
    </li>
  );
}

/** Lessons and challenges of a path with completed / current / not-started states. */
export function CurriculumList({
  path,
  progress,
}: {
  path: LearningPath;
  progress: LearnerProgress;
}) {
  const lessons = getLessonsForPath(path.id);
  const challenges = getChallengesForPath(path.id);

  return (
    <div className="space-y-6">
      <Card className="p-3 sm:p-4">
        <h2 className="px-3 pb-2 pt-1 font-semibold">Lessons</h2>
        <ul>
          {lessons.map((lesson) => {
            const status = getLessonStatus(path, progress, lesson.id);
            return (
              <Row
                key={lesson.id}
                to={lessonUrl(path.id, lesson.id)}
                title={`${lesson.order}. ${lesson.title}`}
                meta={formatMinutes(lesson.estimatedMinutes)}
                status={status}
                statusText={STATUS_TEXT[status]}
              />
            );
          })}
        </ul>
      </Card>

      <Card className="p-3 sm:p-4">
        <h2 className="px-3 pb-2 pt-1 font-semibold">Practical challenges</h2>
        <ul>
          {challenges.map((challenge) => {
            const status = getChallengeStatus(progress, challenge.id);
            return (
              <Row
                key={challenge.id}
                to={challengeUrl(challenge.id)}
                title={challenge.title}
                meta={`Challenge · ${DIFFICULTY_LABELS[challenge.difficulty]}`}
                status={status}
                statusText={status === "current" ? "In progress" : STATUS_TEXT[status]}
              />
            );
          })}
        </ul>
      </Card>
    </div>
  );
}
