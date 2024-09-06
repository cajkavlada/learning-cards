import { Button, type ButtonProps } from "../ui";
import { LoaderCircle } from "lucide-react";
import { cn } from "~/lib/utils";

export function LoadingButton({
  children,
  className,
  loading,
  ...props
}: { loading?: boolean } & ButtonProps) {
  return (
    <Button
      className={cn("flex gap-2", className)}
      disabled={loading}
      {...props}
    >
      {loading && <LoaderCircle className="animate-spin" />}
      {children}
    </Button>
  );
}
