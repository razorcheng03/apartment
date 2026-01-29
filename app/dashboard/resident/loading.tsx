import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-11 w-36 rounded-xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-32 w-full rounded-3xl" />
        <Skeleton className="h-32 w-full rounded-3xl" />
        <Skeleton className="h-32 w-full rounded-3xl" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Skeleton className="lg:col-span-2 h-[400px] w-full rounded-3xl" />
        <Skeleton className="h-[400px] w-full rounded-3xl" />
      </div>
    </div>
  )
}
