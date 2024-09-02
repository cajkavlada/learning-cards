import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui";
import { getMyTopicDetail } from "~/server/queries";
import { CreateQuestionButton } from "./_components/CreateQuestionDialog";

export default async function TopicPage({
  params,
}: {
  params: { id: string };
}) {
  const topic = await getMyTopicDetail(Number(params.id));

  if (!topic) return null;

  return (
    <>
      <div className="flex w-full justify-between gap-4 px-4">
        <h1 className="flex-grow text-center text-4xl font-bold">
          {topic.name}
        </h1>
        <CreateQuestionButton />
      </div>
      <ul className="flex w-full flex-col gap-4 px-4 py-4">
        {topic.questions.map((question) => (
          <li key={topic.id}>
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>{question.question}</CardTitle>
                <CardDescription>{question.answer}</CardDescription>
              </CardHeader>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}
