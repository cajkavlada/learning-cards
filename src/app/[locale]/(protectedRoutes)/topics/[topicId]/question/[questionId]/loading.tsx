import { Skeleton } from "~/components/ui/skeleton";

export default function EditQuestionLoading() {
  return (
    <div className="w-full px-6">
      <Skeleton className="h-5 w-28" />
      <div className="flex flex-col gap-4 pt-5">
        <div>
          <Skeleton className="h-4 w-16" />
          <Skeleton className="mt-1 h-9 w-full" />
        </div>
        <div className="w-full">
          <Skeleton className="h-4 w-16" />
          <div className="mt-2 flex gap-2">
            {Array.from({ length: 12 }).map((_, index) => (
              <Skeleton key={index} className="h-8 w-8" />
            ))}
          </div>
          <Skeleton className="mt-2 h-14 w-full" />
        </div>
      </div>
      <div className="flex justify-end pt-3.5">
        <Skeleton className="h-9 w-16" />
      </div>
    </div>
  );
}
