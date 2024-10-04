import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { useDialog } from "./useDialog";
import { LoadingButton } from "~/components/form";

export function DialogLayout({
  children,
  title,
  description,
  cancelLabel,
  submitLabel,
  onSubmit,
  onCancel,
  submitLoading,
  className,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
  cancelLabel?: string;
  submitLabel?: string;
  onSubmit?: () => void;
  onCancel?: () => void;
  submitLoading?: boolean;
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
      <DialogFooter className="mt-8 py-2 sm:justify-between">
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
          <LoadingButton onClick={onSubmit} loading={submitLoading}>
            {submitLabel}
          </LoadingButton>
        )}
      </DialogFooter>
    </DialogContent>
  );
}
