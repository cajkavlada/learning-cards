import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui";
import Link from "next/link";
import { getMyTopics } from "~/features/topics/queries";
import { Pencil } from "lucide-react";
import { ClientLink } from "~/components/common/ClientLink";
import { PageHeader } from "~/components/layout/pageHeader";
import { DeleteTopicButton } from "~/features/topics/components/deleteTopicDialog";

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
                  <div className="flex justify-between">
                    <CardTitle className="flex-1">{topic.name}</CardTitle>
                    <ClientLink href={`topics/${topic.id}/edit`}>
                      <Pencil size={16} />
                    </ClientLink>
                    <DeleteTopicButton id={topic.id} />
                  </div>
                  <CardDescription className="truncate text-wrap">
                    {topic.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="truncate text-wrap">
                    {topic.questionsCount} questions
                  </div>
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
