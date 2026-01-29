'use client'

import React from 'react'
import { 
  ArrowLeft, 
  Wrench, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  MessageSquare, 
  ShieldAlert,
  XCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { cancelMaintenanceRequest } from '@/lib/actions/maintenance'
import { useToast } from '@/components/ui/toast'
import { useRouter } from 'next/navigation'

interface MaintenanceRequest {
    id: string;
    title: string;
    description: string;
    category: string;
    status: string;
    date: string;
    priority: string;
    unit: string;
}

export default function MaintenanceDetailClient({ request }: { request: MaintenanceRequest }) {
  const { toast } = useToast()
  const router = useRouter()
  const [isCancelling, setIsCancelling] = React.useState(false)
  
  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this request?")) return
    
    setIsCancelling(true)
    try {
      const result = await cancelMaintenanceRequest(request.id)
      if (result.success) {
        toast({
          title: "Request Cancelled",
          description: "Your maintenance request has been cancelled.",
          variant: "info"
        })
        router.refresh()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel request.",
        variant: "error"
      })
    } finally {
      setIsCancelling(false)
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'PENDING': return 'warning'
      case 'IN_PROGRESS': return 'info'
      case 'COMPLETED': return 'success'
      case 'CANCELLED': return 'error'
      default: return 'default'
    }
  }

  const timeline = [
    { status: 'Request Submitted', date: request.date, description: 'Your request has been received and is awaiting review.', completed: true },
    { status: 'Assigned to Technician', date: request.status !== 'PENDING' ? request.date : null, description: 'A maintenance professional has been assigned to your case.', completed: request.status !== 'PENDING' },
    { status: 'Work in Progress', date: request.status === 'COMPLETED' ? request.date : null, description: 'Technician is currently working on the issue.', completed: request.status === 'COMPLETED' },
    { status: 'Completed', date: request.status === 'COMPLETED' ? request.date : null, description: 'The issue has been resolved and verified.', completed: request.status === 'COMPLETED' },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <Link href="/dashboard/resident/maintenance">
          <Button variant="ghost" className="flex items-center gap-2 text-gray-500 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            Back to Maintenance
          </Button>
        </Link>
        {request.status !== 'COMPLETED' && request.status !== 'CANCELLED' && (
          <Button 
            variant="outline" 
            className="text-red-500 border-red-100 hover:bg-red-50"
            onClick={handleCancel}
            disabled={isCancelling}
          >
            {isCancelling ? "Cancelling..." : "Cancel Request"}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <Badge variant={getStatusVariant(request.status)} className="mb-4">
                  {request.status}
                </Badge>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{request.title}</h1>
                <p className="text-gray-400 mt-2 font-mono text-sm uppercase tracking-widest">Case ID: #{request.id.toUpperCase()}</p>
              </div>
              <div className={cn(
                "p-4 rounded-2xl",
                request.priority === 'HIGH' ? "bg-red-50 text-red-600" : "bg-indigo-50 text-indigo-600"
              )}>
                <ShieldAlert className="w-6 h-6" />
                <p className="text-[10px] font-black mt-1 text-center">{request.priority}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8 py-6 border-y border-gray-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <Wrench className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Category</p>
                  <p className="text-sm font-bold text-gray-900">{request.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <Calendar className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Date Filed</p>
                  <p className="text-sm font-bold text-gray-900">{request.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <MapPin className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Location</p>
                  <p className="text-sm font-bold text-gray-900">Unit {request.unit}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-500" />
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed bg-gray-50/50 p-6 rounded-2xl border border-gray-50 italic">
                &quot;{request.description}&quot;
              </p>
            </div>
          </div>

          <div className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Need to add more details?</h3>
              <p className="text-indigo-100 text-sm mb-6 max-w-xs">
                You can add photos or additional notes to help our technicians understand the issue better.
              </p>
              <Button className="bg-white text-indigo-600 hover:bg-indigo-50 font-bold px-8">
                Add Notes
              </Button>
            </div>
            <Wrench className="absolute -right-8 -bottom-8 w-48 h-48 text-indigo-500 opacity-20 group-hover:rotate-12 transition-transform duration-500" />
          </div>
        </div>

        {/* Sidebar Status / Timeline */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Tracking Timeline</h3>
            <div className="space-y-8">
              {timeline.map((step, i) => (
                <div key={i} className="relative flex gap-4">
                  {i !== timeline.length - 1 && (
                    <div className={cn(
                      "absolute left-4 top-8 w-0.5 h-8 bg-gray-100",
                      step.completed && "bg-emerald-500"
                    )} />
                  )}
                  <div className={cn(
                    "w-8 h-8 rounded-full shrink-0 flex items-center justify-center z-10 shadow-sm transition-colors",
                    step.completed ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-400"
                  )}>
                    {step.completed ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className={cn(
                      "text-sm font-bold leading-tight transition-colors",
                      step.completed ? "text-gray-900" : "text-gray-400"
                    )}>
                      {step.status}
                    </h4>
                    {step.date && <p className="text-[10px] font-bold text-gray-400 mt-0.5">{step.date}</p>}
                    <p className="text-xs text-gray-500 mt-2 leading-tight">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
