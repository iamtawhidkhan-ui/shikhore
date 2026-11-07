import {
  ArrowRight,
  CircleAlert,
  Eye,
  EyeOff,
  Hammer,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { Brand } from "../components/common/Brand";
import { Button } from "../components/common/Button";
import { DEMO_PASSWORD, DEMO_USER } from "../data/demoUser";
import { useAuth } from "../hooks/useAuth";
import type { LoginResult } from "../utils/auth";
import { cn } from "../utils/cn";

type LoginError = Extract<LoginResult, { ok: false }>;

const inputClasses =
  "w-full rounded-lg border bg-surface px-3.5 py-3 text-base outline-none transition duration-200 focus:border-ink focus:ring-2 focus:ring-lime sm:py-2.5 sm:text-sm";

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<LoginError | null>(null);

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = login(email, password);
    // On success the auth state changes and the redirect above takes over.
    if (!result.ok) setError(result);
  }

  function fillDemoCredentials() {
    setEmail(DEMO_USER.email);
    setPassword(DEMO_PASSWORD);
    setError(null);
  }

  const emailError = error?.field === "email" ? error.error : undefined;
  const passwordError = error?.field === "password" ? error.error : undefined;
  const formError = error && !error.field ? error.error : undefined;

  return (
    <div className="flex min-h-screen flex-col lg:grid lg:grid-cols-2">
      {/* Brand panel: desktop only */}
      <aside className="hidden flex-col justify-between bg-ink p-12 text-white lg:flex">
        <div>
          <Brand tone="light" />
          <p className="mt-3 text-lg text-white/70" lang="bn">
            শিখরে উঠতে, শিখো রে!
          </p>
        </div>
        <div>
          <h2 className="max-w-md text-4xl font-bold leading-tight tracking-tight">
            Turn what you know into what you can do.
          </h2>
          <ul className="mt-8 space-y-4 text-white/80">
            <li className="flex items-center gap-3">
              <BookOpen className="size-5 text-lime" aria-hidden />
              Learn with clear lessons and real examples
            </li>
            <li className="flex items-center gap-3">
              <Hammer className="size-5 text-lime" aria-hidden />
              Apply it in practical challenges
            </li>
            <li className="flex items-center gap-3">
              <Sparkles className="size-5 text-lime" aria-hidden />
              Improve with guidance from Usha, your AI companion
            </li>
          </ul>
        </div>
        <p className="text-sm text-white/50">
          Learn with purpose. Rise through practice.
        </p>
      </aside>

      {/* Same brand as the desktop panel, compact: phones and tablets */}
      <header className="bg-ink px-5 py-5 text-white sm:px-8 lg:hidden">
        <div className="mx-auto w-full max-w-md">
          <Brand tone="light" />
          <p className="mt-2 text-base text-white/70" lang="bn">
            শিখরে উঠতে, শিখো রে!
          </p>
        </div>
      </header>

      <main className="flex flex-1 items-start justify-center px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-7 sm:px-8 sm:pt-10 lg:items-center lg:pb-10">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Your next skill starts here.
          </h1>
          <p className="mt-1.5 text-sm text-muted sm:text-base">
            Learn with purpose. Rise through practice.
          </p>

          <div className="mt-5 rounded-card border border-lime-dark/40 bg-lime/20 p-4 text-sm sm:mt-6">
            <p className="font-semibold">Demo credentials</p>
            <p className="mt-1 text-ink/70">
              This is a demo. Sign in with the account below.
            </p>
            <dl className="mt-2 space-y-1 font-mono text-[13px]">
              <div className="flex flex-wrap gap-x-2">
                <dt className="text-ink/60">Email:</dt>
                <dd>{DEMO_USER.email}</dd>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <dt className="text-ink/60">Password:</dt>
                <dd>{DEMO_PASSWORD}</dd>
              </div>
            </dl>
            <Button
              variant="secondary"
              size="sm"
              className="mt-3 w-full sm:w-auto"
              onClick={fillDemoCredentials}
            >
              Fill demo credentials
            </Button>
          </div>

          <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4 sm:mt-6">
            {formError && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800"
              >
                <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
                <p>{formError}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                aria-invalid={emailError ? true : undefined}
                aria-describedby={emailError ? "email-error" : undefined}
                placeholder="demo@shikhore.app"
                className={cn(inputClasses, emailError ? "border-red-500" : "border-line")}
              />
              {emailError && (
                <p id="email-error" className="mt-1 text-sm text-red-700">
                  {emailError}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                  aria-invalid={passwordError ? true : undefined}
                  aria-describedby={passwordError ? "password-error" : undefined}
                  className={cn(
                    inputClasses,
                    "pr-11",
                    passwordError ? "border-red-500" : "border-line"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded p-2.5 text-muted hover:text-ink sm:right-2 sm:p-1.5"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" aria-hidden />
                  ) : (
                    <Eye className="size-4" aria-hidden />
                  )}
                </button>
              </div>
              {passwordError && (
                <p id="password-error" className="mt-1 text-sm text-red-700">
                  {passwordError}
                </p>
              )}
            </div>

            <Button type="submit" size="lg" className="w-full">
              Continue to Shikhore
              <ArrowRight className="size-4" aria-hidden />
            </Button>
          </form>

          <p className="mt-5 text-center text-xs leading-5 text-muted sm:mt-6">
            This is a demo sign-in. Registration and password recovery are
            intentionally left out of this version.
          </p>
        </div>
      </main>
    </div>
  );
}
