"use client";

import { useServerAction } from "zsa-react";
import { Button } from "~/components/ui";
import { checkQuizSessionConflict, startNewQuizSession } from "../actions";
import { useRouter } from "next/navigation";
import { useDialog } from "~/components/layout/dialog/useDialog";
import { DialogLayout } from "~/components/layout/dialog/dialogLayout";
import type { TopicProps } from "~/features/topics/types";
import type { QuestionProps } from "~/features/questions/types";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

export function StartQuizButton({
  topicIds,
  questions,
}: {
  topicIds: TopicProps["id"][];
  questions?: QuestionProps[];
}) {
  const router = useRouter();
  const t = useTranslations("quiz");
  const { openDialog } = useDialog();

  const quizDisabled = useMemo(() => {
    if (!questions) return false;
    return !questions.filter((q) => !q.markedAsLearned).length;
  }, [questions]);

  const { execute: checkForConflict } = useServerAction(
    checkQuizSessionConflict,
  );

  return (
    <Button disabled={quizDisabled} onClick={startQuiz}>
      {t("start")}
    </Button>
  );

  async function startQuiz() {
    const [data] = await checkForConflict(topicIds);
    if (!data) router.push("/quiz");
    else openDialog(<ConflictDialog topicIds={topicIds} />);
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
