import { FormHeader } from "~/components/form";
import { TopicForm } from "~/features/topics/components/topicForm";

export default async function CreateTopicPage() {
  return (
    <>
      <FormHeader>Create topic</FormHeader>
      <TopicForm />
    </>
  );
}
