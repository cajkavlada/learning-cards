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
} from "~/components/ui";
import { DeleteQuestionsButton } from "./deleteQuestionsDialog";
import type { QuestionProps } from "../types";
import { usePathname } from "next/navigation";
import { CircleCheckBig, Pencil } from "lucide-react";
import { SanitizedHTML } from "~/components/common/SanitizedHTML";
import { useSelectInList } from "~/utils/useSelectInList";

export function QuestionList({ questions }: { questions: QuestionProps[] }) {
  const pathname = usePathname();
  const { checkItem, checkAll, selectedItems, allSelected } =
    useSelectInList(questions);

  return (
    <Card className="mx-4">
      <CardHeader>
        <div className="flex h-8 items-center gap-2">
          {questions.length > 0 && (
            <Checkbox checked={allSelected} onCheckedChange={checkAll} />
          )}
          {selectedItems.size > 0 && (
            <DeleteQuestionsButton ids={selectedItems} />
          )}
          <CardTitle>Questions</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
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
                    <DeleteQuestionsButton ids={new Set([question.id])} />
                  </div>
                  <AccordionContent>
                    <Card>
                      <CardContent className="p-6">
                        <SanitizedHTML
                          className="truncate"
                          html={question.answer}
                        />
                      </CardContent>
                    </Card>
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
