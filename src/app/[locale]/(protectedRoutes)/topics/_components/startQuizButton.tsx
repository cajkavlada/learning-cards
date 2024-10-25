"use client";

import { useServerAction } from "zsa-react";
import { Button } from "~/components/ui";
import {
  checkQuizSessionConflict,
  startNewQuizSession,
} from "~/features/quiz/actions";
import { useRouter } from "next/navigation";
import { useDialog } from "~/components/layout/dialog/useDialog";
import { DialogLayout } from "~/components/layout/dialog/dialogLayout";
import type { TopicProps } from "~/features/topics/types";
import { useTranslations } from "next-intl";
import { useTopicStore } from "../_hooks/useTopicSelected";

export function StartQuizButton({
  topicId,
  disabled,
}: {
  topicId?: TopicProps["id"];
  disabled?: boolean;
}) {
  const router = useRouter();
  const t = useTranslations("quiz");
  const { openDialog } = useDialog();

  const { execute: checkForConflict } = useServerAction(
    checkQuizSessionConflict,
  );

  const selectedTopics = useTopicStore((state) => state.selectedItems);
  const topicsToTest = topicId ? [topicId] : Array.from(selectedTopics);
  return (
    <Button disabled={disabled} onClick={startQuiz}>
      {t("start")}
    </Button>
  );

  async function startQuiz() {
    const [data] = await checkForConflict(topicsToTest);
    if (!data) router.push("/quiz");
    else openDialog(<ConflictDialog topicIds={topicsToTest} />);
  }
}

function ConflictDialog({ topicIds }: { topicIds: TopicProps["id"][] }) {
  const t = useTranslations("quiz.conflictDialog");
  const router = useRouter();
  const { closeDialog } = useDialog();
  const { execute: startNewQuiz } = useServerAction(startNewQuizSession);

  return (
    <DialogLayout
      title={t("title")}
      submitLabel={t("override")}
      onSubmit={confirmNewQuiz}
      cancelLabel={t("continue")}
      onCancel={() => router.push("/quiz")}
    >
      {t("description")}
    </DialogLayout>
  );

  async function confirmNewQuiz() {
    await startNewQuiz(topicIds);
    closeDialog();
  }
}
