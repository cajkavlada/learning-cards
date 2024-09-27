"use client";

import Link from "next/link";
import {
  Button,
  Card,
  CardContent,
  SimpleTooltip,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Checkbox,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "~/components/ui";
import type { QuestionProps } from "../types";
import { usePathname } from "next/navigation";
import { CircleCheckBig, EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { useSelectInList } from "~/utils/useSelectInList";
import { useDialog } from "~/components/layout/dialog/useDialog";
import { DeleteQuestionsDialog } from "./deleteQuestionsDialog";
import { switchLearnedStatus } from "../actions";
import { useServerAction } from "zsa-react";
import { Editor } from "~/components/ui/wysiwyg/Editor";
import { useMemo } from "react";

export function QuestionList({ questions }: { questions: QuestionProps[] }) {
  const pathname = usePathname();
  const { openDialog } = useDialog();
  const { checkItem, checkAll, resetSelection, selectedItems, allSelected } =
    useSelectInList(questions);

  const { execute: switchLearned } = useServerAction(switchLearnedStatus);
  const learnedCount = useMemo(
    () => questions.filter((q) => q.markedAsLearned).length,
    [questions],
  );
  return (
    <Card className="mx-4 flex min-h-0 flex-col">
      <CardHeader>
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
                  Mark as learned
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
                  Mark as unlearned
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-500"
                  onClick={() =>
                    openDialog(<DeleteQuestionsDialog ids={selectedItems} />)
                  }
                >
                  Delete selected
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <CardTitle>
            Questions (<span className="text-green-500">{learnedCount}</span>/
            {questions.length})
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">
        <Accordion type="single" collapsible className="w-full">
          <ul>
            {questions.map((question) => (
              <li key={question.id}>
                <AccordionItem value={`question-${question.id}`}>
                  <div className="flex items-center">
                    <div className="flex items-center pr-2">
                      <Checkbox
                        checked={selectedItems.has(question.id)}
                        onCheckedChange={(checked) =>
                          checkItem(question.id, checked)
                        }
                      />
                    </div>
                    <div className="flex-1 pr-2">
                      <AccordionTrigger className="text-base">
                        {question.question}
                      </AccordionTrigger>
                    </div>
                    {question.markedAsLearned ? (
                      <SimpleTooltip content={"Marked as learned"}>
                        <CircleCheckBig
                          size={32}
                          className="p-2 text-green-700"
                        />
                      </SimpleTooltip>
                    ) : (
                      <div className="w-8" />
                    )}
                    <Button
                      asChild
                      className="h-8 w-8 rounded-full p-0"
                      variant="ghost"
                    >
                      <Link href={`${pathname}/question/${question.id}`}>
                        <Pencil size={16} />
                      </Link>
                    </Button>
                    <div onClick={(e) => e.stopPropagation()}>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          openDialog(
                            <DeleteQuestionsDialog
                              ids={new Set([question.id])}
                            />,
                          );
                        }}
                        className="h-8 w-8 rounded-full p-0"
                        variant="ghost"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                  <AccordionContent>
                    <Editor value={question.answer} editable={false} />
                  </AccordionContent>
                </AccordionItem>
              </li>
            ))}
          </ul>
        </Accordion>
      </CardContent>
    </Card>
  );
}
