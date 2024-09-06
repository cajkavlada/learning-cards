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
import { QuestionList } from "~/features/questions/components/questionList";

export default async function TopicPage({
  params: { topicId },
}: {
  params: { topicId: string };
}) {
  const topic = await getMyTopicDetail(Number(topicId));

  if (!topic) return null;

  return (
    <div className="container mx-auto py-8">
      <div className="rounded-lg bg-white p-6 shadow-md">
        <PageHeader title={topic.name} description={topic.description}>
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
          <Button asChild>
            <Link href={`/topics/${topicId}/quiz`}>Start quiz</Link>
          </Button>
        </PageHeader>
        <Card className="mx-4">
          <CardHeader>
            <CardTitle>Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <QuestionList questions={topic.questions} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
