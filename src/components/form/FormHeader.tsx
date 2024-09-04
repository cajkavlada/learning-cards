import type { HTMLAttributes } from "react";
import { cn } from "~/lib/utils";

export function FormHeader({
  className,
  ...props
}: { className?: string } & HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className,
      )}
      {...props}
    />
  );
}
