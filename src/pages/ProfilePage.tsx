import { LogOut, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Badge } from "../components/common/Badge";
import { Button, ButtonLink } from "../components/common/Button";
import { Card } from "../components/common/Card";
import { ConfirmDialog } from "../components/common/ConfirmDialog";
import { PageHeader } from "../components/common/PageHeader";
import { ProgressBar } from "../components/common/ProgressBar";
import { useAuth } from "../hooks/useAuth";
import { useDashboardData } from "../hooks/useDashboardData";
import { useProgress } from "../hooks/useProgress";
import { formatDateTime } from "../utils/date";
import { describeStep, hasStartedPath } from "../utils/learning";
import { countDistinctActiveDays, getRecommendedNextStep } from "../utils/progress";

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-warm-white p-3">
      <p className="text-xs text-muted">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { resetProgress } = useProgress();
  const data = useDashboardData();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [wasReset, setWasReset] = useState(false);

  const { progress, currentPath, pathProgress } = data;
  const next = currentPath
    ? describeStep(currentPath, getRecommendedNextStep(currentPath, progress))
    : undefined;
  const started = currentPath ? hasStartedPath(currentPath, progress) : false;

  function handleReset() {
    resetProgress();
    setConfirmOpen(false);
    setWasReset(true);
  }

  if (!user) return null;

  return (
    <>
      <PageHeader title="Profile" description="Your demo learner details and progress summary." />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <div className="flex items-center gap-4">
            <span className="flex size-16 items-center justify-center rounded-full bg-ink text-xl font-bold text-lime">
              {user.avatarInitials}
            </span>
            <div className="min-w-0">
              <p className="truncate text-lg font-semibold">{user.name}</p>
              <p className="truncate text-sm text-muted">{user.email}</p>
              <Badge tone="lime" className="mt-1">
                Demo account
              </Badge>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted">
            Sign-in here is for demonstration only. Your progress is saved in this browser.
          </p>
          <Button variant="secondary" className="mt-5 w-full" onClick={logout}>
            <LogOut className="size-4" aria-hidden />
            Sign out
          </Button>
        </Card>

        <div className="space-y-6 lg:col-span-2">
          {currentPath && pathProgress && next && (
            <Card>
              <h2 className="font-semibold">Current learning path</h2>
              <p className="mt-1 text-sm text-muted">{currentPath.title}</p>
              <ProgressBar
                className="mt-4"
                value={pathProgress.overallProgress}
                label="Overall progress"
                showValue
              />
              <ButtonLink to={next.kind === "path-complete" ? `/paths/${currentPath.id}` : next.to} className="mt-4" size="sm">
                {next.kind === "path-complete" ? "Review path" : started ? "Continue learning" : "Start learning"}
              </ButtonLink>
            </Card>
          )}

          <Card>
            <h2 className="font-semibold">Completion summary</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Summary label="Lessons" value={`${progress.completedLessonIds.length}/${data.stats.totalLessons}`} />
              <Summary label="Challenges" value={`${progress.completedChallengeIds.length}/${data.stats.totalChallenges}`} />
              <Summary label="Milestones" value={`${progress.earnedAchievementIds.length}/5`} />
              <Summary label="Active days" value={`${countDistinctActiveDays(progress)}`} />
            </div>
            <p className="mt-4 text-sm text-muted">
              {progress.lastActiveAt
                ? `Last activity: ${formatDateTime(progress.lastActiveAt)}`
                : "No activity yet."}
            </p>
          </Card>

          <Card>
            <h2 className="font-semibold">Reset progress</h2>
            <p className="mt-1 text-sm text-muted">
              Clear all lessons, challenge attempts and milestones and start fresh. Signing
              out never does this.
            </p>
            <Button variant="danger" size="sm" className="mt-4" onClick={() => setConfirmOpen(true)}>
              <RotateCcw className="size-4" aria-hidden />
              Reset progress
            </Button>
            {wasReset && (
              <p role="status" className="mt-3 text-sm text-success">
                Progress reset. You are back at the start.
              </p>
            )}
          </Card>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Reset all progress?"
        description="This removes your completed lessons and challenges, saved answers, challenge attempts and milestones. It cannot be undone."
        confirmLabel="Yes, reset everything"
        cancelLabel="Keep my progress"
        destructive
        onConfirm={handleReset}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}
