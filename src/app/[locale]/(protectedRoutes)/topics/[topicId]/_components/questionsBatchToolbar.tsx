import { EllipsisVertical } from "lucide-react";
import {
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui";
import { DeleteQuestionsDialog } from "./deleteQuestionsDialog";
import { useTranslations } from "next-intl";
import { useDialog } from "~/components/layout/dialog/useDialog";
import {
  useQuestionBatchSelect,
  useQuestionStore,
} from "../_hooks/useQuestionSelected";
import type { QuestionProps } from "~/features/questions/types";
import { switchLearnedStatus } from "~/features/questions/actions";
import { useServerAction } from "zsa-react";
import { toast } from "sonner";

export function QuestionsBatchToolbar({
  questions,
}: {
  questions: QuestionProps[];
}) {
  const t = useTranslations("question.list");
  const { openDialog } = useDialog();
  const { toggleSelectAll, isAllSelected } = useQuestionBatchSelect(questions);
  const { execute: switchLearned } = useServerAction(switchLearnedStatus);

  const selectedQuestionsFromStore = useQuestionStore(
    (state) => state.selectedItems,
  );
  const clearSelection = useQuestionStore((state) => state.clearSelection);

  async function handleToggleLearned(markAsLearned: boolean) {
    const [data, error] = await switchLearned({
      ids: Array.from(selectedQuestionsFromStore),
      markedAsLearned: markAsLearned,
    });
    if (data) {
      clearSelection();
    }
    if (error) {
      toast(error.name, { description: error.message });
    }
  }

  return (
    <>
      {questions.length > 0 && (
        <Checkbox
          checked={isAllSelected}
          onCheckedChange={(checked) => toggleSelectAll(questions, checked)}
          aria-label={t("checkAllLabel")}
        />
      )}
      {isAllSelected && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="h-8 w-8 rounded-full p-0"
              variant="ghost"
              aria-label={t("batchActionsLabel")}
            >
              <EllipsisVertical className="h-6 w-6 cursor-pointer text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleToggleLearned(true)}>
              {t("markAsLearned")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleToggleLearned(false)}>
              {t("markAsNotLearned")}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => openDialog(<DeleteQuestionsDialog />)}
            >
              {t("delete")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
