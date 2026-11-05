import { useContext } from "react";
import {
  ProgressContext,
  type ProgressContextValue,
} from "../context/progressContextValue";

export function useProgress(): ProgressContextValue {
  const value = useContext(ProgressContext);
  if (!value) {
    throw new Error("useProgress must be used inside <ProgressProvider>.");
  }
  return value;
}
