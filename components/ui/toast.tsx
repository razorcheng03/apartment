'use client'

import * as React from "react"
import { cn } from "@/lib/utils"
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from "lucide-react"

export type ToastVariant = 'default' | 'success' | 'error' | 'info' | 'warning'

interface ToastProps {
  id: string
  title: string
  description?: string
  variant?: ToastVariant
  onClose: (id: string) => void
}

const Toast = ({ id, title, description, variant = 'default', onClose }: ToastProps) => {
  const icons = {
    default: null,
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-indigo-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
  }

  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id)
    }, 5000)
    return () => clearTimeout(timer)
  }, [id, onClose])

  return (
    <div className={cn(
      "flex w-full max-w-md items-start gap-4 rounded-2xl border bg-white p-4 shadow-xl animate-in slide-in-from-right duration-300",
      variant === 'success' && "border-emerald-100",
      variant === 'error' && "border-red-100",
      variant === 'info' && "border-indigo-100",
      variant === 'warning' && "border-amber-100",
    )}>
      <div className="mt-0.5">{icons[variant]}</div>
      <div className="flex-1">
        <h4 className="text-sm font-bold text-gray-900">{title}</h4>
        {description && <p className="mt-1 text-xs text-gray-500">{description}</p>}
      </div>
      <button 
        onClick={() => onClose(id)}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

interface ToastContextType {
  toast: (props: Omit<ToastProps, 'id' | 'onClose'>) => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = React.useState<Omit<ToastProps, 'onClose'>[]>([])

  const toast = React.useCallback((props: Omit<ToastProps, 'id' | 'onClose'>) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, ...props }])
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-md pointer-events-none">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <Toast {...t} onClose={removeToast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = React.useContext(ToastContext)
  if (!context) throw new Error("useToast must be used within a ToastProvider")
  return context
}
