import { Link, useLocation } from "react-router-dom";
import { cn } from "../../utils/cn";
import { NAV_ITEMS, isNavActive } from "./navItems";

/** Bottom bar for phones only. */
export function MobileNavigation() {
  const { pathname } = useLocation();
  const items = NAV_ITEMS.filter((item) => item.mobile);

  return (
    <nav
      aria-label="Quick navigation"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface md:hidden"
    >
      <ul className="flex">
        {items.map((item) => {
          const active = isNavActive(item, pathname);
          return (
            <li key={item.to} className="flex-1">
              <Link
                to={item.to}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium transition duration-200",
                  active ? "text-ink" : "text-muted"
                )}
              >
                <span
                  className={cn(
                    "rounded-full px-4 py-1",
                    active && "bg-lime/50"
                  )}
                >
                  <item.icon className="size-5" aria-hidden />
                </span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
