import { cn } from "~/lib/utils";
import { Button, type ButtonProps } from "../button";

export function EditorButton({
  isActive,
  className,
  ...props
}: {
  isActive?: boolean;
} & ButtonProps) {
  return (
    <Button
      className={cn("h-8 w-8 p-0", className)}
      variant={isActive ? "default" : "outline"}
      tabIndex={-1}
      type="button"
      {...props}
    />
  );
}
