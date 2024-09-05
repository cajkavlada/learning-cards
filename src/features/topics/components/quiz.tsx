"use client";

import { revalidatePath } from "next/cache";
import { Button } from "../../../components/ui";
import type { Question } from "~/features/questions/types";
import { useServerAction } from "zsa-react";
import { shuffleQuizQuestions } from "../actions";
import { SubmitButton } from "~/components/form";
import { useEffect, useState } from "react";
import { PageHeader } from "~/components/layout/pageHeader";
import { set } from "zod";

export function Quiz({
  title,
  questions,
}: {
  title: string;
  questions: Question[];
}) {
  const { isPending: shuffling, execute: shuffle } =
    useServerAction(shuffleQuizQuestions);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const question = questions[currentQuestionIndex];
  console.log(question?.answer);
  return (
    <>
      <PageHeader title={title}>
        <SubmitButton disabled={shuffling} onClick={restartQuiz}>
          Restart
        </SubmitButton>
      </PageHeader>
      {question ? (
        <div className="flex w-full flex-1 flex-col p-4">
          <div className="flex flex-1 flex-col gap-4 text-center">
            <p>{question.question}</p>
            {showAnswer && (
              <div
                className="truncate"
                dangerouslySetInnerHTML={{ __html: question.answer }}
              />
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button onClick={() => setShowAnswer((prev) => !prev)}>
              {showAnswer ? "Hide Answer" : "Reveal Answer"}
            </Button>
            <Button onClick={handleNextQuestion}>Next</Button>
          </div>
        </div>
      ) : (
        "No more questions"
      )}
    </>
  );

  function handleNextQuestion() {
    setShowAnswer(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  async function restartQuiz() {
    await shuffle();
    setCurrentQuestionIndex(0);
    setShowAnswer(false);
  }
}
