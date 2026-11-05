// Placeholder: the real dashboard is built in a later step.
import { LayoutDashboard } from "lucide-react";
import { EmptyState } from "../components/common/EmptyState";
import { PageHeader } from "../components/common/PageHeader";
import { useAuth } from "../hooks/useAuth";

export default function DashboardPage() {
  const { user } = useAuth();
  const firstName = user ? user.name.split(" ")[0] : "there";
  return (
    <>
      <PageHeader
        title={`Welcome back, ${firstName}`}
        description="Pick up where you left off."
      />
      <EmptyState
        icon={LayoutDashboard}
        title="Your dashboard is coming together"
        description="Progress, activity and next steps will appear here."
      />
    </>
  );
}
