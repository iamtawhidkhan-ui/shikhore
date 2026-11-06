import { Flag } from "lucide-react";
import type { Challenge } from "../../types/challenge";
import { Card } from "../common/Card";

export function ChallengeInstructions({ challenge }: { challenge: Challenge }) {
  return (
    <Card className="p-6">
      <h2 className="font-semibold">The task</h2>
      <p className="mt-2 leading-7">{challenge.description}</p>

      <h3 className="mt-5 font-semibold">Instructions</h3>
      <ol className="mt-2 list-decimal space-y-2 pl-6 leading-7">
        {challenge.instructions.map((instruction) => (
          <li key={instruction}>{instruction}</li>
        ))}
      </ol>

      <div className="mt-5 rounded-lg bg-warm-white p-4">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <Flag className="size-4" aria-hidden />
          Expected outcome
        </p>
        <p className="mt-1 text-sm leading-6">{challenge.expectedOutcome}</p>
      </div>

      <p className="mt-4 text-xs text-muted">
        This is a written challenge. Paste your code and explanation as text. Shikhore does
        not run code for you.
      </p>
    </Card>
  );
}
