import type React from "react"
import { Footer } from "@/components/layout/footer"

interface StagiaireLayoutProps {
  children: React.ReactNode
}

export default function StagiaireLayout({ children }: StagiaireLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}
