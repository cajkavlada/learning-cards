"use client";

import { useServerAction } from "zsa-react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "~/components/ui";
import { deleteTopic } from "~/features/topics/actions";
import type { TopicProps } from "~/features/topics/types";
import { DialogLayout } from "~/components/layout/dialog/dialogLayout";
import { useDialog } from "~/components/layout/dialog/useDialog";
import { useTopicStore } from "../_hooks/useTopicSelected";

export function DeleteTopicsButton({ id }: { id?: TopicProps["id"] }) {
  const { openDialog } = useDialog();
  const t = useTranslations("topic.card");

  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        openDialog(<DeleteTopicsDialog id={id} />);
      }}
      className="h-8 w-8 rounded-full p-0"
      variant="destructiveGhost"
      aria-label={t("deleteLabel")}
    >
      <Trash2 size={16} />
    </Button>
  );
}

function DeleteTopicsDialog({ id }: { id?: TopicProps["id"] }) {
  const t = useTranslations("topic.delete");
  const { closeDialog } = useDialog();
  const { isPending, execute: deleteTopics } = useServerAction(deleteTopic);

  const selectedTopicsFromStore = useTopicStore((state) => state.selectedItems);
  const topicsToDelete = id ? [id] : Array.from(selectedTopicsFromStore);

  return (
    <DialogLayout
      title={t("title", { count: topicsToDelete.length })}
      submitLabel={t("confirm")}
      onSubmit={onSubmit}
      submitLoading={isPending}
      submitVariant="destructive"
    >
      {t("description", { count: topicsToDelete.length })}
    </DialogLayout>
  );

  async function onSubmit() {
    const [data, error] = await deleteTopics(topicsToDelete);

    if (data) {
      toast(t("success", { count: topicsToDelete.length }));
      closeDialog();
    }
    if (error) {
      toast(error.name, { description: error.message });
    }
  }
}
