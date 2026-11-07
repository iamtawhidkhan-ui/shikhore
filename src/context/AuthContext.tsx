import { useCallback, useMemo, useState, type ReactNode } from "react";
import { DEMO_USER } from "../data/demoUser";
import type { DemoUser } from "../types/user";
import { validateDemoLogin } from "../utils/auth";
import { nowIso } from "../utils/date";
import { clearSession, loadSession, saveSession } from "../utils/storage";
import { AuthContext, type AuthContextValue } from "./authContextValue";

function loadInitialUser(): DemoUser | null {
  const session = loadSession();
  if (!session) return null;
  if (session.userId === DEMO_USER.id) return DEMO_USER;
  clearSession();
  return null;
}

function startSession(): void {
  saveSession({ userId: DEMO_USER.id, signedInAt: nowIso() });
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(loadInitialUser);

  const login = useCallback<AuthContextValue["login"]>((email, password) => {
    const result = validateDemoLogin(email, password);
    if (result.ok) {
      startSession();
      setUser(DEMO_USER);
    }
    return result;
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, isAuthenticated: user !== null, login, logout }),
    [user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
