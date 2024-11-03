"use client";

import { toast } from "sonner";
import { deleteQuestionsActions } from "~/features/questions/actions";
import type { QuestionProps } from "~/features/questions/types";
import { DialogLayout } from "~/components/layout/dialog/dialogLayout";
import { useDialog } from "~/components/layout/dialog/useDialog";
import { Button } from "~/components/ui";
import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useQuestionStore } from "../_hooks/useQuestionSelected";
import { useAction } from "next-safe-action/hooks";
import { toastError } from "~/lib/toast";

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

  function onSuccess() {
    toast(t("success", { count: questionsToDelete.length }));
    closeDialog();
    clearSelection();
  }
  const { isPending, execute } = useAction(deleteQuestionsActions, {
    onSuccess,
    onError: toastError,
  });

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
      onSubmit={() => execute(questionsToDelete)}
      submitVariant="destructive"
    >
      {t("description", { count: questionsToDelete.length })}
    </DialogLayout>
  );
}
