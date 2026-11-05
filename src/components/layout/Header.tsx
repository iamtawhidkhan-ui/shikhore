import { Menu } from "lucide-react";
import { useLocation } from "react-router-dom";
import { getPageTitle } from "./navItems";
import { ProfileMenu } from "./ProfileMenu";

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-warm-white/90 px-4 backdrop-blur sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open navigation menu"
        className="-ml-2 rounded-lg p-2 hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink lg:hidden"
      >
        <Menu className="size-5" aria-hidden />
      </button>
      <p className="flex-1 truncate text-sm font-semibold sm:text-base">
        {getPageTitle(pathname)}
      </p>
      <ProfileMenu />
    </header>
  );
}
