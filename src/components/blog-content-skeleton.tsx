import { Skeleton } from "@/components/skeleton";
import { AspectRatio } from "@/components/aspect-ratio";

export default function BlogContentSkeleton() {
  return (
    <div className="animate-fade-in flex-0 space-y-6 pb-6">
      {/* Banner skeleton */}
      <AspectRatio ratio={10 / 3}>
        <Skeleton className="h-full w-full rounded-md" />
      </AspectRatio>

      {/* Article content skeleton */}
      <article className="min-w-0 space-y-10 pt-6 px-4 md:px-0">
        {/* Title and metadata section */}
        <div className="space-y-4">
          {/* Title skeleton */}
          <Skeleton className="h-10 w-full sm:h-12" />
          <Skeleton className="h-10 w-3/4 sm:h-12" />

          {/* Tags and date skeleton */}
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-7 w-20 rounded-full" />
              <Skeleton className="h-7 w-24 rounded-full" />
              <Skeleton className="h-7 w-16 rounded-full" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-5 w-32" />
            </div>
          </div>
        </div>

        {/* Content skeleton */}
        <div className="min-w-0 space-y-4">
          {/* Paragraph skeletons */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <div className="pt-2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <div className="pt-4" />

          {/* Heading skeleton */}
          <Skeleton className="h-8 w-2/3 mt-8" />
          <div className="pt-2" />

          {/* More paragraph skeletons */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <div className="pt-2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <div className="pt-4" />

          {/* Code block skeleton */}
          <Skeleton className="h-48 w-full rounded-md" />
          <div className="pt-4" />

          {/* More paragraphs */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </article>
    </div>
  );
}

