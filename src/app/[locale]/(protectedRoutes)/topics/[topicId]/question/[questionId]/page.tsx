import { getTranslations } from "next-intl/server";
import { FormHeader } from "~/components/form";
import { getQuestionDetail } from "~/features/questions/actions";
import { QuestionForm } from "~/features/questions/components/questionForm";

export default async function QuestionDetailPage({
  params: { questionId },
}: {
  params: { questionId: string };
}) {
  const question = await getQuestionDetail(questionId);
  const t = await getTranslations("question.form.edit");
  if (!question) return null;

  return (
    <>
      <FormHeader>{t("title")}</FormHeader>
      <QuestionForm question={question} />
    </>
  );
}
