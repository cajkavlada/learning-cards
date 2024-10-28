import { createSelectionStore } from "~/utils/createSelectionStore";
import { useEffect } from "react";
import type { QuestionProps } from "~/features/questions/types";

export const useQuestionStore = createSelectionStore<QuestionProps>();

export function useQuestionBatchSelect(questions: QuestionProps[]) {
  const toggleSelectAll = useQuestionStore((state) => state.toggleSelectAll);
  const isAllSelected = useQuestionStore((state) =>
    state.isAllSelected(questions),
  );
  const clearSelection = useQuestionStore((state) => state.clearSelection);

  useEffect(() => () => clearSelection(), [clearSelection]);

  return { toggleSelectAll, isAllSelected };
}

export function useQuestionSelect(questionId: QuestionProps["id"]) {
  const isQuestionSelected = useQuestionStore((state) =>
    state.isItemSelected(questionId),
  );
  const toggleSelectQuestion = useQuestionStore(
    (state) => state.toggleSelectItem,
  );

  return { isQuestionSelected, toggleSelectQuestion };
}
