import { FormHeader } from "~/components/form";
import { TopicForm } from "~/features/topics/components/topicForm";
import { getTopicDetail } from "~/features/topics/actions";

export default async function EditTopicPage({
  params: { topicId },
}: {
  params: { topicId: string };
}) {
  const topic = await getTopicDetail(topicId);
  if (!topic) return null;
  return (
    <>
      <FormHeader>Edit topic</FormHeader>
      <TopicForm topic={topic} />
    </>
  );
}
