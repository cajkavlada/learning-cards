import { getTranslations } from "next-intl/server";
import { FormHeader } from "~/components/form";
import { QuestionForm } from "~/features/questions/components/questionForm";

export default async function CreateQuestionPage() {
  const t = await getTranslations("question.form.create");
  return (
    <>
      <FormHeader>{t("title")}</FormHeader>
      <QuestionForm />
    </>
  );
}
