import { Check, RotateCcw, X } from "lucide-react";
import type { KnowledgeQuestion } from "../../types/learning";
import { cn } from "../../utils/cn";
import { Button } from "../common/Button";
import { Card } from "../common/Card";

export function KnowledgeCheck({
  questions,
  answers,
  onAnswer,
}: {
  questions: KnowledgeQuestion[];
  /** One entry per question; -1 means not answered yet. */
  answers: number[];
  onAnswer: (next: number[]) => void;
}) {
  const answeredCount = answers.filter((answer) => answer >= 0).length;
  const correctCount = questions.filter(
    (question, index) => answers[index] === question.correctOptionIndex
  ).length;

  function select(questionIndex: number, optionIndex: number) {
    const next = [...answers];
    next[questionIndex] = optionIndex;
    onAnswer(next);
  }

  return (
    <Card className="p-6 sm:p-8">
      <h2 className="text-xl font-semibold tracking-tight">Knowledge check</h2>
      <p className="mt-1 text-sm text-muted">
        Pick an answer to see right away why it is correct or not.
      </p>

      <div className="mt-6 space-y-8">
        {questions.map((question, questionIndex) => {
          const selected = answers[questionIndex] ?? -1;
          const answered = selected >= 0;
          const isCorrect = selected === question.correctOptionIndex;

          return (
            <fieldset key={question.id}>
              <legend className="font-medium">
                {questionIndex + 1}. {question.question}
              </legend>

              <div className="mt-3 space-y-2">
                {question.options.map((option, optionIndex) => {
                  const chosen = selected === optionIndex;
                  const isRightOption = optionIndex === question.correctOptionIndex;
                  return (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={chosen}
                      aria-disabled={answered}
                      onClick={() => {
                        if (!answered) select(questionIndex, optionIndex);
                      }}
                      className={cn(
                        "flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left text-sm transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
                        !answered && "border-line bg-surface hover:border-ink",
                        answered && isRightOption && "border-success bg-success/10",
                        answered && chosen && !isRightOption && "border-red-400 bg-red-50",
                        answered && !chosen && !isRightOption && "border-line bg-surface text-muted",
                        answered && "cursor-default"
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                          answered && isRightOption
                            ? "border-success bg-success text-white"
                            : answered && chosen
                              ? "border-red-500 bg-red-500 text-white"
                              : "border-line"
                        )}
                      >
                        {answered && isRightOption ? (
                          <Check className="size-3.5" aria-hidden />
                        ) : answered && chosen ? (
                          <X className="size-3.5" aria-hidden />
                        ) : (
                          String.fromCharCode(65 + optionIndex)
                        )}
                      </span>
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div
                  role="status"
                  className={cn(
                    "mt-3 rounded-lg p-4 text-sm leading-6",
                    isCorrect ? "bg-success/10" : "bg-accent/15"
                  )}
                >
                  <p className="font-semibold">
                    {isCorrect ? "Correct!" : "Not quite, and that is fine."}
                  </p>
                  <p className="mt-1">{question.explanation}</p>
                  {!isCorrect && (
                    <Button
                      variant="secondary"
                      size="sm"
                      className="mt-3"
                      onClick={() => select(questionIndex, -1)}
                    >
                      <RotateCcw className="size-3.5" aria-hidden />
                      Try again
                    </Button>
                  )}
                </div>
              )}
            </fieldset>
          );
        })}
      </div>

      {answeredCount === questions.length && (
        <p className="mt-6 rounded-lg bg-ink px-4 py-3 text-sm text-white" role="status">
          You answered {correctCount} of {questions.length} correctly.
          {correctCount === questions.length
            ? " Excellent work!"
            : " Review the explanations, or try the questions again."}
        </p>
      )}
    </Card>
  );
}
