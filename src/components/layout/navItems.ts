import {
  BookOpen,
  Compass,
  LayoutDashboard,
  Sparkles,
  TrendingUp,
  User,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  /** Any URL starting with one of these highlights this item. */
  matchPrefixes: string[];
  /** Shown in the bottom bar on phones. */
  mobile: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, matchPrefixes: ["/dashboard"], mobile: true },
  { to: "/explore", label: "Explore", icon: Compass, matchPrefixes: ["/explore"], mobile: true },
  { to: "/learning", label: "My Learning", icon: BookOpen, matchPrefixes: ["/learning", "/paths", "/challenges"], mobile: true },
  { to: "/assistant", label: "Usha", icon: Sparkles, matchPrefixes: ["/assistant"], mobile: true },
  { to: "/progress", label: "Progress", icon: TrendingUp, matchPrefixes: ["/progress"], mobile: false },
  { to: "/profile", label: "Profile", icon: User, matchPrefixes: ["/profile"], mobile: true },
];

export function isNavActive(item: NavItem, pathname: string): boolean {
  return item.matchPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export function getPageTitle(pathname: string): string {
  if (pathname.startsWith("/paths/") && pathname.includes("/lessons/")) return "Lesson";
  if (pathname.startsWith("/paths/")) return "Learning path";
  if (pathname.startsWith("/challenges/")) return "Challenge";
  const item = NAV_ITEMS.find((candidate) => isNavActive(candidate, pathname));
  return item ? item.label : "Shikhore";
}
