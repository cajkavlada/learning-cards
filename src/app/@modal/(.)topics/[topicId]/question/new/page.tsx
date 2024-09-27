import { LinkDialog } from "~/components/layout/dialog/linkDialog";
import { QuestionForm } from "~/features/questions/components/questionForm";

export default async function CreateQuestionDialogPage() {
  return (
    <LinkDialog
      title="Create question"
      className="flex max-h-full flex-col sm:max-w-[800px]"
    >
      <QuestionForm />
    </LinkDialog>
  );
}
