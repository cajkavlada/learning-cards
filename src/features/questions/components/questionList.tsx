"use client";

import Link from "next/link";
import { Button, Card, CardContent } from "~/components/ui";
import { DeleteQuestionsButton } from "./deleteQuestionsDialog";
import type { Question } from "../types";
import { usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Pencil } from "lucide-react";
import { SanitizedHTML } from "~/components/common/SanitizedHTML";

export function QuestionList({ questions }: { questions: Question[] }) {
  const pathname = usePathname();
  return (
    <Accordion type="single" collapsible className="w-full">
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <AccordionItem value={`question-${question.id}`}>
              <div className="flex items-center">
                <div className="flex-1 pr-2">
                  <AccordionTrigger className="text-base">
                    {question.question}
                  </AccordionTrigger>
                </div>
                <Button
                  asChild
                  className="h-8 w-8 rounded-full p-0"
                  variant="ghost"
                >
                  <Link href={`${pathname}/question/${question.id}`}>
                    <Pencil size={16} />
                  </Link>
                </Button>
                <DeleteQuestionsButton ids={[question.id]} />
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
  );
}
