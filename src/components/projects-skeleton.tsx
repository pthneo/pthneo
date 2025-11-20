import { Skeleton } from "@/components/skeleton";

export default function ProjectsListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="rounded-xl p-8 flex flex-col">
          <div className="mb-6 flex justify-start">
            <Skeleton className="w-16 h-16 rounded-full" />
          </div>
          <Skeleton className="h-7 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-5/6 mb-1" />
          <Skeleton className="h-4 w-4/6 mb-4" />
          <Skeleton className="h-5 w-32 mt-5" />
        </div>
      ))}
    </div>
  );
}

