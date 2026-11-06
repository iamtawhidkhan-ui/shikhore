import { getGreeting } from "../../utils/labels";

export function WelcomeSection({
  firstName,
  lessonsCompleted,
}: {
  firstName: string;
  lessonsCompleted: number;
}) {
  const message =
    lessonsCompleted === 0
      ? "Ready to begin? Your first lesson is waiting."
      : lessonsCompleted === 1
        ? "You have completed 1 lesson so far. Keep the momentum going."
        : `You have completed ${lessonsCompleted} lessons so far. Keep the momentum going.`;

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        {getGreeting()}, {firstName}
      </h1>
      <p className="mt-1 text-muted">{message}</p>
    </div>
  );
}
