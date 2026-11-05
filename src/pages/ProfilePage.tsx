// Placeholder: the full profile is built in a later step.
import { LogOut } from "lucide-react";
import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";
import { PageHeader } from "../components/common/PageHeader";
import { useAuth } from "../hooks/useAuth";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  return (
    <>
      <PageHeader title="Profile" description="Your demo learner details." />
      <Card className="max-w-md">
        <p className="font-semibold">{user?.name}</p>
        <p className="text-sm text-muted">{user?.email}</p>
        <Button variant="secondary" className="mt-4" onClick={logout}>
          <LogOut className="size-4" aria-hidden />
          Sign out
        </Button>
      </Card>
    </>
  );
}
