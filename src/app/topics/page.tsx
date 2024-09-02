import { getMyTopics } from "~/server/queries";
import { CreateTopicButton } from "./_components/CreateTopicDialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui";
import Link from "next/link";
import { DeleteTopicButton } from "./_components/DeleteTopicDialog";

export default async function TopicsPage() {
  const topics = await getMyTopics();
  return (
    <>
      <div className="flex w-full justify-between gap-4 px-4">
        <h1 className="flex-grow text-center text-4xl font-bold">Topics</h1>
        <CreateTopicButton />
      </div>
      <ul className="flex w-full flex-wrap gap-4 px-4 py-4">
        {topics.map((topic) => (
          <li key={topic.id}>
            <Link href={`/topics/${topic.id}`}>
              <Card className="w-[350px]">
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    <div className="truncate">{topic.name}</div>
                    <DeleteTopicButton id={topic.id} />
                  </CardTitle>
                  <CardDescription>
                    {topic.questionsCount} questions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="truncate">{topic.description}</div>
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
