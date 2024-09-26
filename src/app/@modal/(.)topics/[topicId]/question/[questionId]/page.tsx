import { QuestionForm } from "~/features/questions/components/questionForm";
import { getQuestionDetail } from "~/features/questions/actions";
import { LinkDialog } from "~/components/layout/dialog/linkDialog";

export default async function QuestionDetailDialogPage({
  params: { questionId },
}: {
  params: { questionId: string };
}) {
  const question = await getQuestionDetail(questionId);
  if (!question) return null;
  return (
    <LinkDialog title="Update question" className="sm:max-w-[800px]">
      <QuestionForm question={question} />
    </LinkDialog>
  );
}
