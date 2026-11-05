// Placeholder: the real Lesson screen is built in a later step.
import { GraduationCap } from "lucide-react";
import { useParams } from "react-router-dom";
import { EmptyState } from "../components/common/EmptyState";
import { PageHeader } from "../components/common/PageHeader";

export default function LessonPage() {
  const { pathId, lessonId } = useParams();
  const detail = `Path: ${pathId ?? "none"} / Lesson: ${lessonId ?? "none"}`;
  return (
    <>
      <PageHeader title="Lesson" description="Learn, check your understanding and practise." />
      <EmptyState
        icon={GraduationCap}
        title="This page is coming together"
        description={detail}
      />
    </>
  );
}
