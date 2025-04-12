"use client"

import { PieChart as RechartsPieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"

interface PieChartProps {
  data: Array<{ name: string; value: number }>
  isLoading?: boolean
}

export function PieChart({ data, isLoading = false }: PieChartProps) {
  if (isLoading) {
    return <Skeleton className="h-full w-full" />
  }

  // Couleurs pour les segments du graphique
  const COLORS = ["#4a8db7", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`${value}`, "Nombre"]}
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "0.375rem",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          }}
        />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  )
}
