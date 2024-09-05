import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui";
import Link from "next/link";
import { DeleteTopicButton } from "./_components/DeleteTopicDialog";
import { getMyTopics } from "~/features/topics/queries";
import { Pencil } from "lucide-react";
import { ClientLink } from "~/components/common/ClientLink";
import { PageHeader } from "~/components/layout/pageHeader";

export default async function TopicsPage() {
  const topics = await getMyTopics();
  return (
    <>
      <PageHeader title="Topics">
        <Button asChild>
          <Link href={`/topics/new`}>Create topic</Link>
        </Button>
      </PageHeader>
      <ul className="flex w-full flex-wrap gap-4 px-4 py-4">
        {topics.map((topic) => (
          <li key={topic.id}>
            <Link href={`/topics/${topic.id}`}>
              <Card className="w-[350px]">
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    <div className="flex-1 truncate">{topic.name}</div>
                    <ClientLink href={`topics/${topic.id}/edit`}>
                      <Pencil size={16} />
                    </ClientLink>
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
