// Placeholder: the real Learning path screen is built in a later step.
import { Milestone } from "lucide-react";
import { useParams } from "react-router-dom";
import { EmptyState } from "../components/common/EmptyState";
import { PageHeader } from "../components/common/PageHeader";

export default function LearningPathPage() {
  const { pathId } = useParams();
  const detail = `Path id from the URL: ${pathId ?? "none"}`;
  return (
    <>
      <PageHeader title="Learning path" description="Curriculum and progress for this path." />
      <EmptyState
        icon={Milestone}
        title="This page is coming together"
        description={detail}
      />
    </>
  );
}
