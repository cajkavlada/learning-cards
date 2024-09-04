import { TopicForm } from "~/app/topics/topicForm";
import { Modal } from "~/components/ui";
import { getMyTopicDetail } from "~/features/topics/queries";

export default async function EditTopicModalPage({
  params: { topicId },
}: {
  params: { topicId: string };
}) {
  const topic = await getMyTopicDetail(Number(topicId));
  if (!topic) return null;
  return (
    <Modal title="Edit topic" className="sm:max-w-[800px]">
      <TopicForm topic={topic} />
    </Modal>
  );
}
