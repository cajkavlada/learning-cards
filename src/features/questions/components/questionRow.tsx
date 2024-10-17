import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Checkbox,
  SimpleTooltip,
} from "~/components/ui";
import type { CheckedState } from "@radix-ui/react-checkbox";
import type { QuestionProps } from "../types";
import { CircleCheckBig, Pencil } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DeleteQuestionsButton } from "./deleteQuestionsDialog";
import { Editor } from "~/components/ui/wysiwyg/Editor";
import { useTranslations } from "next-intl";

export function QuestionRow({
  question,
  checked,
  onCheckedChange,
}: {
  question: QuestionProps;
  checked: CheckedState;
  onCheckedChange: (checked: CheckedState) => void;
}) {
  const pathname = usePathname();
  const t = useTranslations("question.row");
  return (
    <li>
      <AccordionItem value={`question-${question.id}`}>
        <div className="flex items-center">
          <div className="flex items-center pr-2">
            <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
          </div>
          <div className="flex-1 pr-2">
            <AccordionTrigger className="text-base">
              {question.question}
            </AccordionTrigger>
          </div>
          {question.markedAsLearned ? (
            <SimpleTooltip content={t("learned")}>
              <CircleCheckBig size={32} className="p-2 text-primary" />
            </SimpleTooltip>
          ) : (
            <div className="w-8" />
          )}
          <Button asChild className="h-8 w-8 rounded-full p-0" variant="ghost">
            <Link href={`${pathname}/question/${question.id}`}>
              <Pencil size={16} />
            </Link>
          </Button>
          <DeleteQuestionsButton ids={new Set([question.id])} />
        </div>
        <AccordionContent>
          <Editor value={question.answer} editable={false} />
        </AccordionContent>
      </AccordionItem>
    </li>
  );
}
