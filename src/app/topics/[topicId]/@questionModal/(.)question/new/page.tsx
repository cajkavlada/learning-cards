import { Modal } from "~/components/ui";
import { QuestionForm } from "../../../questionForm";

export default async function CreateQustionModalPage() {
  return (
    <Modal title="Create question" className="sm:max-w-[800px]">
      <QuestionForm />
    </Modal>
  );
}
