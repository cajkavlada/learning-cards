import { QuestionForm } from "~/app/topics/[topicId]/questionForm";
import { Modal } from "~/components/ui";

export default async function CreateQustionModalPage() {
  return (
    <Modal title="Create question" className="sm:max-w-[800px]">
      <QuestionForm />
    </Modal>
  );
}
