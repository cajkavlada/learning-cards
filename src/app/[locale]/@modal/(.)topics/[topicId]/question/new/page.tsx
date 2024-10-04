import { getTranslations } from "next-intl/server";
import { LinkDialog } from "~/components/layout/dialog/linkDialog";
import { QuestionForm } from "~/features/questions/components/questionForm";

export default async function CreateQuestionDialogPage() {
  const t = await getTranslations("question.form.create");
  return (
    <LinkDialog
      title={t("title")}
      className="flex max-h-full flex-col sm:max-w-[800px]"
    >
      <QuestionForm />
    </LinkDialog>
  );
}
