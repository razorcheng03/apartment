import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'error' | 'info'
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: "bg-gray-900 text-gray-50",
    secondary: "bg-gray-100 text-gray-900",
    outline: "text-gray-950 border border-gray-200",
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-700",
    error: "bg-red-100 text-red-700",
    info: "bg-indigo-100 text-indigo-700",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
