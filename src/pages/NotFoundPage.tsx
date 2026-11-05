import { SearchX } from "lucide-react";
import { ButtonLink } from "../components/common/Button";
import { EmptyState } from "../components/common/EmptyState";

export default function NotFoundPage() {
  return (
    <EmptyState
      icon={SearchX}
      title="We couldn't find that page"
      description="The link may be wrong or the page may have moved."
      action={<ButtonLink to="/dashboard">Back to dashboard</ButtonLink>}
    />
  );
}
