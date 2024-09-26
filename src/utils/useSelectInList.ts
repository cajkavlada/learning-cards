"use client";

import { useCallback, useMemo, useState } from "react";
import type { CheckedState } from "@radix-ui/react-checkbox";

type ItemWithID = { id: string };

export function useSelectInList<T extends ItemWithID>(list: T[]) {
  const itemIds = useMemo(() => list.map((q) => q.id), [list]);
  const [selectedItems, setSelectedItems] = useState<Set<T["id"]>>(new Set());

  const allSelected: CheckedState =
    selectedItems.size === list.length && list.length > 0
      ? true
      : selectedItems.size === 0
        ? false
        : "indeterminate";

  const checkItem = useCallback(
    (questionId: T["id"], checked: CheckedState) => {
      setSelectedItems((prevSelected) => {
        const newSelected = new Set(prevSelected);
        if (checked) {
          newSelected.add(questionId);
        } else {
          newSelected.delete(questionId);
        }
        return newSelected;
      });
    },
    [],
  );

  const checkAll = useCallback(
    (checked: CheckedState) => {
      setSelectedItems(checked ? new Set(itemIds) : new Set());
    },
    [itemIds],
  );

  const resetSelection = useCallback(() => {
    setSelectedItems(new Set());
  }, []);

  return { checkItem, checkAll, resetSelection, selectedItems, allSelected };
}
