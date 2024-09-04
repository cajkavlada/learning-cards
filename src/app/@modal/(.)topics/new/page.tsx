import { Modal } from "~/components/ui";
import { TopicForm } from "~/features/topics/components/topicForm";

export default async function CreateTopicModalPage() {
  return (
    <Modal title="Create topic">
      <TopicForm />
    </Modal>
  );
}
