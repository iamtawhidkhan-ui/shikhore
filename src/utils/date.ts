/**
 * Date helpers. Activity dates are stored as LOCAL calendar dates
 * ("YYYY-MM-DD"), not UTC, so a lesson finished at 1 AM in Bangladesh
 * counts for that local day.
 */

const DEV_DATE_STORAGE_KEY = "shikhore-dev-date";
const DATE_KEY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function isDateKey(value: unknown): value is string {
  if (typeof value !== "string" || !DATE_KEY_PATTERN.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

export function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function fromDateKey(key: string): Date {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Today's local date key.
 * In development only, you can fake the date to test the
 * "Consistent Learner" achievement. In the browser console run:
 *   localStorage.setItem("shikhore-dev-date", "2026-11-06")
 * and remove it with:
 *   localStorage.removeItem("shikhore-dev-date")
 * This override is ignored in production builds.
 */
export function todayKey(): string {
  if (import.meta.env.DEV) {
    try {
      const override = localStorage.getItem(DEV_DATE_STORAGE_KEY);
      if (override && isDateKey(override)) return override;
    } catch {
      // Storage unavailable: fall through to the real date.
    }
  }
  return toDateKey(new Date());
}

export function nowIso(): string {
  return new Date().toISOString();
}

/** The last `count` date keys, oldest first, ending at `endKey`. */
export function lastNDateKeys(count: number, endKey: string = todayKey()): string[] {
  const end = fromDateKey(endKey);
  const keys: string[] = [];
  for (let offset = count - 1; offset >= 0; offset -= 1) {
    const day = new Date(end);
    day.setDate(end.getDate() - offset);
    keys.push(toDateKey(day));
  }
  return keys;
}

export function formatWeekday(key: string): string {
  return fromDateKey(key).toLocaleDateString("en-US", { weekday: "short" });
}

/** Works for both "YYYY-MM-DD" keys and full ISO timestamps. */
export function formatDisplayDate(value: string): string {
  const date = isDateKey(value) ? fromDateKey(value) : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
