import { Skeleton } from "~/components/ui/skeleton";

export function TopicListSkeleton() {
  return (
    <>
      <div className="flex min-h-10 items-center pb-1 pl-10 pr-4">
        <Skeleton className="h-4 w-4 rounded-sm" />
      </div>
      <div className="flex flex-wrap gap-4 overflow-hidden px-4 py-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-40 min-w-[250px] max-w-[350px] flex-1 flex-grow"
          />
        ))}
      </div>
    </>
  );
}
