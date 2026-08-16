import { Skeleton } from "@/components/skeleton";

export default function PostsListSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-row justify-between gap-4">
        <Skeleton className="h-10 w-80" />
        <Skeleton className="h-10 w-40" />
      </div>
      <div className="flex flex-col gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="grid grid-cols-3 p-8 md:p-4 w-full rounded-xl gap-4 sm:gap-6 xl:gap-8">
            <Skeleton className="rounded-sm col-span-3 aspect-video sm:col-span-1" />
            <div className="col-span-3 sm:col-span-2 flex flex-col gap-3">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-20 w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
