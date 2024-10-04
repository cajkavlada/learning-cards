import { Button } from "~/components/ui";
import Link from "next/link";
import { PageHeader } from "~/components/layout/pageHeader";
import { TopicList } from "~/features/topics/components/topicList";
import { getMyTopics } from "~/features/topics/actions";
import { getTranslations } from "next-intl/server";

export default async function TopicsListPage() {
  const topics = await getMyTopics();
  const t = await getTranslations("topic.list");
  return (
    <>
      <PageHeader title={t("title")}>
        <Button asChild>
          <Link href={`/topics/new`}>{t("create")}</Link>
        </Button>
      </PageHeader>
      <TopicList topics={topics} />
    </>
  );
}
