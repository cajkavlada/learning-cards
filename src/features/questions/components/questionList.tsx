"use client";

import {
  Button,
  Card,
  CardContent,
  Accordion,
  Checkbox,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "~/components/ui";
import type { QuestionProps } from "../types";
import { EllipsisVertical } from "lucide-react";
import { useSelectInList } from "~/utils/useSelectInList";
import { useDialog } from "~/components/layout/dialog/useDialog";
import { DeleteQuestionsDialog } from "./deleteQuestionsDialog";
import { switchLearnedStatus } from "../actions";
import { useServerAction } from "zsa-react";
import { useMemo } from "react";
import { QuestionRow } from "./questionRow";
import { useTranslations } from "next-intl";

export function QuestionList({ questions }: { questions: QuestionProps[] }) {
  const { openDialog } = useDialog();
  const t = useTranslations("question.list");
  const { checkItem, checkAll, resetSelection, selectedItems, allSelected } =
    useSelectInList(questions);

  const { execute: switchLearned } = useServerAction(switchLearnedStatus);
  const learnedCount = useMemo(
    () => questions.filter((q) => q.markedAsLearned).length,
    [questions],
  );
  return (
    <Card className="mx-4 mb-6 flex min-h-0 flex-col md:mb-2">
      <CardHeader className="border-b-2">
        <div className="flex h-8 items-center gap-2">
          {questions.length > 0 && (
            <Checkbox checked={allSelected} onCheckedChange={checkAll} />
          )}
          {selectedItems.size > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="h-8 w-8 rounded-full p-0" variant="ghost">
                  <EllipsisVertical className="h-6 w-6 cursor-pointer text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={async () => {
                    await switchLearned({
                      ids: Array.from(selectedItems),
                      markedAsLearned: true,
                    });
                    resetSelection();
                  }}
                >
                  {t("markAsLearned")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={async () => {
                    await switchLearned({
                      ids: Array.from(selectedItems),
                      markedAsLearned: false,
                    });
                    resetSelection();
                  }}
                >
                  {t("markAsNotLearned")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-500"
                  onClick={() =>
                    openDialog(<DeleteQuestionsDialog ids={selectedItems} />)
                  }
                >
                  {t("delete")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <CardTitle>
            {t("title")} (<span className="text-green-500">{learnedCount}</span>
            /{questions.length})
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
              <QuestionRow
                key={question.id}
                question={question}
                checked={selectedItems.has(question.id)}
                onCheckedChange={(checked) => checkItem(question.id, checked)}
              />
            ))}
          </ul>
        </Accordion>
      </CardContent>
    </Card>
  );
}
