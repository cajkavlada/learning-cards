import { FormHeader } from "~/components/form";
import { TopicForm } from "../topicForm";

export default async function CreateTopicPage() {
  return (
    <div className="w-full p-4">
      <FormHeader>Create topic</FormHeader>
      <TopicForm />
    </div>
  );
}
