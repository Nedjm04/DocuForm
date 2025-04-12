import { ArrowDown, ArrowUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  change?: {
    value: string | number
    type: "increase" | "decrease"
  }
  className?: string
}

export function StatCard({ title, value, change, className }: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
        <div className="text-3xl font-bold mb-2">{value}</div>
        {change && (
          <div
            className={cn(
              "flex items-center text-sm",
              change.type === "increase" ? "stat-card-increase" : "stat-card-decrease",
            )}
          >
            <span>{change.value}</span>
            {change.type === "increase" ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />}
          </div>
        )}
        <div className="mt-2 h-12">
          <svg viewBox="0 0 300 50" className="w-full h-full">
            <path
              d="M0,25 C20,15 40,35 60,25 C80,15 100,35 120,25 C140,15 160,35 180,25 C200,15 220,35 240,25 C260,15 280,35 300,25"
              fill="none"
              className={cn("stroke-2", change?.type === "increase" ? "chart-increase" : "chart-decrease")}
            />
          </svg>
        </div>
      </CardContent>
    </Card>
  )
}
