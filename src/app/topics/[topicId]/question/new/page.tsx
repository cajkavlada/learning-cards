import { FormHeader } from "~/components/form";
import { QuestionForm } from "~/features/questions/components/questionForm";

export default async function CreateQuestionPage() {
  return (
    <div className="flex min-h-0 flex-col bg-white p-6 shadow-md md:rounded-lg">
      <FormHeader>Create question</FormHeader>
      <QuestionForm />
    </div>
  );
}
