import { Skeleton } from "~/components/ui/skeleton";

export default function TestLoading() {
  return (
    <div className="flex h-full flex-col gap-4 p-6">
      <div className="w-full">
        <Skeleton className="mb-4 h-7 w-40" />
        <div className="flex justify-center">
          <Skeleton className="h-10 w-40" />
        </div>
      </div>
    </div>
  );
}
