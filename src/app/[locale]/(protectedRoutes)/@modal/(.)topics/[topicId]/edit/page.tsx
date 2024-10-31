import { getTranslations } from "next-intl/server";
import { LinkDialog } from "~/components/layout/dialog/linkDialog";
import { getTopicDetail } from "~/features/topics/fetchers";
import { TopicForm } from "~/features/topics/components/topicForm";

export default async function EditTopicDialogPage({
  params: { topicId },
}: {
  params: { topicId: string };
}) {
  const topic = await getTopicDetail(topicId);
  const t = await getTranslations("topic.form.edit");
  if (!topic) return null;
  return (
    <LinkDialog title={t("title")} className="sm:max-w-[800px]">
      <TopicForm topic={topic} />
    </LinkDialog>
  );
}
