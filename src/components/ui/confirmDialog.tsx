import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./dialog";
import { LoadingButton } from "../form";

export function ConfirmDialog({
  title,
  description,
  onSubmit,
  submitLoading,
  submitLabel = "Confirm",
}: {
  title?: string;
  description?: string;
  onSubmit: () => void;
  submitLoading?: boolean;
  submitLabel?: string;
}) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <LoadingButton loading={submitLoading} onClick={onSubmit}>
          {submitLabel}
        </LoadingButton>
      </DialogFooter>
    </DialogContent>
  );
}
