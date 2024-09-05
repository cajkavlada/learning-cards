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
    <div className={cn("w-full px-4", className)}>
      <div className="flex w-full justify-between gap-4">
        <h1 className="flex-grow text-4xl font-bold">{title}</h1>
        {children}
      </div>
      {description && <p className="pt-2">{description}</p>}
    </div>
  );
}
