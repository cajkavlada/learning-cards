import { Modal } from "~/components/ui";
import { QuestionForm } from "~/features/questions/components/questionForm";

export default async function CreateQuestionModalPage() {
  return (
    <Modal title="Create question" className="sm:max-w-[800px]">
      <QuestionForm />
    </Modal>
  );
}
