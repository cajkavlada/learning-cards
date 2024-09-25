"use client";

import { useState } from "react";
import { useServerAction } from "zsa-react";
import { toast } from "sonner";
import { Button, Dialog, ConfirmDialog } from "~/components/ui";
import { Trash2 } from "lucide-react";
import { deleteQuestions } from "../actions";
import type { QuestionProps } from "../types";

export function DeleteQuestionsButton({
  ids,
  ...props
}: {
  ids: Set<QuestionProps["id"]>;
} & React.HTMLProps<HTMLDivElement>) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { isPending, execute } = useServerAction(deleteQuestions);

  return (
    <>
      <div {...props} onClick={(e) => e.stopPropagation()}>
        <Button
          onClick={(e) => {
            e.preventDefault();
            setDialogOpen(true);
          }}
          className="h-8 w-8 rounded-full p-0"
          variant="ghost"
        >
          <Trash2 size={16} />
        </Button>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <ConfirmDialog
            title="Delete question"
            description="This will delete selected question."
            onSubmit={onSubmit}
            submitLoading={isPending}
          />
        </Dialog>
      </div>
    </>
  );

  async function onSubmit() {
    const [data, error] = await execute(Array.from(ids));

    if (data) {
      toast("Question deleted!");
      setDialogOpen(false);
    }
    if (error) {
      toast(error.name, { description: error.message });
    }
  }
}
