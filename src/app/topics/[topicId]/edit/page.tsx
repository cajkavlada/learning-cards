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
    <div className="flex min-h-0 flex-col bg-white p-6 shadow-md md:rounded-lg">
      <FormHeader>Edit topic</FormHeader>
      <TopicForm topic={topic} />
    </div>
  );
}
