import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type StatusType = "delivered" | "processing" | "new"

interface StatusBadgeProps {
  status: StatusType
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig = {
    delivered: {
      label: "Delivered",
      className: "status-badge-delivered",
      dotColor: "bg-green-500",
    },
    processing: {
      label: "Processing",
      className: "status-badge-processing",
      dotColor: "bg-amber-500",
    },
    new: {
      label: "New",
      className: "status-badge-new",
      dotColor: "bg-blue-500",
    },
  }

  const config = statusConfig[status]

  return (
    <Badge className={cn(config.className, className)}>
      <span className="flex items-center gap-1">
        <span className={cn("h-2 w-2 rounded-full", config.dotColor)}></span>
        {config.label}
      </span>
    </Badge>
  )
}
