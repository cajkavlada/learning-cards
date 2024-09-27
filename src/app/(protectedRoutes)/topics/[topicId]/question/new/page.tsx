import { FormHeader } from "~/components/form";
import { QuestionForm } from "~/features/questions/components/questionForm";

export default async function CreateQuestionPage() {
  return (
    <>
      <FormHeader>Create question</FormHeader>
      <QuestionForm />
    </>
  );
}
