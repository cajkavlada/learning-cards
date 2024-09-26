import { LinkDialog } from "~/components/layout/dialog/linkDialog";
import { getTopicDetail } from "~/features/topics/actions";
import { TopicForm } from "~/features/topics/components/topicForm";

export default async function EditTopicDialogPage({
  params: { topicId },
}: {
  params: { topicId: string };
}) {
  const topic = await getTopicDetail(topicId);
  if (!topic) return null;
  return (
    <LinkDialog title="Edit topic" className="sm:max-w-[800px]">
      <TopicForm topic={topic} />
    </LinkDialog>
  );
}
