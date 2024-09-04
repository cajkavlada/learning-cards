"use client";

import { useState } from "react";
import { useServerAction } from "zsa-react";
import { toast } from "sonner";
import { Button, Dialog, ConfirmDialog } from "~/components/ui";
import { deleteTopic } from "~/features/topics/actions";
import { Trash2 } from "lucide-react";

export function DeleteTopicButton({ id }: { id: number }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { isPending, execute } = useServerAction(deleteTopic);

  return (
    <>
      <div onClick={(e) => e.stopPropagation()}>
        <Button
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
          <ConfirmDialog
            title="Delete topic"
            description="This will delete the topic and all its questions."
            onSubmit={() => onSubmit(id)}
            submitDisabled={isPending}
          />
        </Dialog>
      </div>
    </>
  );

  async function onSubmit(id: number) {
    const [data, error] = await execute({ id });

    if (data) {
      toast("Topic deleted!");
      setDialogOpen(false);
    }
    if (error) {
      toast("Failed to delete topic", { description: error.code });
    }
  }
}
