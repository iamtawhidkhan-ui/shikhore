import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useVisualViewport } from "../../hooks/useVisualViewport";
import { cn } from "../../utils/cn";
import { AchievementToast } from "./AchievementToast";
import { Header } from "./Header";
import { MobileNavigation } from "./MobileNavigation";
import { Sidebar } from "./Sidebar";

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  // The Usha page behaves like a chat app: the screen never scrolls, only the
  // messages do, and the input stays pinned above the keyboard.
  const isChat = pathname === "/assistant";
  const viewport = useVisualViewport(isChat);

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
    <div
      className={cn(isChat ? "fixed inset-x-0 flex flex-col overflow-hidden" : "min-h-screen")}
      style={
        isChat
          ? {
              top: viewport.offsetTop,
              height: viewport.height > 0 ? viewport.height : "100dvh",
            }
          : undefined
      }
    >
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className={cn("lg:pl-60", isChat && "flex min-h-0 flex-1 flex-col")}>
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main
          className={cn(
            isChat
              ? "flex min-h-0 flex-1 flex-col"
              : "px-4 py-6 pb-24 sm:px-6 md:pb-8 lg:px-8"
          )}
        >
          <Outlet />
        </main>
      </div>
      {!isChat && <MobileNavigation />}
      <AchievementToast />
    </div>
  );
}
