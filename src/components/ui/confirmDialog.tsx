import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./dialog";
import { SubmitButton } from "../form";

export function ConfirmDialog({
  title,
  description,
  onSubmit,
  submitDisabled,
  submitLabel = "Confirm",
}: {
  title?: string;
  description?: string;
  onSubmit: () => void;
  submitDisabled?: boolean;
  submitLabel?: string;
}) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <SubmitButton disabled={submitDisabled} onClick={onSubmit}>
          {submitLabel}
        </SubmitButton>
      </DialogFooter>
    </DialogContent>
  );
}
