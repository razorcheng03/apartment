import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    description?: string;
    trend?: {
        value: number;
        isUp: boolean;
    };
    className?: string;
}

export function StatsCard({ title, value, icon: Icon, description, trend, className }: StatsCardProps) {
    return (
        <div className={cn("bg-white p-6 rounded-2xl shadow-sm border border-gray-100", className)}>
            <div className="flex items-center justify-between mb-5">
                <div className="p-2 bg-indigo-50 rounded-xl">
                    <Icon className="w-6 h-6 text-indigo-600" />
                </div>
                {trend && (
                    <span className={cn(
                        "text-xs font-medium px-2 py-1 rounded-full",
                        trend.isUp ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    )}>
                        {trend.isUp ? '+' : '-'}{trend.value}%
                    </span>
                )}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
                {description && <p className="text-xs text-gray-400 mt-1">{description}</p>}
            </div>
        </div>
    );
}
