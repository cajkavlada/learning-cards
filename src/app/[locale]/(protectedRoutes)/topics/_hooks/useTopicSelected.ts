import { createSelectionStore } from "~/utils/createSelectionStore";
import type { TopicPropsWithQuestionCount } from "~/features/topics/types";
import { useEffect } from "react";

export const useTopicStore =
  createSelectionStore<TopicPropsWithQuestionCount>();

export function useTopicBatchSelect(topics: TopicPropsWithQuestionCount[]) {
  const toggleSelectAll = useTopicStore((state) => state.toggleSelectAll);
  const isAllSelected = useTopicStore((state) => state.isAllSelected(topics));
  const clearSelection = useTopicStore((state) => state.clearSelection);

  useEffect(() => () => clearSelection(), [clearSelection]);

  return { toggleSelectAll, isAllSelected };
}

export function useTopicSelect(topicId: TopicPropsWithQuestionCount["id"]) {
  const isTopicSelected = useTopicStore((state) =>
    state.isItemSelected(topicId),
  );
  const toggleSelectTopic = useTopicStore((state) => state.toggleSelectItem);

  return { isTopicSelected, toggleSelectTopic };
}
