import { BookOpen, Hammer, Route } from "lucide-react";
import type { ReactNode } from "react";
import { Card } from "../common/Card";

function Stat({
  icon,
  label,
  value,
  detail,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <Card className="flex items-start gap-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-lime/30">
        {icon}
      </span>
      <div>
        <p className="text-sm text-muted">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-xs text-muted">{detail}</p>
      </div>
    </Card>
  );
}

export function StatsGrid({
  lessonsCompleted,
  totalLessons,
  challengesCompleted,
  totalChallenges,
  pathsInProgress,
}: {
  lessonsCompleted: number;
  totalLessons: number;
  challengesCompleted: number;
  totalChallenges: number;
  pathsInProgress: number;
}) {
  return (
    <section aria-label="Learning overview" className="grid gap-4 sm:grid-cols-3">
      <Stat
        icon={<BookOpen className="size-5" aria-hidden />}
        label="Lessons completed"
        value={`${lessonsCompleted}`}
        detail={`of ${totalLessons} available`}
      />
      <Stat
        icon={<Hammer className="size-5" aria-hidden />}
        label="Challenges completed"
        value={`${challengesCompleted}`}
        detail={`of ${totalChallenges} available`}
      />
      <Stat
        icon={<Route className="size-5" aria-hidden />}
        label="Paths in progress"
        value={`${pathsInProgress}`}
        detail={pathsInProgress === 0 ? "Start a path to see it here" : "Keep going"}
      />
    </section>
  );
}
