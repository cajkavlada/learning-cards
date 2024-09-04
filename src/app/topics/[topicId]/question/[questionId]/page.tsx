import { getQuestionDetail } from "~/features/questions/queries";
import { QuestionForm } from "../../questionForm";
import { FormHeader } from "~/components/form";

export default async function QuestionDetailPage({
  params: { questionId },
}: {
  params: { questionId: string };
}) {
  const question = await getQuestionDetail(Number(questionId));
  if (!question) return null;

  return (
    <div className="w-full p-4">
      <FormHeader>Update question</FormHeader>
      <QuestionForm question={question} />
    </div>
  );
}
