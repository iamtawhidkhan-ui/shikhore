import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AchievementToast } from "./AchievementToast";
import { Header } from "./Header";
import { MobileNavigation } from "./MobileNavigation";
import { Sidebar } from "./Sidebar";

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!sidebarOpen) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setSidebarOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sidebarOpen]);

  // Every page change starts at the top, like a normal website.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div className="min-h-screen">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-60">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="px-4 py-6 pb-24 sm:px-6 md:pb-8 lg:px-8">
          <Outlet />
        </main>
      </div>
      <MobileNavigation />
      <AchievementToast />
    </div>
  );
}
