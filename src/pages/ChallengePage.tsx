// Placeholder: the real Challenge screen is built in a later step.
import { Hammer } from "lucide-react";
import { useParams } from "react-router-dom";
import { EmptyState } from "../components/common/EmptyState";
import { PageHeader } from "../components/common/PageHeader";

export default function ChallengePage() {
  const { challengeId } = useParams();
  const detail = `Challenge id from the URL: ${challengeId ?? "none"}`;
  return (
    <>
      <PageHeader title="Challenge" description="Apply what you learned to a realistic task." />
      <EmptyState
        icon={Hammer}
        title="This page is coming together"
        description={detail}
      />
    </>
  );
}
