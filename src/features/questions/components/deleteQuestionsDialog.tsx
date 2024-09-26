"use client";

import { useServerAction } from "zsa-react";
import { toast } from "sonner";
import { deleteQuestions } from "../actions";
import type { QuestionProps } from "../types";
import { DialogLayout } from "~/components/layout/dialog/dialogLayout";
import { useDialog } from "~/components/layout/dialog/useDialog";

export function DeleteQuestionsDialog({
  ids,
}: {
  ids: Set<QuestionProps["id"]>;
}) {
  const { isPending, execute } = useServerAction(deleteQuestions);
  const { closeDialog } = useDialog();

  return (
    <DialogLayout
      title="Delete question"
      submitLabel="Delete"
      submitLoading={isPending}
      onSubmit={onSubmit}
    >
      Are you sure, you want to delete selected question(s).
    </DialogLayout>
  );

  async function onSubmit() {
    const [data, error] = await execute(Array.from(ids));

    if (data) {
      toast("Question(s) deleted!");
      closeDialog();
    }
    if (error) {
      toast(error.name, { description: error.message });
    }
  }
}
