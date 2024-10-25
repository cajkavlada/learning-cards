import { useTranslations } from "next-intl";
import { Checkbox } from "~/components/ui";
import { DeleteTopicsButton } from "./deleteTopicsDialog";
import { StartQuizButton } from "./startQuizButton";
import { useTopicBatchSelect } from "../_hooks/useTopicSelected";
import type { TopicPropsWithQuestionCount } from "~/features/topics/types";

export function TopicsBatchToolbar({
  topics,
}: {
  topics: TopicPropsWithQuestionCount[];
}) {
  const t = useTranslations("topic.list");

  const { toggleSelectAll, isAllSelected } = useTopicBatchSelect(topics);

  return (
    <div className="flex min-h-10 items-center gap-2 pb-1 pl-10 pr-4">
      <Checkbox
        checked={isAllSelected}
        onCheckedChange={(checked) => toggleSelectAll(topics, checked)}
        aria-label={t("checkAllLabel")}
      />
      {isAllSelected && (
        <>
          <DeleteTopicsButton />
          <StartQuizButton />
        </>
      )}
    </div>
  );
}
