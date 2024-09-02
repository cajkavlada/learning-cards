"use client";

import { useState } from "react";
import { useServerAction } from "zsa-react";
import { toast } from "sonner";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  type ButtonProps,
} from "~/components/ui";
import { SubmitButton } from "~/components/form";
import { deleteTopic } from "~/features/topics/actions";
import { Trash2 } from "lucide-react";

export function DeleteTopicButton({
  buttonProps,
  id,
}: {
  buttonProps?: ButtonProps;
  id: number;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <>
      <div onClick={(e) => e.stopPropagation()}>
        <Button
          {...buttonProps}
          onClick={(e) => {
            e.preventDefault();
            setDialogOpen(true);
          }}
          className="relative h-8 w-8 -translate-y-4 translate-x-4 rounded-full p-0"
          variant="ghost"
        >
          <Trash2 size={16} />
        </Button>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          {dialogOpen && (
            <DeleteTopicDialog
              closeDialog={() => setDialogOpen(false)}
              id={id}
            />
          )}
        </Dialog>
      </div>
    </>
  );
}

function DeleteTopicDialog({
  closeDialog,
  id,
}: {
  closeDialog: () => void;
  id: number;
}) {
  const { isPending, execute } = useServerAction(deleteTopic);

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Delete topic</DialogTitle>
        <DialogDescription>
          This will delete the topic and all its questions.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <SubmitButton disabled={isPending} onClick={() => onSubmit(id)}>
          Delete
        </SubmitButton>
      </DialogFooter>
    </DialogContent>
  );

  async function onSubmit(id: number) {
    const [data, error] = await execute(id);

    if (data) {
      toast("Topic deleted!");
      closeDialog();
    }
    if (error) {
      toast("Failed to delete topic", { description: error.code });
    }
  }
}
