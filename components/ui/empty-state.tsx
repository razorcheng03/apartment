import * as React from "react"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  icon: LucideIcon
  action?: React.ReactNode
}

export function EmptyState({
  title,
  description,
  icon: Icon,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-200 p-12 text-center animate-in fade-in duration-500",
        className
      )}
      {...props}
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-50">
        <Icon className="h-10 w-10 text-gray-300" />
      </div>
      <h3 className="mt-6 text-lg font-bold text-gray-900">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-gray-500 leading-relaxed">
        {description}
      </p>
      {action && <div className="mt-8">{action}</div>}
    </div>
  )
}
