import { Modal } from "~/components/ui";
import { TopicForm } from "../../topicForm";

export default async function Default() {
  return (
    <Modal title="Create topic">
      <TopicForm />
    </Modal>
  );
}
