import { cn } from "~/lib/utils";
import type { HTMLAttributes } from "react";

export function PageHeader({
  title,
  description,
  className,
  children,
}: {
  title: string;
  description?: string | null;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-4 w-full px-4", className)}>
      <div className="flex w-full flex-wrap gap-4">
        <h1 className="truncate text-nowrap text-3xl font-bold">{title}</h1>
        {children}
      </div>
      {description && <p className="whitespace-pre-line pt-2">{description}</p>}
    </div>
  );
}
