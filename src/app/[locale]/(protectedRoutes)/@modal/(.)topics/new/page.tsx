import { getTranslations } from "next-intl/server";
import { LinkDialog } from "~/components/layout/dialog/linkDialog";
import { TopicForm } from "~/features/topics/components/topicForm";

export default async function CreateTopicDialogPage() {
  const t = await getTranslations("topic.form.create");
  return (
    <LinkDialog title={t("title")}>
      <TopicForm />
    </LinkDialog>
  );
}
