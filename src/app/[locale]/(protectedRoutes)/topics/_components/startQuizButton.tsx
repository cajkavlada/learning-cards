"use client";

import { Button } from "~/components/ui";
import {
  checkQuizSessionConflictAction,
  startNewQuizSessionAction,
} from "~/features/quiz/actions";
import { useRouter } from "next/navigation";
import { useDialog } from "~/components/layout/dialog/useDialog";
import { DialogLayout } from "~/components/layout/dialog/dialogLayout";
import type { TopicProps } from "~/features/topics/types";
import { useTranslations } from "next-intl";
import { useTopicStore } from "../_hooks/useTopicSelected";
import { useAction } from "next-safe-action/hooks";

export function StartQuizButton({
  topicId,
  disabled,
}: {
  topicId?: TopicProps["id"];
  disabled?: boolean;
}) {
  const t = useTranslations("quiz");
  const { openDialog } = useDialog();

  const selectedTopics = useTopicStore((state) => state.selectedItems);
  const topicsToTest = topicId ? [topicId] : Array.from(selectedTopics);

  const { execute: checkForConflict } = useAction(
    checkQuizSessionConflictAction,
    { onSuccess: handleConflict },
  );

  async function handleConflict({ data: conflict }: { data?: boolean }) {
    if (conflict) openDialog(<ConflictDialog topicIds={topicsToTest} />);
  }

  return (
    <Button disabled={disabled} onClick={() => checkForConflict(topicsToTest)}>
      {t("start")}
    </Button>
  );
}

function ConflictDialog({ topicIds }: { topicIds: TopicProps["id"][] }) {
  const t = useTranslations("quiz.conflictDialog");
  const router = useRouter();
  const { closeDialog } = useDialog();

  const { execute: startNewQuizSession } = useAction(
    startNewQuizSessionAction,
    { onSuccess: () => closeDialog() },
  );

  return (
    <DialogLayout
      title={t("title")}
      submitLabel={t("override")}
      onSubmit={() => startNewQuizSession(topicIds)}
      cancelLabel={t("continue")}
      onCancel={() => router.push("/quiz")}
    >
      {t("description")}
    </DialogLayout>
  );
}
