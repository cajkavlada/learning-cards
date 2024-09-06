"use client";

import { Button } from "../../../components/ui";
import type { Question } from "~/features/questions/types";
import { useServerAction } from "zsa-react";
import DOMPurify from "dompurify";
import { shuffleQuizQuestions } from "../actions";
import { LoadingButton } from "~/components/form";
import { useState } from "react";
import { PageHeader } from "~/components/layout/pageHeader";
import { SanitizedHTML } from "~/components/common/SanitizedHTML";

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

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) return null;

  return (
    <>
      <PageHeader title={title}>
        <LoadingButton loading={shuffling} onClick={restartQuiz}>
          Restart
        </LoadingButton>
      </PageHeader>
      <div className="px-4">
        <h2 className="mb-4 text-xl font-bold">
          Question {currentQuestionIndex + 1}/{questions.length}
        </h2>
        <div className="flex w-full flex-1 flex-col py-4">
          <div className="flex flex-1 flex-col gap-4 text-center">
            <p className="mb-2 text-gray-800">{currentQuestion.question}</p>
            {showAnswer && (
              <SanitizedHTML
                className="truncate"
                html={currentQuestion.answer}
              />
            )}
          </div>
          <div className="flex justify-end gap-2">
            {!showAnswer && (
              <Button onClick={() => setShowAnswer(true)}>Reveal Answer</Button>
            )}
            {showAnswer && currentQuestionIndex < questions.length - 1 && (
              <Button onClick={handleNextQuestion}>Next Question</Button>
            )}
          </div>
        </div>
      </div>
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
