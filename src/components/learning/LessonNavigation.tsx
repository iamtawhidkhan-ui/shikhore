import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Lesson } from "../../types/learning";
import { lessonUrl, pathUrl } from "../../utils/learning";
import { ButtonLink } from "../common/Button";

export function LessonNavigation({
  pathId,
  previous,
  next,
}: {
  pathId: string;
  previous?: Lesson;
  next?: Lesson;
}) {
  return (
    <nav aria-label="Lesson navigation" className="flex flex-wrap justify-between gap-3">
      {previous ? (
        <ButtonLink to={lessonUrl(pathId, previous.id)} variant="secondary">
          <ArrowLeft className="size-4" aria-hidden />
          Previous: {previous.title}
        </ButtonLink>
      ) : (
        <span />
      )}
      {next ? (
        <ButtonLink to={lessonUrl(pathId, next.id)}>
          Next: {next.title}
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
      ) : (
        <ButtonLink to={pathUrl(pathId)}>
          Back to learning path
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
      )}
    </nav>
  );
}
