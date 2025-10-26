'use client';
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 w-full animate-pulse">
      {/* Image / Card preview */}
      <Skeleton className="h-64 w-full rounded-xl bg-gray-300" />
      {/* Title / summary lines */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full rounded bg-gray-300" />
        <Skeleton className="h-4 w-3/4 rounded bg-gray-300" />
      </div>
    </div>
  );
}
