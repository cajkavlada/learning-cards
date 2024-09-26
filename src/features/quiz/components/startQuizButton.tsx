"use client";

import { useServerAction } from "zsa-react";
import { Button } from "~/components/ui";
import { checkQuizSessionConflict, startNewQuizSession } from "../actions";
import { useRouter } from "next/navigation";
import { useDialog } from "~/components/layout/dialog/useDialog";
import { DialogLayout } from "~/components/layout/dialog/dialogLayout";
import type { TopicProps } from "~/features/topics/types";

export function StartQuizButton({
  topicIds,
}: {
  topicIds: TopicProps["id"][];
}) {
  const router = useRouter();
  const { openDialog } = useDialog();

  const { execute: checkForConflict } = useServerAction(
    checkQuizSessionConflict,
  );

  return <Button onClick={startQuiz}>Start Quiz</Button>;

  async function startQuiz() {
    const [data] = await checkForConflict(topicIds);
    if (!data) router.push("/quiz");
    else openDialog(<ConflictDialog topicIds={topicIds} />);
  }
}

function ConflictDialog({ topicIds }: { topicIds: TopicProps["id"][] }) {
  const router = useRouter();
  const { closeDialog } = useDialog();
  const { execute: startNewQuiz } = useServerAction(startNewQuizSession);

  return (
    <DialogLayout
      title="Start new quiz"
      submitLabel="Start new quiz"
      onSubmit={confirmNewQuiz}
      cancelLabel="Proceed with current quiz"
      onCancel={() => router.push("/quiz")}
    >
      You have another quiz in progress. Starting a new quiz will end the
      current one.
    </DialogLayout>
  );

  async function confirmNewQuiz() {
    await startNewQuiz(topicIds);
    closeDialog();
  }
}
