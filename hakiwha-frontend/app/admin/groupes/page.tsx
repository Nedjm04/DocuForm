import Link from "next/link"
import { AdminLayout } from "@/components/layout/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, Users, FileText } from "lucide-react"
import { routes } from "@/app/routes"

export default function GroupesPage() {
  // Sample data
  const groupes = [
    {
      id: 1,
      name: "Groupe A - Communication",
      formation: "Communication NLP",
      client: "OXXO Algérie",
      participants: 12,
      startDate: "2024-05-20",
      endDate: "2024-05-22",
      status: "active",
    },
    {
      id: 2,
      name: "Groupe B - Scrum",
      formation: "Scrum Niv1",
      client: "ELSECOM",
      participants: 8,
      startDate: "2024-05-19",
      endDate: "2024-05-20",
      status: "active",
    },
    {
      id: 3,
      name: "Groupe C - Linux",
      formation: "Linux Avancé",
      client: "AMC",
      participants: 6,
      startDate: "2024-05-19",
      endDate: "2024-05-24",
      status: "active",
    },
    {
      id: 4,
      name: "Groupe D - HACCP",
      formation: "HACCP",
      client: "SONELGAZ",
      participants: 15,
      startDate: "2024-05-18",
      endDate: "2024-05-19",
      status: "completed",
    },
    {
      id: 5,
      name: "Groupe E - HSE",
      formation: "HSE",
      client: "Mobilis",
      participants: 10,
      startDate: "2024-05-18",
      endDate: "2024-05-18",
      status: "completed",
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold">Gestion des Groupes</h1>
          <Button asChild>
            <Link href={routes.admin.groupes.new}>
              <Plus className="mr-2 h-4 w-4" />
              Nouveau Groupe
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Liste des Groupes</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Rechercher..." className="pl-8 h-9 w-full" />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-medium">Nom du Groupe</TableHead>
                  <TableHead className="font-medium">Formation</TableHead>
                  <TableHead className="font-medium">Client</TableHead>
                  <TableHead className="font-medium">Participants</TableHead>
                  <TableHead className="font-medium">Date début</TableHead>
                  <TableHead className="font-medium">Date fin</TableHead>
                  <TableHead className="font-medium">Statut</TableHead>
                  <TableHead className="text-right font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groupes.map((groupe) => (
                  <TableRow key={groupe.id}>
                    <TableCell className="font-medium">{groupe.name}</TableCell>
                    <TableCell>{groupe.formation}</TableCell>
                    <TableCell>{groupe.client}</TableCell>
                    <TableCell>{groupe.participants}</TableCell>
                    <TableCell>{new Date(groupe.startDate).toLocaleDateString("fr-FR")}</TableCell>
                    <TableCell>{new Date(groupe.endDate).toLocaleDateString("fr-FR")}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          groupe.status === "active"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                        }
                      >
                        <span className="flex items-center gap-1">
                          <span
                            className={`h-2 w-2 rounded-full ${
                              groupe.status === "active" ? "bg-green-500" : "bg-blue-500"
                            }`}
                          ></span>
                          {groupe.status === "active" ? "Actif" : "Terminé"}
                        </span>
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" asChild>
                          <Link href={routes.admin.groupes.participants(groupe.id)}>
                            <Users className="h-4 w-4" />
                            <span className="sr-only">Participants</span>
                          </Link>
                        </Button>
                        <Button variant="outline" size="icon" asChild>
                          <Link href={`${routes.admin.documents.index}?groupe=${groupe.id}`}>
                            <FileText className="h-4 w-4" />
                            <span className="sr-only">Documents</span>
                          </Link>
                        </Button>
                        <Button variant="outline" size="icon" asChild>
                          <Link href={routes.admin.groupes.edit(groupe.id)}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Modifier</span>
                          </Link>
                        </Button>
                        <Button variant="outline" size="icon" className="text-destructive hover:bg-destructive/10">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Supprimer</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
