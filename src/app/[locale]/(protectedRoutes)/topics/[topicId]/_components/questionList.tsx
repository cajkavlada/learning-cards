"use client";

import {
  Card,
  CardContent,
  Accordion,
  CardHeader,
  CardTitle,
} from "~/components/ui";
import type { QuestionProps } from "~/features/questions/types";
import { QuestionRow } from "./questionRow";
import { useTranslations } from "next-intl";
import { QuestionsBatchToolbar } from "./questionsBatchToolbar";

export function QuestionList({
  questions,
  learnedCount,
}: {
  questions: QuestionProps[];
  learnedCount: number;
}) {
  const t = useTranslations("question.list");

  return (
    <Card className="mx-4 mb-6 flex min-h-0 flex-col md:mb-2">
      <CardHeader className="border-b">
        <div className="flex h-8 items-center gap-2">
          <QuestionsBatchToolbar questions={questions} />
          <CardTitle>
            {t("title")} (<span className="text-input">{learnedCount}</span>/
            {questions.length})
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">
        {questions.length === 0 && (
          <div className="flex h-full items-center justify-center pt-6">
            {t("noQuestions")}
          </div>
        )}
        <Accordion type="single" collapsible className="w-full">
          <ul>
            {questions.map((question) => (
              <QuestionRow key={question.id} question={question} />
            ))}
          </ul>
        </Accordion>
      </CardContent>
    </Card>
  );
}
