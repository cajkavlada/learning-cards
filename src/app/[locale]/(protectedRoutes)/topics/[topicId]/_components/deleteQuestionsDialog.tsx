"use client";

import { useServerAction } from "zsa-react";
import { toast } from "sonner";
import { deleteQuestions } from "~/features/questions/actions";
import type { QuestionProps } from "~/features/questions/types";
import { DialogLayout } from "~/components/layout/dialog/dialogLayout";
import { useDialog } from "~/components/layout/dialog/useDialog";
import { Button } from "~/components/ui";
import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useQuestionStore } from "../_hooks/useQuestionSelected";

export function DeleteQuestionsButton({ id }: { id?: QuestionProps["id"] }) {
  const { openDialog } = useDialog();
  const t = useTranslations("question.row");
  return (
    <>
      <div onClick={(e) => e.stopPropagation()}>
        <Button
          onClick={(e) => {
            e.preventDefault();
            openDialog(<DeleteQuestionsDialog id={id} />);
          }}
          className="h-8 w-8 rounded-full p-0"
          variant="destructiveGhost"
          aria-label={t("deleteLabel")}
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </>
  );
}

export function DeleteQuestionsDialog({ id }: { id?: QuestionProps["id"] }) {
  const { closeDialog } = useDialog();
  const t = useTranslations("question.delete");
  const { isPending, execute } = useServerAction(deleteQuestions);

  const clearSelection = useQuestionStore((state) => state.clearSelection);
  const selectedQuestionsFromStore = useQuestionStore(
    (state) => state.selectedItems,
  );
  const questionsToDelete = id ? [id] : Array.from(selectedQuestionsFromStore);

  return (
    <DialogLayout
      title={t("title", { count: questionsToDelete.length })}
      submitLabel={t("confirm")}
      submitLoading={isPending}
      onSubmit={onSubmit}
      submitVariant="destructive"
    >
      {t("description", { count: questionsToDelete.length })}
    </DialogLayout>
  );

  async function onSubmit() {
    const [data, error] = await execute(questionsToDelete);

    if (data) {
      toast(t("success", { count: questionsToDelete.length }));
      closeDialog();
      clearSelection();
    }
    if (error) {
      toast(error.name, { description: error.message });
    }
  }
}
