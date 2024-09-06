import { Quiz } from "~/features/topics/components/quiz";
import { getTopicWithShuffledQuestions } from "~/features/topics/queries";

export default async function QuizPage({
  params: { topicId },
}: {
  params: { topicId: string };
}) {
  const topic = await getTopicWithShuffledQuestions(Number(topicId));

  if (!topic) return null;

  return (
    <div className="container mx-auto py-8">
      <div className="rounded-lg bg-white p-6 shadow-md">
        <Quiz title={topic.name} questions={topic.questions} />
      </div>
    </div>
  );
}
