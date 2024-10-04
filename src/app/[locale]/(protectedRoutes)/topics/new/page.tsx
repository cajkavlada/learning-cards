import { getTranslations } from "next-intl/server";
import { FormHeader } from "~/components/form";
import { TopicForm } from "~/features/topics/components/topicForm";

export default async function CreateTopicPage() {
  const t = await getTranslations("topic.form.create");
  return (
    <>
      <FormHeader>{t("title")}</FormHeader>
      <TopicForm />
    </>
  );
}
