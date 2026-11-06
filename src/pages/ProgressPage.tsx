import { TrendingUp } from "lucide-react";
import { AchievementGrid } from "../components/dashboard/AchievementGrid";
import { StatsGrid } from "../components/dashboard/StatsGrid";
import { WeeklyActivity } from "../components/dashboard/WeeklyActivity";
import { ButtonLink } from "../components/common/Button";
import { Card } from "../components/common/Card";
import { EmptyState } from "../components/common/EmptyState";
import { PageHeader } from "../components/common/PageHeader";
import { ProgressBar } from "../components/common/ProgressBar";
import { useDashboardData } from "../hooks/useDashboardData";
import { countDistinctActiveDays } from "../utils/progress";

export default function ProgressPage() {
  const data = useDashboardData();
  const { currentPath, pathProgress, nextMilestone, progress } = data;
  const earnedCount = progress.earnedAchievementIds.length;
  const nothingYet =
    progress.completedLessonIds.length === 0 &&
    progress.completedChallengeIds.length === 0 &&
    progress.submissions.length === 0;

  return (
    <>
      <PageHeader
        title="Progress"
        description="See how far you have come and what to aim for next."
      />

      <StatsGrid
        lessonsCompleted={data.stats.lessonsCompleted}
        totalLessons={data.stats.totalLessons}
        challengesCompleted={data.stats.challengesCompleted}
        totalChallenges={data.stats.totalChallenges}
        pathsInProgress={data.stats.pathsInProgress}
      />

      {nothingYet && (
        <div className="mt-6">
          <EmptyState
            icon={TrendingUp}
            title="Your progress will show up here"
            description="Complete a lesson or submit a challenge and this page fills in with real numbers."
            action={<ButtonLink to="/learning">Start learning</ButtonLink>}
          />
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {currentPath && pathProgress && (
          <Card className="lg:col-span-2">
            <h2 className="font-semibold">Current path</h2>
            <p className="text-sm text-muted">{currentPath.title}</p>

            <ProgressBar
              className="mt-4"
              value={pathProgress.overallProgress}
              label="Overall progress"
              showValue
            />
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <ProgressBar
                value={pathProgress.lessonProgress}
                label={`Lessons (${pathProgress.completedLessons}/${pathProgress.totalLessons})`}
                showValue
              />
              <ProgressBar
                value={pathProgress.challengeProgress}
                label={`Challenges (${pathProgress.completedChallenges}/${pathProgress.totalChallenges})`}
                showValue
              />
            </div>
            <p className="mt-4 text-xs text-muted">
              Overall progress counts lessons for 70% and challenges for 30%.
            </p>
          </Card>
        )}

        <Card className="flex flex-col justify-between bg-ink text-white">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-lime">
              Next milestone
            </p>
            {nextMilestone ? (
              <>
                <p className="mt-1 text-lg font-bold">{nextMilestone.achievement.title}</p>
                <p className="text-sm text-white/70">{nextMilestone.achievement.description}</p>
                <ProgressBar
                  className="mt-4"
                  value={(nextMilestone.current / nextMilestone.target) * 100}
                  ariaLabel={`${nextMilestone.achievement.title} progress`}
                />
                <p className="mt-1 text-xs text-white/70">
                  {nextMilestone.current} of {nextMilestone.target}
                </p>
              </>
            ) : (
              <p className="mt-1 text-lg font-bold">Every milestone unlocked!</p>
            )}
          </div>
          <p className="mt-4 text-xs text-white/60">
            {earnedCount} of 5 milestones earned · {countDistinctActiveDays(progress)} active{" "}
            {countDistinctActiveDays(progress) === 1 ? "day" : "days"}
          </p>
        </Card>
      </div>

      <div className="mt-6">
        <WeeklyActivity days={data.weekly} />
      </div>

      <h2 className="mb-4 mt-8 text-xl font-semibold tracking-tight">Achievements</h2>
      <AchievementGrid progress={progress} />
    </>
  );
}
