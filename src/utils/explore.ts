import type { Difficulty, LearningPath } from "../types/learning";

export interface ExploreFilters {
  query: string;
  difficulty: Difficulty | "all";
  category: string;
}

/** The category value that means "no category filter". */
export const ALL_CATEGORIES = "all";

export const DEFAULT_FILTERS: ExploreFilters = {
  query: "",
  difficulty: "all",
  category: ALL_CATEGORIES,
};

export function hasActiveFilters(filters: ExploreFilters): boolean {
  return (
    filters.query.trim() !== "" ||
    filters.difficulty !== "all" ||
    filters.category !== ALL_CATEGORIES
  );
}

/**
 * Every search word must appear somewhere in the title, description,
 * category or outcomes. Filters combine (AND).
 */
export function filterPaths(
  paths: LearningPath[],
  filters: ExploreFilters
): LearningPath[] {
  const terms = filters.query.toLowerCase().split(/\s+/).filter(Boolean);

  return paths.filter((path) => {
    if (filters.difficulty !== "all" && path.difficulty !== filters.difficulty) {
      return false;
    }
    if (filters.category !== ALL_CATEGORIES && path.category !== filters.category) {
      return false;
    }
    if (terms.length === 0) return true;
    const haystack = [path.title, path.description, path.category, ...path.outcomes]
      .join(" ")
      .toLowerCase();
    return terms.every((term) => haystack.includes(term));
  });
}
