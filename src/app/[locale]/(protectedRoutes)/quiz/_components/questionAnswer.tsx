"use client";

import { useState } from "react";
import { Button } from "~/components/ui";
import type { QuestionProps } from "~/features/questions/types";
import {
  nextQuestionAction,
  previousQuestionAction,
  restartQuizSessionAction,
} from "~/features/quiz/actions";
import { LoadingButton } from "~/components/form";
import { LearnToggle } from "./learnToggle";
import { Editor } from "~/components/ui/wysiwyg/Editor";
import { useTranslations } from "next-intl";
import { useAction } from "next-safe-action/hooks";
import { toastError } from "~/lib/toast";

export function QuestionAnswer({
  question,
  isFirst,
  isLast,
}: {
  question: QuestionProps;
  isFirst: boolean;
  isLast: boolean;
}) {
  const t = useTranslations("quiz.progress");
  const [showAnswer, setShowAnswer] = useState(false);

  const { isPending: nextPending, execute: nextQuestion } = useAction(
    nextQuestionAction,
    { onError: toastError, onSuccess: () => setShowAnswer(false) },
  );

  const { isPending: previousPending, execute: previousQuestion } = useAction(
    previousQuestionAction,
    { onError: toastError, onSuccess: () => setShowAnswer(false) },
  );

  const { isPending: restartPending, execute: restartQuizSession } = useAction(
    restartQuizSessionAction,
    { onError: toastError, onSuccess: () => setShowAnswer(false) },
  );

  return (
    <>
      <div className="flex-1 overflow-auto">
        {showAnswer && <Editor value={question.answer} editable={false} />}
      </div>
      <div className="flex w-full flex-wrap justify-end gap-4">
        <LearnToggle initialLearned={question.markedAsLearned} />
        <div className="flex flex-wrap gap-3">
          {!isFirst && (
            <LoadingButton
              onClick={() => previousQuestion()}
              loading={previousPending}
              variant="outline"
            >
              {t("previous")}
            </LoadingButton>
          )}
          {!showAnswer && (
            <Button onClick={() => setShowAnswer(!showAnswer)}>
              {t("reveal")}
            </Button>
          )}
          {showAnswer && !isLast && (
            <LoadingButton onClick={() => nextQuestion()} loading={nextPending}>
              {t("next")}
            </LoadingButton>
          )}
          {showAnswer && isLast && (
            <LoadingButton
              onClick={() => restartQuizSession()}
              loading={restartPending}
            >
              {t("restart")}
            </LoadingButton>
          )}
        </div>
      </div>
    </>
  );
}
