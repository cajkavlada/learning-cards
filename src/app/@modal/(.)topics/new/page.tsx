import { TopicForm } from "~/app/topics/topicForm";
import { Modal } from "~/components/ui";

export default async function CreateTopicModalPage() {
  return (
    <Modal title="Create topic">
      <TopicForm />
    </Modal>
  );
}
