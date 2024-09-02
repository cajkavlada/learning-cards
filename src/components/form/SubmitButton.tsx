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
      {...props}
      className={cn("flex gap-2", className)}
      disabled={disabled}
    >
      {disabled && <LoaderCircle className="animate-spin" />}
      {children}
    </Button>
  );
}
