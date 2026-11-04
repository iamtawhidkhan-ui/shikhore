import { Mountain } from "lucide-react";

export default function App() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="rounded-card border border-line bg-surface p-8 text-center shadow-sm">
        <Mountain className="mx-auto mb-3 text-success" />
        <h1 className="text-2xl font-bold">Shikhore</h1>
        <p className="mt-1 text-muted">Learn with purpose. Rise through practice.</p>
        <button className="mt-5 rounded-lg bg-lime px-5 py-2.5 font-semibold text-ink transition duration-200 hover:bg-lime-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
          Setup works
        </button>
      </div>
    </main>
  );
}
