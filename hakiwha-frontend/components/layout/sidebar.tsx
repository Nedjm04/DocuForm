"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Home, BookOpen, Users, Layers, FileText, BarChart2, Settings, LogOut, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed?: boolean
}

export function Sidebar({ className, isCollapsed = false }: SidebarProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const routes = [
    {
      label: "Accueil",
      icon: Home,
      href: "/",
      active: pathname === "/" || pathname === "/admin/dashboard",
    },
    {
      label: "Formations",
      icon: BookOpen,
      href: "/admin/formations",
      active: pathname.includes("/admin/formations"),
    },
    {
      label: "Groupes",
      icon: Users,
      href: "/admin/groupes",
      active: pathname.includes("/admin/groupes"),
    },
    {
      label: "Sessions",
      icon: Layers,
      href: "/admin/sessions",
      active: pathname.includes("/admin/sessions"),
    },
    {
      label: "Documents",
      icon: FileText,
      href: "/admin/documents",
      active: pathname.includes("/admin/documents"),
    },
    {
      label: "Statistiques",
      icon: BarChart2,
      href: "/admin/statistiques",
      active: pathname.includes("/admin/statistiques"),
    },
    {
      label: "Paramètres",
      icon: Settings,
      href: "/admin/parametres",
      active: pathname.includes("/admin/parametres"),
    },
  ]

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <div className="h-full border-r bg-white">
            <div className="flex h-16 items-center border-b px-4">
              <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold text-lg">
                <Image src="/images/logo-full.png" alt="DocuForm" width={150} height={40} />
              </Link>
            </div>
            <ScrollArea className="h-[calc(100vh-4rem)]">
              <div className="flex flex-col gap-2 p-4">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      route.active ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                    )}
                  >
                    <route.icon className="h-5 w-5" />
                    <span>{route.label}</span>
                  </Link>
                ))}
                <div className="mt-auto pt-4">
                  <Link
                    href="/auth/login"
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Déconnexion</span>
                  </Link>
                </div>
              </div>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
      <div className={cn("hidden border-r bg-white md:block", className)}>
        <div className="flex h-16 items-center border-b px-4">
          <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold text-lg">
            {!isCollapsed && <Image src="/images/logo-full.png" alt="DocuForm" width={150} height={40} />}
            {isCollapsed && <Image src="/images/logo-icon.png" alt="DocuForm" width={32} height={32} />}
          </Link>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="flex flex-col gap-2 p-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  route.active ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                )}
              >
                <route.icon className="h-5 w-5" />
                {!isCollapsed && <span>{route.label}</span>}
              </Link>
            ))}
            <div className="mt-auto pt-4">
              <Link
                href="/auth/login"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
              >
                <LogOut className="h-5 w-5" />
                {!isCollapsed && <span>Déconnexion</span>}
              </Link>
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  )
}
