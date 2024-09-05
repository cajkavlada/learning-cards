import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui";
import { getMyTopicDetail } from "~/features/topics/queries";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { PageHeader } from "~/components/layout/pageHeader";
import { DeleteQuestionButton } from "~/features/questions/components/deleteQuestionDialog";

export default async function TopicPage({
  params: { topicId },
}: {
  params: { topicId: string };
}) {
  const topic = await getMyTopicDetail(Number(topicId));

  if (!topic) return null;

  return (
    <>
      <PageHeader title={topic.name} description={topic.description}>
        <Button asChild variant="outline" className="w-9 p-0">
          <Link href={`/topics/${topicId}/edit`}>
            <Pencil size={16} />
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/topics/${topicId}/question/new`}>Create question</Link>
        </Button>
        <Button asChild>
          <Link href={`/topics/${topicId}/quiz`}>Start quiz</Link>
        </Button>
      </PageHeader>
      <ul className="flex w-full flex-wrap gap-4 px-4 py-4">
        {topic.questions.map((question) => (
          <li key={question.id}>
            <Link href={`/topics/${topicId}/question/${question.id}`}>
              <Card className="w-[350px]">
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle className="flex-1">
                      {question.question}
                    </CardTitle>
                    <DeleteQuestionButton id={question.id} />
                  </div>
                </CardHeader>
                {/* <CardContent>
                  <div
                    className="truncate"
                    dangerouslySetInnerHTML={{ __html: question.answer }}
                  />
                </CardContent> */}
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
