import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "~/components/layout/pageHeader";
import { Button } from "~/components/ui";
import { TopicList } from "./_components/topicList";
import { Suspense } from "react";

export default async function TopicsPage() {
  const t = await getTranslations("topic.list");
  return (
    <>
      <PageHeader title={t("title")}>
        <Button asChild className="ml-auto">
          <Link href={`/topics/new`}>{t("create")}</Link>
        </Button>
      </PageHeader>
      <Suspense fallback={<div>Loading...</div>}>
        <TopicList />
      </Suspense>
    </>
  );
}
