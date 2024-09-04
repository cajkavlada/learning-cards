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

export default async function TopicPage({
  params: { topicId },
}: {
  params: { topicId: string };
}) {
  const topic = await getMyTopicDetail(Number(topicId));

  if (!topic) return null;

  return (
    <>
      <div className="flex w-full justify-between gap-4 px-4">
        <h1 className="flex-grow text-center text-4xl font-bold">
          {topic.name}
        </h1>
        <Button asChild variant="outline" className="w-9 p-0">
          <Link href={`/topics/${topicId}/edit`}>
            <Pencil size={16} />
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/topics/${topicId}/question/new`}>Create question</Link>
        </Button>
      </div>
      <p>{topic.description}</p>
      <ul className="flex w-full flex-col gap-4 px-4 py-4">
        {topic.questions.map((question) => (
          <li key={question.id}>
            <Link href={`/topics/${topicId}/question/${question.id}`}>
              <Card className="w-[350px]">
                <CardHeader>
                  <CardTitle>{question.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="truncate"
                    dangerouslySetInnerHTML={{ __html: question.answer }}
                  />
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
