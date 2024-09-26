"use client";

import { createContext, useCallback, useMemo, useState } from "react";
import { Dialog } from "../../ui";

const contextOutsideProviderError = () => {
  throw new Error("openDialog must be used within a DialogProvider");
};

export const DialogContext = createContext<{
  openDialog: (content: React.ReactNode) => void;
  closeDialog: () => void;
  isDialogOpen: boolean;
}>({
  openDialog: contextOutsideProviderError,
  closeDialog: contextOutsideProviderError,
  isDialogOpen: false,
});

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<React.ReactNode | null>(
    null,
  );

  const openDialog = useCallback((Content: React.ReactNode) => {
    setDialogContent(Content);
    setDialogOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setDialogOpen(false);
  }, []);

  const providerValue = useMemo(
    () => ({
      openDialog,
      closeDialog,
      isDialogOpen: dialogOpen,
    }),
    [openDialog, closeDialog, dialogOpen],
  );

  return (
    <DialogContext.Provider value={providerValue}>
      {children}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {dialogContent}
      </Dialog>
    </DialogContext.Provider>
  );
}
