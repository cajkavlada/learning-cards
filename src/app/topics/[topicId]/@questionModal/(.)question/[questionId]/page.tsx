import { Modal } from "~/components/ui";
import { getQuestionDetail } from "~/features/questions/queries";
import { QuestionForm } from "../../../questionForm";

export default async function QuestionDetailModalPage({
  params: { questionId },
}: {
  params: { questionId: string };
}) {
  const question = await getQuestionDetail(Number(questionId));
  if (!question) return null;
  return (
    <Modal title="Update question" className="sm:max-w-[800px]">
      <QuestionForm question={question} />
    </Modal>
  );
}
