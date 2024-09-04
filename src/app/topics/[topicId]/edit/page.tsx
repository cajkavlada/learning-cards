import { getMyTopicDetail } from "~/features/topics/queries";
import { TopicForm } from "../../topicForm";
import { FormHeader } from "~/components/form";

export default async function EditTopicPage({
  params: { topicId },
}: {
  params: { topicId: string };
}) {
  const topic = await getMyTopicDetail(Number(topicId));
  if (!topic) return null;
  return (
    <div className="w-full p-4">
      <FormHeader>Edit topic</FormHeader>
      <TopicForm topic={topic} />
    </div>
  );
}
