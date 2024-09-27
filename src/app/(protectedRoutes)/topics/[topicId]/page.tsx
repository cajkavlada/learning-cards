import { Button } from "~/components/ui";
import { getTopicDetail } from "~/features/topics/actions";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { PageHeader } from "~/components/layout/pageHeader";
import { QuestionList } from "~/features/questions/components/questionList";
import { StartQuizButton } from "~/features/quiz/components/startQuizButton";

export default async function TopicPage({
  params: { topicId },
}: {
  params: { topicId: string };
}) {
  const topic = await getTopicDetail(topicId);
  if (!topic) return null;

  return (
    <>
      <PageHeader title={topic.name} description={topic.description}>
        <div className="ml-auto flex gap-4">
          <Button asChild variant="outline" className="min-w-9 p-0">
            <Link href={`/topics/${topicId}/edit`}>
              <Pencil size={16} />
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/topics/${topicId}/question/new`}>
              Create question
            </Link>
          </Button>
          <StartQuizButton questions={topic.questions} topicIds={[topicId]} />
        </div>
      </PageHeader>
      <QuestionList questions={topic.questions} />
    </>
  );
}
