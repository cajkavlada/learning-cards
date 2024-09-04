import { FormHeader } from "~/components/form";
import { QuestionForm } from "../../questionForm";

export default async function CreateQuestionPage() {
  return (
    <div className="w-full p-4">
      <FormHeader>Create question</FormHeader>
      <QuestionForm />
    </div>
  );
}
