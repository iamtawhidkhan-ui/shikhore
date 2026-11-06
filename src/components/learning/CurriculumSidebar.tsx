import { ChevronDown } from "lucide-react";
import { Circle, CircleCheck, CirclePlay } from "lucide-react";
import { Link } from "react-router-dom";
import { getChallengesForPath } from "../../data/challenges";
import { getLessonsForPath } from "../../data/lessons";
import type { LearningPath } from "../../types/learning";
import type { LearnerProgress } from "../../types/progress";
import { cn } from "../../utils/cn";
import { challengeUrl, lessonUrl, pathUrl } from "../../utils/learning";
import {
  getChallengeStatus,
  getLessonStatus,
  type ItemStatus,
} from "../../utils/progress";

function Icon({ status }: { status: ItemStatus }) {
  if (status === "completed") return <CircleCheck className="size-4 shrink-0 text-success" aria-hidden />;
  if (status === "current") return <CirclePlay className="size-4 shrink-0" aria-hidden />;
  return <Circle className="size-4 shrink-0 text-muted" aria-hidden />;
}

function NavRow({
  to,
  label,
  status,
  active,
}: {
  to: string;
  label: string;
  status: ItemStatus;
  active: boolean;
}) {
  return (
    <li>
      <Link
        to={to}
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex items-start gap-2.5 rounded-lg px-3 py-2 text-sm transition duration-200 hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
          active && "bg-ink font-medium text-white hover:bg-ink"
        )}
      >
        <span className="mt-0.5">
          <Icon status={status} />
        </span>
        <span>{label}</span>
      </Link>
    </li>
  );
}

function CurriculumNav({
  path,
  progress,
  currentLessonId,
}: {
  path: LearningPath;
  progress: LearnerProgress;
  currentLessonId: string;
}) {
  return (
    <div className="space-y-5">
      <div>
        <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wide text-muted">
          Lessons
        </p>
        <ul className="space-y-0.5">
          {getLessonsForPath(path.id).map((lesson) => (
            <NavRow
              key={lesson.id}
              to={lessonUrl(path.id, lesson.id)}
              label={`${lesson.order}. ${lesson.title}`}
              status={getLessonStatus(path, progress, lesson.id)}
              active={lesson.id === currentLessonId}
            />
          ))}
        </ul>
      </div>
      <div>
        <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wide text-muted">
          Challenges
        </p>
        <ul className="space-y-0.5">
          {getChallengesForPath(path.id).map((challenge) => (
            <NavRow
              key={challenge.id}
              to={challengeUrl(challenge.id)}
              label={challenge.title}
              status={getChallengeStatus(progress, challenge.id)}
              active={false}
            />
          ))}
        </ul>
      </div>
      <Link
        to={pathUrl(path.id)}
        className="block px-3 text-sm font-medium text-success hover:underline"
      >
        View full path
      </Link>
    </div>
  );
}

/**
 * Desktop (xl): a sticky list. Smaller screens: a collapsible dropdown,
 * so the lesson itself stays near the top.
 */
export function CurriculumSidebar({
  path,
  progress,
  currentLessonId,
  currentIndex,
  total,
}: {
  path: LearningPath;
  progress: LearnerProgress;
  currentLessonId: string;
  currentIndex: number;
  total: number;
}) {
  return (
    <>
      <details className="group rounded-card border border-line bg-surface xl:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold">
          <span>
            Curriculum · Lesson {currentIndex} of {total}
          </span>
          <ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden />
        </summary>
        <div className="border-t border-line p-3">
          <CurriculumNav path={path} progress={progress} currentLessonId={currentLessonId} />
        </div>
      </details>

      <nav
        aria-label="Course curriculum"
        className="sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-y-auto rounded-card border border-line bg-surface p-3 xl:block"
      >
        <CurriculumNav path={path} progress={progress} currentLessonId={currentLessonId} />
      </nav>
    </>
  );
}
