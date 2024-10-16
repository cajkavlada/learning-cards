import { QuestionForm } from "~/features/questions/components/questionForm";
import { getQuestionDetail } from "~/features/questions/actions";
import { LinkDialog } from "~/components/layout/dialog/linkDialog";
import { getTranslations } from "next-intl/server";

export default async function QuestionDetailDialogPage({
  params: { questionId },
}: {
  params: { questionId: string };
}) {
  const question = await getQuestionDetail(questionId);
  const t = await getTranslations("question.form.edit");
  if (!question) return null;
  return (
    <LinkDialog
      title={t("title")}
      className="flex max-h-full flex-col sm:max-w-[800px]"
    >
      <QuestionForm question={question} />
    </LinkDialog>
  );
}
