import { Button } from "~/components/ui";
import Link from "next/link";
import { PageHeader } from "~/components/layout/pageHeader";
import { TopicList } from "~/features/topics/components/topicList";
import { getMyTopics } from "~/features/topics/actions";

export default async function TopicsPage() {
  const topics = await getMyTopics();
  return (
    <div className="flex min-h-0 flex-col bg-white shadow-md md:rounded-lg md:p-6">
      <PageHeader title="Quiz Topics">
        <Button asChild>
          <Link href={`/topics/new`}>Create topic</Link>
        </Button>
      </PageHeader>
      <TopicList topics={topics} />
    </div>
  );
}
