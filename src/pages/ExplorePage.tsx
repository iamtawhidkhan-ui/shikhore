// Placeholder: the real Explore screen is built in a later step.
import { Compass } from "lucide-react";

import { EmptyState } from "../components/common/EmptyState";
import { PageHeader } from "../components/common/PageHeader";

export default function ExplorePage() {
  const detail = "Search and filters arrive in the next step.";
  return (
    <>
      <PageHeader title="Explore" description="Find a learning path that fits your goals." />
      <EmptyState
        icon={Compass}
        title="This page is coming together"
        description={detail}
      />
    </>
  );
}
