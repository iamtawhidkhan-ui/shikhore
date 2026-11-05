import {
  CalendarCheck,
  Flag,
  Footprints,
  Lightbulb,
  Puzzle,
  Trophy,
  type LucideIcon,
} from "lucide-react";

/** Maps the icon name stored in achievements data to a Lucide component. */
const ACHIEVEMENT_ICONS: Record<string, LucideIcon> = {
  Footprints,
  Lightbulb,
  Puzzle,
  CalendarCheck,
  Flag,
};

export function getAchievementIcon(name: string): LucideIcon {
  return ACHIEVEMENT_ICONS[name] ?? Trophy;
}
