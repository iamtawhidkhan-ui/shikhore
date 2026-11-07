import { createContext } from "react";
import type { DemoUser } from "../types/user";
import type { LoginResult } from "../utils/auth";

export interface AuthContextValue {
  user: DemoUser | null;
  isAuthenticated: boolean;
  /** Validates the demo credentials. Never throws. */
  login: (email: string, password: string) => LoginResult;
  /** Clears the session only. Learning progress is kept. */
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
