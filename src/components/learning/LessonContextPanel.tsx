import { Sparkles, Target } from "lucide-react";
import { Link } from "react-router-dom";
import type { Lesson } from "../../types/learning";
import { assistantUrl } from "../../utils/assistantLinks";
import { ButtonLink } from "../common/Button";
import { Card } from "../common/Card";

/** Objectives plus the entry point to Usha, already aware of this lesson. */
export function LessonContextPanel({ lesson }: { lesson: Lesson }) {
  const base = { pathId: lesson.pathId, lessonId: lesson.id };

  return (
    <div className="space-y-4 xl:sticky xl:top-24">
      <Card>
        <h2 className="flex items-center gap-2 font-semibold">
          <Target className="size-4" aria-hidden />
          Lesson objectives
        </h2>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm">
          {lesson.objectives.map((objective) => (
            <li key={objective}>{objective}</li>
          ))}
        </ul>
      </Card>

      <Card className="bg-lime/20">
        <h2 className="flex items-center gap-2 font-semibold">
          <Sparkles className="size-4" aria-hidden />
          Ask Usha
        </h2>
        <p className="mt-1 text-sm text-ink/70">
          Stuck on something in this lesson? Usha already knows what you are reading.
        </p>
        <ButtonLink to={assistantUrl(base)} className="mt-3 w-full">
          Ask Usha about this lesson
        </ButtonLink>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <Link
            className="font-medium text-success hover:underline"
            to={assistantUrl({ ...base, type: "explanation" })}
          >
            Explain it simply
          </Link>
          <Link
            className="font-medium text-success hover:underline"
            to={assistantUrl({ ...base, type: "example" })}
          >
            Give me an example
          </Link>
        </div>
      </Card>
    </div>
  );
}
