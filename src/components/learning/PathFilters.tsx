import { Search, X } from "lucide-react";
import type { ChangeEvent } from "react";
import type { Difficulty } from "../../types/learning";
import { cn } from "../../utils/cn";
import {
  ALL_CATEGORIES,
  hasActiveFilters,
  type ExploreFilters,
} from "../../utils/explore";
import { DIFFICULTIES, DIFFICULTY_LABELS } from "../../utils/labels";
import { Button } from "../common/Button";

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-sm font-medium transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
        active
          ? "border-ink bg-ink text-white"
          : "border-line bg-surface text-ink hover:bg-ink/5"
      )}
    >
      {children}
    </button>
  );
}

export function PathFilters({
  filters,
  categories,
  resultCount,
  onChange,
  onClear,
}: {
  filters: ExploreFilters;
  categories: string[];
  resultCount: number;
  onChange: (next: ExploreFilters) => void;
  onClear: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <label htmlFor="path-search" className="sr-only">
          Search learning paths
        </label>
        <Search
          className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted"
          aria-hidden
        />
        <input
          id="path-search"
          type="search"
          value={filters.query}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            onChange({ ...filters, query: event.target.value })
          }
          placeholder="Search by topic, skill or keyword"
          className="w-full rounded-lg border border-line bg-surface py-2.5 pl-10 pr-10 text-sm outline-none transition duration-200 focus:border-ink focus:ring-2 focus:ring-lime"
        />
        {filters.query !== "" && (
          <button
            type="button"
            onClick={() => onChange({ ...filters, query: "" })}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-muted hover:text-ink"
          >
            <X className="size-4" aria-hidden />
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:gap-8">
        <div role="group" aria-label="Filter by difficulty">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
            Difficulty
          </p>
          <div className="flex flex-wrap gap-2">
            <Chip
              active={filters.difficulty === "all"}
              onClick={() => onChange({ ...filters, difficulty: "all" })}
            >
              All
            </Chip>
            {DIFFICULTIES.map((difficulty: Difficulty) => (
              <Chip
                key={difficulty}
                active={filters.difficulty === difficulty}
                onClick={() => onChange({ ...filters, difficulty })}
              >
                {DIFFICULTY_LABELS[difficulty]}
              </Chip>
            ))}
          </div>
        </div>

        <div role="group" aria-label="Filter by category">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
            Category
          </p>
          <div className="flex flex-wrap gap-2">
            <Chip
              active={filters.category === ALL_CATEGORIES}
              onClick={() => onChange({ ...filters, category: ALL_CATEGORIES })}
            >
              All
            </Chip>
            {categories.map((category) => (
              <Chip
                key={category}
                active={filters.category === category}
                onClick={() => onChange({ ...filters, category })}
              >
                {category}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted" role="status">
          {resultCount} {resultCount === 1 ? "path" : "paths"} found
        </p>
        {hasActiveFilters(filters) && (
          <Button variant="ghost" size="sm" onClick={onClear}>
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
}
