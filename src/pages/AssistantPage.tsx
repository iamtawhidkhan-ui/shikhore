// Placeholder: the real chat is built in the Usha step. For now it proves that
// lesson and challenge links arrive with the right context.
import { Sparkles } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { EmptyState } from "../components/common/EmptyState";
import { PageHeader } from "../components/common/PageHeader";
import { getChallengeById } from "../data/challenges";
import { getLessonById } from "../data/lessons";
import { parseAssistantParams } from "../utils/assistantLinks";

export default function AssistantPage() {
  const [params] = useSearchParams();
  const context = parseAssistantParams(params);
  const lesson = context.lessonId ? getLessonById(context.lessonId) : undefined;
  const challenge = context.challengeId ? getChallengeById(context.challengeId) : undefined;

  const detail = lesson
    ? `Context received: lesson "${lesson.title}"${context.type ? ` (${context.type})` : ""}`
    : challenge
      ? `Context received: challenge "${challenge.title}"${context.type ? ` (${context.type})` : ""}`
      : "No lesson or challenge context. Usha will ask what you need.";

  return (
    <>
      <PageHeader title="Usha" description="Your friendly learning companion." />
      <EmptyState icon={Sparkles} title="Usha is almost here" description={detail} />
    </>
  );
}
