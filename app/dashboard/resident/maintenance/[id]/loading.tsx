import { Skeleton } from "@/components/ui/skeleton"

export default function MaintenanceDetailLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <Skeleton className="h-10 w-40 rounded-xl" />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-[400px] w-full rounded-3xl" />
          <Skeleton className="h-[200px] w-full rounded-3xl" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-[500px] w-full rounded-3xl" />
        </div>
      </div>
    </div>
  )
}
