import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Checkbox,
  SimpleTooltip,
} from "~/components/ui";
import type { QuestionProps } from "~/features/questions/types";
import { CircleCheckBig, Pencil } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { DeleteQuestionsButton } from "./deleteQuestionsDialog";
import { Editor } from "~/components/ui/wysiwyg/Editor";
import { useTranslations } from "next-intl";
import { useQuestionSelect } from "../_hooks/useQuestionSelected";

export function QuestionRow({ question }: { question: QuestionProps }) {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("question.row");
  const { isQuestionSelected, toggleSelectQuestion } = useQuestionSelect(
    question.id,
  );

  return (
    <li>
      <AccordionItem value={`question-${question.id}`}>
        <div className="flex items-center">
          <div className="flex items-center pr-2">
            <Checkbox
              checked={isQuestionSelected}
              onCheckedChange={(checked) =>
                toggleSelectQuestion(question.id, checked)
              }
              aria-labelledby={`checkbox-label-${question.question}`}
            />
          </div>
          <div className="flex-1 pr-2">
            <AccordionTrigger
              className="text-base"
              id={`checkbox-label-${question.question}`}
            >
              {question.question}
            </AccordionTrigger>
          </div>
          {question.markedAsLearned ? (
            <SimpleTooltip content={t("learned")}>
              <CircleCheckBig size={32} className="p-2 text-input" />
            </SimpleTooltip>
          ) : (
            <div className="w-8" />
          )}
          <Button
            onClick={() => router.push(`${pathname}/question/${question.id}`)}
            aria-label={t("editLabel")}
            className="h-8 w-8 rounded-full p-0"
            variant="ghost"
          >
            <Pencil size={16} />
          </Button>
          <DeleteQuestionsButton id={question.id} />
        </div>
        <AccordionContent>
          <Editor value={question.answer} editable={false} />
        </AccordionContent>
      </AccordionItem>
    </li>
  );
}
