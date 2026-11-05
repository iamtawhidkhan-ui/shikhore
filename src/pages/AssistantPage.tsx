// Placeholder: the real Usha screen is built in a later step.
import { Sparkles } from "lucide-react";

import { EmptyState } from "../components/common/EmptyState";
import { PageHeader } from "../components/common/PageHeader";

export default function AssistantPage() {
  const detail = "Usha arrives once the learning journey is in place.";
  return (
    <>
      <PageHeader title="Usha" description="Your friendly learning companion." />
      <EmptyState
        icon={Sparkles}
        title="This page is coming together"
        description={detail}
      />
    </>
  );
}
