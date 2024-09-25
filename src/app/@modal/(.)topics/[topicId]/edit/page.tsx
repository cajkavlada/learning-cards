import { Modal } from "~/components/ui";
import { getTopicDetail } from "~/features/topics/actions";
import { TopicForm } from "~/features/topics/components/topicForm";

export default async function EditTopicModalPage({
  params: { topicId },
}: {
  params: { topicId: string };
}) {
  const topic = await getTopicDetail(topicId);
  if (!topic) return null;
  return (
    <Modal title="Edit topic" className="sm:max-w-[800px]">
      <TopicForm topic={topic} />
    </Modal>
  );
}
