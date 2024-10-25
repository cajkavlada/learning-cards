import { Button } from "~/components/ui";
import { getTopicDetail } from "~/features/topics/actions";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { PageHeader } from "~/components/layout/pageHeader";
import { QuestionList } from "./_components/questionList";
import { StartQuizButton } from "../_components/startQuizButton";
import { getTranslations } from "next-intl/server";

export default async function TopicDetailPage({
  params: { topicId },
}: {
  params: { topicId: string };
}) {
  const topic = await getTopicDetail(topicId);
  const t = await getTranslations();
  if (!topic) return null;

  return (
    <>
      <PageHeader title={topic.name} description={topic.description}>
        <Button asChild variant="outline" className="min-w-9 rounded-full p-0">
          <Link
            href={`/topics/${topicId}/edit`}
            aria-label={t("topic.card.editLabel")}
          >
            <Pencil size={16} />
          </Link>
        </Button>
        <div className="ml-auto flex gap-4">
          <Button asChild>
            <Link href={`/topics/${topicId}/question/new`}>
              {t("question.list.create")}
            </Link>
          </Button>
          <StartQuizButton disabled={!topic.testable} topicId={topicId} />
        </div>
      </PageHeader>
      <QuestionList questions={topic.questions} />
    </>
  );
}
