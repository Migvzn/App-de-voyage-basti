import { Skeleton } from "@/components/ui/primitives";

export default function Loading() {
  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded-2xl" />
          <Skeleton className="h-5 w-32" />
        </div>
        <Skeleton className="mt-8 h-10 w-64" />
        <Skeleton className="mt-3 h-4 w-80" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-44 rounded-3xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
