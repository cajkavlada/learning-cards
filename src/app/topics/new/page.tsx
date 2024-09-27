import { FormHeader } from "~/components/form";
import { TopicForm } from "~/features/topics/components/topicForm";

export default async function CreateTopicPage() {
  return (
    <div className="flex min-h-0 flex-col bg-white p-6 shadow-md md:rounded-lg">
      <FormHeader>Create topic</FormHeader>
      <TopicForm />
    </div>
  );
}
