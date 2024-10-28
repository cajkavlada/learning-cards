import { Skeleton } from "~/components/ui/skeleton";

export function TopicFormSkeleton() {
  return (
    <div className="w-full px-6">
      <div className="flex flex-col gap-4 pt-5">
        <div>
          <Skeleton className="h-4 w-16" />
          <Skeleton className="mt-1 h-9 w-full" />
        </div>
        <div>
          <Skeleton className="h-4 w-16" />
          <Skeleton className="mt-1 h-9 w-full" />
        </div>
      </div>
      <div className="flex justify-end pt-3.5">
        <Skeleton className="h-9 w-16" />
      </div>
    </div>
  );
}
