import { Button } from "~/components/ui";
import Link from "next/link";
import { PageHeader } from "~/components/layout/pageHeader";
import { TopicList } from "~/features/topics/components/topicList";

export default async function TopicsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="rounded-lg bg-white p-6 shadow-md">
        <PageHeader title="Quiz Topics">
          <Button asChild>
            <Link href={`/topics/new`}>Create topic</Link>
          </Button>
        </PageHeader>
        <TopicList />
      </div>
    </div>
  );
}
