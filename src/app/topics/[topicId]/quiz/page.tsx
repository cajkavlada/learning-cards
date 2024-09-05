import { PageHeader } from "~/components/layout/pageHeader";
import { Quiz } from "~/features/topics/components/quiz";
import { getTopicWithShuffledQuestions } from "~/features/topics/queries";

export default async function QuizPage({
  params: { topicId },
}: {
  params: { topicId: string };
}) {
  const topic = await getTopicWithShuffledQuestions(Number(topicId));

  if (!topic) return null;

  return <Quiz title={topic.name} questions={topic.questions} />;
}
