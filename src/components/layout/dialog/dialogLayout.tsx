import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../ui/dialog";
import { Button, type ButtonProps } from "../../ui/button";
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
  submitVariant,
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
  submitVariant?: ButtonProps["variant"];
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
          <LoadingButton
            onClick={onSubmit}
            loading={submitLoading}
            variant={submitVariant}
          >
            {submitLabel}
          </LoadingButton>
        )}
      </DialogFooter>
    </DialogContent>
  );
}
