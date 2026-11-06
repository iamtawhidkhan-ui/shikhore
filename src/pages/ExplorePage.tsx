import { SearchX } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "../components/common/Button";
import { EmptyState } from "../components/common/EmptyState";
import { PageHeader } from "../components/common/PageHeader";
import { LearningPathCard } from "../components/learning/LearningPathCard";
import { PathFilters } from "../components/learning/PathFilters";
import { LEARNING_PATHS, PATH_CATEGORIES } from "../data/learningPaths";
import { useProgress } from "../hooks/useProgress";
import {
  DEFAULT_FILTERS,
  filterPaths,
  type ExploreFilters,
} from "../utils/explore";
import { calcPathProgress } from "../utils/progress";

export default function ExplorePage() {
  const { progress } = useProgress();
  const [filters, setFilters] = useState<ExploreFilters>(DEFAULT_FILTERS);

  const results = useMemo(() => filterPaths(LEARNING_PATHS, filters), [filters]);
  const clearFilters = () => setFilters(DEFAULT_FILTERS);

  return (
    <>
      <PageHeader
        title="Explore"
        description="Find a learning path that fits your goals. One path is ready to learn today, and more are on the way."
      />

      <PathFilters
        filters={filters}
        categories={PATH_CATEGORIES}
        resultCount={results.length}
        onChange={setFilters}
        onClear={clearFilters}
      />

      <div className="mt-6">
        {results.length === 0 ? (
          <EmptyState
            icon={SearchX}
            title="No paths match your search"
            description="Try a different keyword, or clear the filters to see every path."
            action={<Button onClick={clearFilters}>Clear filters</Button>}
          />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {results.map((path) => (
              <LearningPathCard
                key={path.id}
                path={path}
                progressPercent={
                  path.status === "available"
                    ? calcPathProgress(path, progress).overallProgress
                    : 0
                }
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
