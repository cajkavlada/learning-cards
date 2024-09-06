import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui";
import { ClientLink } from "~/components/common/ClientLink";
import { Pencil } from "lucide-react";
import { DeleteTopicButton } from "./deleteTopicDialog";
import { getMyTopics } from "../queries";

export async function TopicList() {
  const topics = await getMyTopics();
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 px-4 py-4">
      {topics.map((topic) => (
        <li
          key={topic.id}
          className="min-w-[250px] max-w-[350px] flex-1 flex-grow"
        >
          <Link href={`/topics/${topic.id}`}>
            <Card className="w-full hover:bg-gray-200">
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle className="flex-1 truncate text-wrap">
                    {topic.name}
                  </CardTitle>
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
  );
}
