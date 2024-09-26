import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { useDialog } from "./useDialog";

export function DialogLayout({
  children,
  title,
  description,
  cancelLabel,
  submitLabel,
  onSubmit,
  onCancel,
  className,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
  cancelLabel?: string;
  submitLabel?: string;
  onSubmit?: () => void;
  onCancel?: () => void;
  className?: string;
}) {
  const { closeDialog } = useDialog();

  return (
    <DialogContent className={className}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        {description && (
          <DialogDescription>{description ?? ""}</DialogDescription>
        )}
      </DialogHeader>
      {children}
      <DialogFooter className="mt-8 p-2 sm:justify-between">
        {cancelLabel && (
          <Button
            variant="ghost"
            onClick={() => {
              onCancel?.();
              closeDialog();
            }}
          >
            {cancelLabel}
          </Button>
        )}
        {submitLabel && onSubmit && (
          <Button onClick={onSubmit}>{submitLabel}</Button>
        )}
      </DialogFooter>
    </DialogContent>
  );
}
