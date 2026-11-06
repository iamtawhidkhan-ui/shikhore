import { ArrowLeft, CircleCheck, Hammer, SearchX } from "lucide-react";
import { useParams } from "react-router-dom";
import { Badge } from "../components/common/Badge";
import { Button, ButtonLink } from "../components/common/Button";
import { Card } from "../components/common/Card";
import { EmptyState } from "../components/common/EmptyState";
import { CurriculumSidebar } from "../components/learning/CurriculumSidebar";
import { KnowledgeCheck } from "../components/learning/KnowledgeCheck";
import { LessonContent } from "../components/learning/LessonContent";
import { LessonContextPanel } from "../components/learning/LessonContextPanel";
import { LessonNavigation } from "../components/learning/LessonNavigation";
import { getChallengeById } from "../data/challenges";
import type { Challenge } from "../types/challenge";
import { getAdjacentLessons, getLessonById } from "../data/lessons";
import { getPathById } from "../data/learningPaths";
import { useProgress } from "../hooks/useProgress";
import { formatMinutes } from "../utils/labels";
import { challengeUrl, lessonUrl, pathUrl } from "../utils/learning";
import { getChallengeStatus } from "../utils/progress";

export default function LessonPage() {
  const { pathId, lessonId } = useParams();
  const { progress, completeLesson, saveKnowledgeAnswer } = useProgress();

  const path = pathId ? getPathById(pathId) : undefined;
  const lesson = lessonId ? getLessonById(lessonId) : undefined;

  if (!path || !lesson || lesson.pathId !== path.id || !path.lessonIds.includes(lesson.id)) {
    return (
      <EmptyState
        icon={SearchX}
        title="Lesson not found"
        description="This lesson does not exist or the link is out of date."
        action={
          <ButtonLink to={path ? pathUrl(path.id) : "/explore"}>
            {path ? "Back to the learning path" : "Browse learning paths"}
          </ButtonLink>
        }
      />
    );
  }

  const completed = progress.completedLessonIds.includes(lesson.id);
  const saved = progress.lessonAnswers[lesson.id];
  const answers = lesson.knowledgeCheck.map((_, index) => saved?.[index] ?? -1);
  const allAnswered = answers.every((answer) => answer >= 0);
  const { previous, next } = getAdjacentLessons(lesson.id);
  const total = path.lessonIds.length;

  const relatedChallenges: Challenge[] = [];
  for (const id of lesson.challengeIds ?? []) {
    const challenge = getChallengeById(id);
    if (challenge) relatedChallenges.push(challenge);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[15rem_minmax(0,1fr)_17rem]">
      <div>
        <CurriculumSidebar
          path={path}
          progress={progress}
          currentLessonId={lesson.id}
          currentIndex={lesson.order}
          total={total}
        />
      </div>

      <article className="min-w-0 space-y-6">
        <header>
          <ButtonLink to={pathUrl(path.id)} variant="ghost" size="sm" className="-ml-3 mb-2">
            <ArrowLeft className="size-4" aria-hidden />
            {path.title}
          </ButtonLink>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>
              Lesson {lesson.order} of {total}
            </Badge>
            <Badge>{formatMinutes(lesson.estimatedMinutes)}</Badge>
            {completed && (
              <Badge tone="success">
                <CircleCheck className="size-3.5" aria-hidden />
                Completed
              </Badge>
            )}
          </div>
          <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{lesson.title}</h1>
          <p className="mt-1 text-muted">{lesson.description}</p>
        </header>

        <Card className="p-6 sm:p-8">
          <LessonContent blocks={lesson.content} />
        </Card>

        <KnowledgeCheck
          questions={lesson.knowledgeCheck}
          answers={answers}
          onAnswer={(next) => saveKnowledgeAnswer(lesson.id, next)}
        />

        {relatedChallenges.length > 0 && (
          <Card>
            <h2 className="flex items-center gap-2 font-semibold">
              <Hammer className="size-4" aria-hidden />
              Practise what you learned
            </h2>
            <ul className="mt-3 space-y-3">
              {relatedChallenges.map((challenge) => {
                const status = getChallengeStatus(progress, challenge.id);
                return (
                  <li key={challenge.id} className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-medium">{challenge.title}</p>
                      <p className="text-sm text-muted">{challenge.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {status === "completed" && <Badge tone="success">Completed</Badge>}
                      {status === "current" && <Badge tone="accent">In progress</Badge>}
                      <ButtonLink to={challengeUrl(challenge.id)} variant="secondary" size="sm">
                        Open challenge
                      </ButtonLink>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Card>
        )}

        <Card className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-semibold">
              {completed ? "Lesson completed" : "Finished this lesson?"}
            </h2>
            <p className="text-sm text-muted">
              {completed
                ? "Nice work. Your progress has been saved."
                : allAnswered
                  ? "Mark it complete to update your progress."
                  : "Tip: try the knowledge check first, then mark the lesson complete."}
            </p>
          </div>
          {completed ? (
            next ? (
              <ButtonLink to={lessonUrl(path.id, next.id)}>Next lesson</ButtonLink>
            ) : (
              <ButtonLink to={pathUrl(path.id)}>Back to learning path</ButtonLink>
            )
          ) : (
            <Button onClick={() => completeLesson(lesson.id)}>
              <CircleCheck className="size-4" aria-hidden />
              Mark lesson as complete
            </Button>
          )}
        </Card>

        <LessonNavigation pathId={path.id} previous={previous} next={next} />
      </article>

      <aside aria-label="Lesson context">
        <LessonContextPanel lesson={lesson} />
      </aside>
    </div>
  );
}
