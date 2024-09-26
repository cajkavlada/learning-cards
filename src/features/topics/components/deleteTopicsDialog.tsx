"use client";

import { useState } from "react";
import { useServerAction } from "zsa-react";
import { toast } from "sonner";
import { Button, Dialog, ConfirmDialog } from "~/components/ui";
import { Trash2 } from "lucide-react";
import { deleteTopic } from "../actions";
import type { TopicProps } from "../types";
import { cn } from "~/lib/utils";

export function DeleteTopicsButton({
  ids,
  buttonClassName,
}: {
  ids: Set<TopicProps["id"]>;
  buttonClassName?: string;
}) {
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
          className={cn("h-8 w-8 rounded-full p-0", buttonClassName)}
          variant="ghost"
        >
          <Trash2 size={16} />
        </Button>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <ConfirmDialog
            title="Delete topic"
            description="This will delete the topic and all its questions."
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
      toast("Topic(s) deleted!");
      setDialogOpen(false);
    }
    if (error) {
      toast(error.name, { description: error.message });
    }
  }
}
