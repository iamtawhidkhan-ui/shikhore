// TEMPORARY page to verify Step 3 (state + persistence). Replaced in Step 4.
import { useState } from "react";
import { ACHIEVEMENTS } from "./data/achievements";
import { DEMO_PASSWORD, DEMO_USER } from "./data/demoUser";
import { LEARNING_PATHS } from "./data/learningPaths";
import { useAuth } from "./hooks/useAuth";
import { useProgress } from "./hooks/useProgress";
import { calcPathProgress } from "./utils/progress";

function Btn({ onClick, children }: { onClick: () => void; children: string }) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg bg-lime px-3 py-1.5 text-sm font-semibold text-ink transition duration-200 hover:bg-lime-dark"
    >
      {children}
    </button>
  );
}

export default function App() {
  const { user, login, loginAsDemo, logout } = useAuth();
  const {
    progress,
    completeLesson,
    submitChallenge,
    completeChallenge,
    resetProgress,
    recentlyUnlocked,
    dismissUnlocked,
    saveFailed,
  } = useProgress();
  const [message, setMessage] = useState("");

  const path = LEARNING_PATHS[0];
  const stats = calcPathProgress(path, progress);

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6">
      <h1 className="text-2xl font-bold">Step 3 state check (temporary)</h1>

      <section className="rounded-card border border-line bg-surface p-4">
        <h2 className="font-semibold">Auth</h2>
        <p className="text-sm text-muted">
          {user ? `Signed in as ${user.name}` : "Signed out"}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          <Btn onClick={() => setMessage(JSON.stringify(login(DEMO_USER.email, DEMO_PASSWORD)))}>
            Login (correct)
          </Btn>
          <Btn onClick={() => setMessage(JSON.stringify(login(DEMO_USER.email, "wrong")))}>
            Login (wrong password)
          </Btn>
          <Btn onClick={() => setMessage(JSON.stringify(login("", "")))}>Login (empty)</Btn>
          <Btn onClick={loginAsDemo}>Explore demo</Btn>
          <Btn onClick={logout}>Sign out</Btn>
        </div>
        {message && <p className="mt-2 text-sm">Result: {message}</p>}
      </section>

      <section className="rounded-card border border-line bg-surface p-4">
        <h2 className="font-semibold">Progress: {stats.overallProgress}%</h2>
        <p className="text-sm text-muted">
          Lessons {stats.completedLessons}/{stats.totalLessons} · Challenges{" "}
          {stats.completedChallenges}/{stats.totalChallenges}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {path.lessonIds.map((id) => (
            <Btn key={id} onClick={() => completeLesson(id)}>{`Complete ${id}`}</Btn>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {path.challengeIds.map((id) => (
            <span key={id} className="flex gap-1">
              <Btn onClick={() => setMessage(JSON.stringify(submitChallenge(id, "Sample answer")))}>
                {`Submit ${id}`}
              </Btn>
              <Btn onClick={() => setMessage(`completed: ${completeChallenge(id)}`)}>
                {`Complete ${id}`}
              </Btn>
            </span>
          ))}
          <Btn onClick={() => setMessage(JSON.stringify(submitChallenge(path.challengeIds[0], "   ")))}>
            Submit EMPTY answer
          </Btn>
        </div>
        <div className="mt-3">
          <Btn onClick={resetProgress}>Reset progress</Btn>
        </div>
        {saveFailed && <p className="mt-2 text-sm text-red-600">Saving failed.</p>}
      </section>

      <section className="rounded-card border border-line bg-surface p-4">
        <h2 className="font-semibold">Achievements</h2>
        <ul className="mt-1 text-sm">
          {ACHIEVEMENTS.map((a) => (
            <li key={a.id}>
              {progress.earnedAchievementIds.includes(a.id) ? "✅" : "⬜"} {a.title}
            </li>
          ))}
        </ul>
        {recentlyUnlocked.length > 0 && (
          <p className="mt-2 text-sm text-success">
            Just unlocked: {recentlyUnlocked.map((a) => a.title).join(", ")}{" "}
            <button className="underline" onClick={dismissUnlocked}>dismiss</button>
          </p>
        )}
      </section>

      <pre className="overflow-x-auto rounded-card border border-line bg-surface p-4 text-xs">
        {JSON.stringify(progress, null, 2)}
      </pre>
    </main>
  );
}
