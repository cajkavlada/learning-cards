import { FormHeader } from "~/components/form";
import { getQuestionDetail } from "~/features/questions/actions";
import { QuestionForm } from "~/features/questions/components/questionForm";

export default async function QuestionDetailPage({
  params: { questionId },
}: {
  params: { questionId: string };
}) {
  const question = await getQuestionDetail(questionId);
  if (!question) return null;

  return (
    <>
      <FormHeader>Update question</FormHeader>
      <QuestionForm question={question} />
    </>
  );
}
