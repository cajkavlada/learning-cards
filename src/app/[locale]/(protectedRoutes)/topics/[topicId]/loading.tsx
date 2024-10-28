import { Skeleton } from "~/components/ui/skeleton";

export default function TopicDetailLoading() {
  return (
    <>
      <div className="mb-4 w-full px-4">
        <div className="flex w-full flex-wrap gap-4">
          <Skeleton className="h-9 w-52" />
          <Skeleton className="h-9 w-9 rounded-full" />
          <div className="ml-auto flex gap-4">
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-28" />
          </div>
        </div>
        <Skeleton className="mt-2 h-6 w-64" />
      </div>
      <div className="overflow-hidden px-4">
        <Skeleton className="h-60 w-full rounded-xl" />
      </div>
    </>
  );
}
