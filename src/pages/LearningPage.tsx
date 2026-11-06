import { BookOpen } from "lucide-react";
import { ButtonLink } from "../components/common/Button";
import { EmptyState } from "../components/common/EmptyState";
import { PageHeader } from "../components/common/PageHeader";
import { PathProgressCard } from "../components/learning/PathProgressCard";
import { LEARNING_PATHS } from "../data/learningPaths";
import { useProgress } from "../hooks/useProgress";

export default function LearningPage() {
  const { progress } = useProgress();
  const available = LEARNING_PATHS.filter((path) => path.status === "available");

  return (
    <>
      <PageHeader
        title="My Learning"
        description="Pick up your paths and see what is next."
        actions={
          <ButtonLink to="/explore" variant="secondary">
            Explore more paths
          </ButtonLink>
        }
      />

      {available.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No paths yet"
          description="Browse Explore to find your first learning path."
          action={<ButtonLink to="/explore">Explore paths</ButtonLink>}
        />
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {available.map((path) => (
            <PathProgressCard key={path.id} path={path} progress={progress} />
          ))}
        </div>
      )}

      <p className="mt-6 text-sm text-muted">
        More paths are coming soon. You can preview them in Explore.
      </p>
    </>
  );
}
