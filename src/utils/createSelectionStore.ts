import { create } from "zustand";
import type { CheckedState } from "@radix-ui/react-checkbox";

type ItemWithId = { id: string };

type SelectionStore<T extends ItemWithId> = {
  selectedItems: Set<T["id"]>;
  selectedItem: (id: T["id"]) => boolean;
  toggleSelectItem: (id: T["id"], selected: CheckedState) => void;
  isAllSelected: (items: T[]) => CheckedState;
  toggleSelectAll: (items: T[], selected: CheckedState) => void;
  clearSelection: () => void;
};

export function createSelectionStore<T extends ItemWithId>() {
  return create<SelectionStore<T>>((set, get) => ({
    selectedItems: new Set(),
    selectedItem: (id: T["id"]) => get().selectedItems.has(id),
    toggleSelectItem: (id: T["id"], isSelected: CheckedState) =>
      set((state) => {
        const updatedSelectedItems = new Set(state.selectedItems);
        if (isSelected) {
          updatedSelectedItems.add(id);
        } else {
          updatedSelectedItems.delete(id);
        }
        return { selectedItems: updatedSelectedItems };
      }),

    isAllSelected: (items: T[]): CheckedState => {
      const { selectedItems } = get();
      if (selectedItems.size === 0) return false;
      if (selectedItems.size === items.length) return true;
      return "indeterminate";
    },

    toggleSelectAll: (items: T[], isSelected: CheckedState) => {
      if (isSelected) {
        set({ selectedItems: new Set(items.map((item) => item.id)) });
      } else {
        set({ selectedItems: new Set() });
      }
    },

    clearSelection: () => set({ selectedItems: new Set() }),
  }));
}
