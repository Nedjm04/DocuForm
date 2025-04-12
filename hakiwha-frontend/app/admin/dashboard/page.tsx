import Link from "next/link"
import { AdminLayout } from "@/components/layout/admin-layout"
import { StatCard } from "@/components/ui/stat-card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ChevronDown } from "lucide-react"
import { routes } from "@/app/routes"

export default function DashboardPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold">
            <span className="text-amber-500">👋</span> Bonjour et bienvenue dans votre espace de gestion!
          </h1>
          <div className="flex gap-4">
            <Button asChild>
              <Link href={routes.admin.formations.new}>+ Ajouter une formation</Link>
            </Button>
            <Button asChild>
              <Link href={routes.admin.sessions.new}>+ Ajouter une session</Link>
            </Button>
          </div>
        </div>

        <Card className="w-full md:max-w-md">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white">AD</div>
            <div>
              <h3 className="font-medium">Welcome</h3>
              <p className="text-sm text-muted-foreground">Admin</p>
            </div>
            <Button variant="outline" className="ml-auto">
              Sign out
            </Button>
          </CardContent>
        </Card>

        {/* Stats cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Total formations créées"
            value="1923"
            change={{ value: "0,5k increase", type: "increase" }}
          />
          <StatCard title="Nombre des stagiaires" value="1340" change={{ value: "3% decrease", type: "decrease" }} />
          <StatCard title="Nombres de Groupes" value="3543" change={{ value: "7% increase", type: "increase" }} />
        </div>

        {/* Recent sessions table */}
        <div className="bg-white border rounded-lg shadow-sm">
          <div className="p-4 border-b">
            <h2 className="text-lg font-mediumm">Sessions récentes</h2>
          </div>

          <div className="p-4 border-b">
            <div className="relative w-full">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Rechercher..." className="pl-8 h-9 w-full" />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium">
                  <div className="flex items-center">
                    Formation
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </div>
                </TableHead>
                <TableHead className="font-medium">
                  <div className="flex items-center">
                    Client
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </div>
                </TableHead>
                <TableHead className="font-medium">Session</TableHead>
                <TableHead className="font-medium">Groupe</TableHead>
                <TableHead className="font-medium">
                  <div className="flex items-center">
                    Status
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </div>
                </TableHead>
                <TableHead className="font-medium">
                  <div className="flex items-center">
                    Date début
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </div>
                </TableHead>
                <TableHead className="text-right font-medium"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Communication NLP</TableCell>
                <TableCell>OXXO Algérie</TableCell>
                <TableCell>2</TableCell>
                <TableCell>3</TableCell>
                <TableCell>
                  <StatusBadge status="delivered" />
                </TableCell>
                <TableCell>May 20, 2024</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    Open
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Scrum Niv1</TableCell>
                <TableCell>ELSECOM</TableCell>
                <TableCell>1</TableCell>
                <TableCell>6</TableCell>
                <TableCell>
                  <StatusBadge status="processing" />
                </TableCell>
                <TableCell>May 19, 2024</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    Open
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Linux Avancé</TableCell>
                <TableCell>AMC</TableCell>
                <TableCell>4</TableCell>
                <TableCell>1</TableCell>
                <TableCell>
                  <StatusBadge status="processing" />
                </TableCell>
                <TableCell>May 19, 2024</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    Open
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>HACCP</TableCell>
                <TableCell>SONELGAZ</TableCell>
                <TableCell>2</TableCell>
                <TableCell>13</TableCell>
                <TableCell>
                  <StatusBadge status="delivered" />
                </TableCell>
                <TableCell>May 18, 2024</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    Open
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>HSE</TableCell>
                <TableCell>Mobilis</TableCell>
                <TableCell>1</TableCell>
                <TableCell>1</TableCell>
                <TableCell>
                  <StatusBadge status="new" />
                </TableCell>
                <TableCell>May 18, 2024</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    Open
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Par page</span>
              <Select defaultValue="5">
                <SelectTrigger className="w-16 h-8">
                  <SelectValue placeholder="5" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline">Suivant</Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
