import { Sparkles, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../utils/cn";
import { Brand } from "../common/Brand";
import { NAV_ITEMS, isNavActive } from "./navItems";

/**
 * Fixed on desktop (lg and up). On tablet and phone it becomes a drawer
 * that opens from the header menu button.
 */
export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { pathname } = useLocation();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-ink/40 lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}
      <aside
        aria-label="Main navigation"
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-line bg-surface transition-transform duration-200 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <Link to="/dashboard" onClick={onClose} aria-label="Shikhore home">
            <Brand />
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="rounded-lg p-2 hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink lg:hidden"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-2">
          {NAV_ITEMS.map((item) => {
            const active = isNavActive(item, pathname);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
                  active ? "bg-ink text-white" : "text-ink hover:bg-ink/5"
                )}
              >
                <item.icon
                  className={cn("size-5", active && "text-lime")}
                  aria-hidden
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3">
          <Link
            to="/assistant"
            onClick={onClose}
            className="block rounded-card bg-lime/30 p-4 transition duration-200 hover:bg-lime/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            <Sparkles className="size-5" aria-hidden />
            <p className="mt-2 text-sm font-semibold">Stuck on something?</p>
            <p className="text-xs text-muted">Ask Usha, your learning companion.</p>
          </Link>
        </div>
      </aside>
    </>
  );
}
