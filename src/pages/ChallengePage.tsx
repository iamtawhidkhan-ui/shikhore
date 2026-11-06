import { ArrowLeft, CircleCheck, Lock, SearchX } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnswerEditor } from "../components/challenges/AnswerEditor";
import { ChallengeInstructions } from "../components/challenges/ChallengeInstructions";
import { FeedbackPanel } from "../components/challenges/FeedbackPanel";
import { HintsPanel } from "../components/challenges/HintsPanel";
import { SubmissionHistory } from "../components/challenges/SubmissionHistory";
import { Badge } from "../components/common/Badge";
import { Button, ButtonLink } from "../components/common/Button";
import { Card } from "../components/common/Card";
import { EmptyState } from "../components/common/EmptyState";
import { getChallengeById } from "../data/challenges";
import { getLessonById } from "../data/lessons";
import { getPathById } from "../data/learningPaths";
import { useProgress } from "../hooks/useProgress";
import type { Challenge } from "../types/challenge";
import { assistantUrl } from "../utils/assistantLinks";
import { DIFFICULTY_LABELS, difficultyTone } from "../utils/labels";
import { describeStep, lessonUrl, pathUrl } from "../utils/learning";
import { getRecommendedNextStep, getSubmissionsForChallenge } from "../utils/progress";

function ChallengeWorkspace({ challenge }: { challenge: Challenge }) {
  const { progress, submitChallenge, completeChallenge } = useProgress();
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [hintsShown, setHintsShown] = useState(0);

  const path = getPathById(challenge.pathId);
  const lesson = challenge.lessonId ? getLessonById(challenge.lessonId) : undefined;
  const submissions = getSubmissionsForChallenge(progress, challenge.id); // newest first
  const latest = submissions[0];
  const completed = progress.completedChallengeIds.includes(challenge.id);

  const askUsha = (type: "feedback" | "hint") =>
    assistantUrl({
      pathId: challenge.pathId,
      challengeId: challenge.id,
      submissionId: type === "feedback" ? latest?.id : undefined,
      type,
    });

  function handleSubmit() {
    const result = submitChallenge(challenge.id, answer);
    if (!result.ok) {
      setNotice(null);
      setError(result.error);
      return;
    }
    setError(null);
    setAnswer("");
    setNotice("Attempt saved. You can ask Usha for feedback, or mark the challenge complete.");
  }

  function handleChange(next: string) {
    setAnswer(next);
    if (error) setError(null);
  }

  const next = path ? describeStep(path, getRecommendedNextStep(path, progress)) : undefined;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <div className="min-w-0 space-y-6">
        <header>
          <ButtonLink
            to={path ? pathUrl(path.id) : "/learning"}
            variant="ghost"
            size="sm"
            className="-ml-3 mb-2"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {path ? path.title : "My Learning"}
          </ButtonLink>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>Challenge {challenge.order}</Badge>
            <Badge tone={difficultyTone(challenge.difficulty)}>
              {DIFFICULTY_LABELS[challenge.difficulty]}
            </Badge>
            {completed && (
              <Badge tone="success">
                <CircleCheck className="size-3.5" aria-hidden />
                Completed
              </Badge>
            )}
          </div>
          <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{challenge.title}</h1>
          {lesson && path && (
            <p className="mt-1 text-sm text-muted">
              Related lesson:{" "}
              <Link
                to={lessonUrl(path.id, lesson.id)}
                className="font-medium text-success hover:underline"
              >
                {lesson.title}
              </Link>
            </p>
          )}
        </header>

        <ChallengeInstructions challenge={challenge} />

        <AnswerEditor
          value={answer}
          onChange={handleChange}
          onSubmit={handleSubmit}
          error={error}
          notice={notice}
        />

        <FeedbackPanel latest={latest} feedbackHref={askUsha("feedback")} />

        <Card className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-semibold">
              {completed ? "Challenge completed" : "Ready to finish?"}
            </h2>
            <p className="text-sm text-muted">
              {completed
                ? "Great work. This is saved to your progress."
                : submissions.length === 0
                  ? "Submit at least one answer to unlock completion."
                  : "Mark the challenge complete when you are happy with your answer."}
            </p>
          </div>
          {completed ? (
            next && next.kind !== "path-complete" ? (
              <ButtonLink to={next.to}>Continue: {next.title}</ButtonLink>
            ) : (
              <ButtonLink to={path ? pathUrl(path.id) : "/learning"}>Back to learning path</ButtonLink>
            )
          ) : (
            <Button disabled={submissions.length === 0} onClick={() => completeChallenge(challenge.id)}>
              {submissions.length === 0 ? (
                <Lock className="size-4" aria-hidden />
              ) : (
                <CircleCheck className="size-4" aria-hidden />
              )}
              Mark challenge complete
            </Button>
          )}
        </Card>

        <SubmissionHistory submissions={submissions} onReuse={handleChange} />
      </div>

      <aside aria-label="Challenge help">
        <HintsPanel
          hints={challenge.hints}
          shown={hintsShown}
          onShowNext={() => setHintsShown((count) => count + 1)}
          ushaHintHref={askUsha("hint")}
        />
      </aside>
    </div>
  );
}

export default function ChallengePage() {
  const { challengeId } = useParams();
  const challenge = challengeId ? getChallengeById(challengeId) : undefined;

  if (!challenge) {
    return (
      <EmptyState
        icon={SearchX}
        title="Challenge not found"
        description="This challenge does not exist or the link is out of date."
        action={<ButtonLink to="/learning">Back to My Learning</ButtonLink>}
      />
    );
  }

  // key resets the editor and hints when you move to a different challenge
  return <ChallengeWorkspace key={challenge.id} challenge={challenge} />;
}
