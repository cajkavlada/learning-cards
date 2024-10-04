import { FormHeader } from "~/components/form";
import { TopicForm } from "~/features/topics/components/topicForm";
import { getTopicDetail } from "~/features/topics/actions";
import { getTranslations } from "next-intl/server";

export default async function EditTopicPage({
  params: { topicId },
}: {
  params: { topicId: string };
}) {
  const topic = await getTopicDetail(topicId);
  const t = await getTranslations("topic.form.edit");
  if (!topic) return null;
  return (
    <>
      <FormHeader>{t("title")}</FormHeader>
      <TopicForm topic={topic} />
    </>
  );
}
