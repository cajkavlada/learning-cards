import { LinkDialog } from "~/components/layout/dialog/linkDialog";
import { TopicForm } from "~/features/topics/components/topicForm";

export default async function CreateTopicDialogPage() {
  return (
    <LinkDialog title="Create topic">
      <TopicForm />
    </LinkDialog>
  );
}
