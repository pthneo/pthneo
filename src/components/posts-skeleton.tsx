import { Skeleton } from "@/components/skeleton";

export default function PostsListSkeleton() {
  return (
    <div className="space-y-6">
      {/* Search and Filter Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <div className="flex gap-4">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>

      {/* Results count skeleton */}
      <Skeleton className="h-5 w-48" />

      {/* Posts Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-4 rounded-lg border p-6">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-20 w-full" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}