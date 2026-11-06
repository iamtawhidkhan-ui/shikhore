import { Flag } from "lucide-react";
import { FINAL_PROJECT } from "../../data/finalProject";
import { formatHours } from "../../utils/labels";
import { Badge } from "../common/Badge";
import { Card } from "../common/Card";

/** The capstone brief. Open it to read steps, deliverables and evaluation guidance. */
export function FinalProjectCard() {
  const project = FINAL_PROJECT;

  return (
    <Card id="final-project">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/25">
          <Flag className="size-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-semibold">Final project</h2>
            <Badge tone="accent">Capstone</Badge>
          </div>
          <p className="mt-0.5 font-medium">{project.title}</p>
          <p className="mt-1 text-sm text-muted">{project.description}</p>
          <p className="mt-2 text-xs text-muted">
            About {formatHours(project.estimatedHours)} · a guided brief, not auto-graded
          </p>
        </div>
      </div>

      <details className="group mt-4 rounded-lg border border-line">
        <summary className="cursor-pointer select-none rounded-lg px-4 py-3 text-sm font-semibold hover:bg-ink/5">
          View the project brief
        </summary>
        <div className="space-y-5 border-t border-line px-4 py-4 text-sm">
          <section>
            <h3 className="font-semibold">What you will practise</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {project.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </section>
          <section>
            <h3 className="font-semibold">Suggested steps</h3>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              {project.steps.map((step) => (
                <li key={step.title}>
                  <span className="font-medium">{step.title}.</span>{" "}
                  <span className="text-muted">{step.detail}</span>
                </li>
              ))}
            </ol>
          </section>
          <section>
            <h3 className="font-semibold">What to hand in</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {project.deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section>
            <h3 className="font-semibold">How to evaluate your work</h3>
            <dl className="mt-2 space-y-2">
              {project.evaluationGuidance.map((item) => (
                <div key={item.criterion}>
                  <dt className="font-medium">{item.criterion}</dt>
                  <dd className="text-muted">{item.lookFor}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </details>
    </Card>
  );
}
