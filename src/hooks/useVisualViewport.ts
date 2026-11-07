import { useMemo, useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  const viewport = window.visualViewport;
  window.addEventListener("resize", callback);
  viewport?.addEventListener("resize", callback);
  viewport?.addEventListener("scroll", callback);
  return () => {
    window.removeEventListener("resize", callback);
    viewport?.removeEventListener("resize", callback);
    viewport?.removeEventListener("scroll", callback);
  };
}

const noopSubscribe = () => () => {};

// A string keeps the snapshot stable: React only re-renders when it changes.
function getSnapshot(): string {
  const viewport = window.visualViewport;
  const height = Math.round(viewport?.height ?? window.innerHeight);
  const top = Math.round(viewport?.offsetTop ?? 0);
  return `${height}:${top}`;
}

/**
 * The size of the part of the screen you can actually see. On phones this
 * shrinks when the keyboard opens, so a chat can keep its input above it.
 */
export function useVisualViewport(enabled: boolean) {
  const snapshot = useSyncExternalStore(
    enabled ? subscribe : noopSubscribe,
    getSnapshot,
    () => "0:0"
  );
  return useMemo(() => {
    const [height, offsetTop] = snapshot.split(":").map(Number);
    return { height, offsetTop };
  }, [snapshot]);
}
