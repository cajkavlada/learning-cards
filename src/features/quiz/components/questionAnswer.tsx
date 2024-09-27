"use client";

import { useState } from "react";
import { Button } from "~/components/ui";
import type { QuestionProps } from "~/features/questions/types";
import { nextQuestion, previousQuestion, restartQuizSession } from "../actions";
import { useServerAction } from "zsa-react";
import { toast } from "sonner";
import { LoadingButton } from "~/components/form";
import { LearnToggle } from "./learnToggle";
import { Editor } from "~/components/ui/wysiwyg/Editor";

export function QuestionAnswer({
  question,
  isFirst,
  isLast,
}: {
  question: QuestionProps;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [showAnswer, setShowAnswer] = useState(false);

  const { isPending: nextPending, execute: moveNext } =
    useServerAction(nextQuestion);
  const { isPending: previousPending, execute: movePrevious } =
    useServerAction(previousQuestion);
  const { isPending: restartPending, execute: restartQuiz } =
    useServerAction(restartQuizSession);

  return (
    <>
      <div className="flex-1 overflow-auto">
        {showAnswer && <Editor value={question.answer} editable={false} />}
      </div>
      <div className="flex w-full flex-row-reverse flex-wrap-reverse gap-4">
        {!showAnswer && (
          <Button onClick={() => setShowAnswer(!showAnswer)}>
            Reveal Answer
          </Button>
        )}
        {!isLast && showAnswer && (
          <LoadingButton onClick={handleNextQuestion} loading={nextPending}>
            Next Question
          </LoadingButton>
        )}
        {isLast && showAnswer && (
          <LoadingButton onClick={handleRestartQuiz} loading={restartPending}>
            Restart Quiz
          </LoadingButton>
        )}
        {!isFirst && (
          <LoadingButton
            onClick={handlePreviousQuestion}
            loading={previousPending}
            variant="outline"
          >
            Previous Question
          </LoadingButton>
        )}
        <LearnToggle markedAsLearned={question.markedAsLearned} />
      </div>
    </>
  );

  async function handleNextQuestion() {
    console.log("haha");
    const [, error] = await moveNext();

    if (error) {
      toast(error.name, { description: error.message });
    } else {
      setShowAnswer(false);
    }
  }

  async function handlePreviousQuestion() {
    const [, error] = await movePrevious();
    if (error) {
      toast(error.name, { description: error.message });
    } else {
      setShowAnswer(false);
    }
  }

  async function handleRestartQuiz() {
    const [, error] = await restartQuiz();
    if (error) {
      toast(error.name, { description: error.message });
    } else {
      setShowAnswer(false);
    }
  }
}
