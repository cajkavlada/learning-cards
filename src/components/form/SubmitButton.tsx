import { Button, type ButtonProps } from "../ui";
import { LoaderCircle } from "lucide-react";
import { cn } from "~/lib/utils";

export function SubmitButton({
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <Button
      className={cn("flex gap-2", className)}
      disabled={disabled}
      {...props}
    >
      {disabled && <LoaderCircle className="animate-spin" />}
      {children}
    </Button>
  );
}
