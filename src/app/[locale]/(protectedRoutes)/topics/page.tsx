import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "~/components/layout/pageHeader";
import { Button } from "~/components/ui";
import { getMyTopics } from "~/features/topics/actions";
import { TopicList } from "./_components/topicList";

export default async function TopicsListPage() {
  const topics = await getMyTopics();
  const t = await getTranslations("topic.list");
  return (
    <>
      <PageHeader title={t("title")}>
        <Button asChild className="ml-auto">
          <Link href={`/topics/new`}>{t("create")}</Link>
        </Button>
      </PageHeader>
      <TopicList topics={topics} />
    </>
  );
}
