// Placeholder: the real Progress screen is built in a later step.
import { TrendingUp } from "lucide-react";

import { EmptyState } from "../components/common/EmptyState";
import { PageHeader } from "../components/common/PageHeader";

export default function ProgressPage() {
  const detail = "Charts and achievements will appear here.";
  return (
    <>
      <PageHeader title="Progress" description="See how far you have come." />
      <EmptyState
        icon={TrendingUp}
        title="This page is coming together"
        description={detail}
      />
    </>
  );
}
