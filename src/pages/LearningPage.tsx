// Placeholder: the real My Learning screen is built in a later step.
import { BookOpen } from "lucide-react";

import { EmptyState } from "../components/common/EmptyState";
import { PageHeader } from "../components/common/PageHeader";

export default function LearningPage() {
  const detail = "Your learning paths will appear here.";
  return (
    <>
      <PageHeader title="My Learning" description="Your paths and what to do next." />
      <EmptyState
        icon={BookOpen}
        title="This page is coming together"
        description={detail}
      />
    </>
  );
}
