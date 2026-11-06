import { LayoutDashboard } from "lucide-react";
import { AchievementPreview } from "../components/dashboard/AchievementPreview";
import { ContinueLearningCard } from "../components/dashboard/ContinueLearningCard";
import { RecommendedStepCard } from "../components/dashboard/RecommendedStepCard";
import { StatsGrid } from "../components/dashboard/StatsGrid";
import { WeeklyActivity } from "../components/dashboard/WeeklyActivity";
import { WelcomeSection } from "../components/dashboard/WelcomeSection";
import { EmptyState } from "../components/common/EmptyState";
import { useAuth } from "../hooks/useAuth";
import { useDashboardData } from "../hooks/useDashboardData";
import { hasStartedPath } from "../utils/learning";

export default function DashboardPage() {
  const { user } = useAuth();
  const data = useDashboardData();
  const firstName = user ? user.name.split(" ")[0] : "there";

  return (
    <>
      <WelcomeSection
        firstName={firstName}
        lessonsCompleted={data.stats.lessonsCompleted}
      />

      {data.currentPath && data.pathProgress && data.nextStep ? (
        <div className="grid gap-6 lg:grid-cols-3">
          <ContinueLearningCard
            className="lg:col-span-2"
            path={data.currentPath}
            pathProgress={data.pathProgress}
            nextStep={data.nextStep}
            started={hasStartedPath(data.currentPath, data.progress)}
          />
          {data.recommended && (
            <RecommendedStepCard step={data.recommended} reason={data.recommended.reason} />
          )}
        </div>
      ) : (
        <EmptyState
          icon={LayoutDashboard}
          title="No learning path available yet"
          description="Check back soon, new paths are on the way."
        />
      )}

      <div className="mt-6">
        <StatsGrid
          lessonsCompleted={data.stats.lessonsCompleted}
          totalLessons={data.stats.totalLessons}
          challengesCompleted={data.stats.challengesCompleted}
          totalChallenges={data.stats.totalChallenges}
          pathsInProgress={data.stats.pathsInProgress}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <WeeklyActivity className="lg:col-span-2" days={data.weekly} />
        <AchievementPreview
          latest={data.latestAchievement}
          nextMilestone={data.nextMilestone}
        />
      </div>
    </>
  );
}
