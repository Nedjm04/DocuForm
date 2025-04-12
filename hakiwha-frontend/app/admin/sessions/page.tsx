import Link from "next/link"
import { AdminLayout } from "@/components/layout/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/ui/status-badge"
import { Search, Plus, Edit, Trash2, Calendar, FileText } from "lucide-react"
import { routes } from "@/app/routes"

export default function SessionsPage() {
  // Sample data
  const sessions = [
    {
      id: 1,
      title: "Session 1 - Communication NLP",
      formation: "Communication NLP",
      groupe: "Groupe A - Communication",
      client: "OXXO Algérie",
      formateur: "Ahmed Benali",
      date: "2024-05-20",
      heureDebut: "09:00",
      heureFin: "17:00",
      status: "delivered",
    },
    {
      id: 2,
      title: "Session 2 - Communication NLP",
      formation: "Communication NLP",
      groupe: "Groupe A - Communication",
      client: "OXXO Algérie",
      formateur: "Ahmed Benali",
      date: "2024-05-21",
      heureDebut: "09:00",
      heureFin: "17:00",
      status: "processing",
    },
    {
      id: 3,
      title: "Session 1 - Scrum Niv1",
      formation: "Scrum Niv1",
      groupe: "Groupe B - Scrum",
      client: "ELSECOM",
      formateur: "Karim Hadj",
      date: "2024-05-19",
      heureDebut: "09:00",
      heureFin: "17:00",
      status: "delivered",
    },
    {
      id: 4,
      title: "Session 1 - Linux Avancé",
      formation: "Linux Avancé",
      groupe: "Groupe C - Linux",
      client: "AMC",
      formateur: "Sofiane Amara",
      date: "2024-05-19",
      heureDebut: "09:00",
      heureFin: "17:00",
      status: "processing",
    },
    {
      id: 5,
      title: "Session 1 - HSE",
      formation: "HSE",
      groupe: "Groupe E - HSE",
      client: "Mobilis",
      formateur: "Yacine Kaci",
      date: "2024-05-18",
      heureDebut: "09:00",
      heureFin: "17:00",
      status: "new",
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold">Gestion des Sessions</h1>
          <Button asChild>
            <Link href={routes.admin.sessions.new}>
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle Session
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Liste des Sessions</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Rechercher..." className="pl-8 h-9 w-full" />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-medium">Titre</TableHead>
                  <TableHead className="font-medium">Formation</TableHead>
                  <TableHead className="font-medium">Groupe</TableHead>
                  <TableHead className="font-medium">Formateur</TableHead>
                  <TableHead className="font-medium">Date</TableHead>
                  <TableHead className="font-medium">Horaire</TableHead>
                  <TableHead className="font-medium">Statut</TableHead>
                  <TableHead className="text-right font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell className="font-medium">{session.title}</TableCell>
                    <TableCell>{session.formation}</TableCell>
                    <TableCell>{session.groupe}</TableCell>
                    <TableCell>{session.formateur}</TableCell>
                    <TableCell>{new Date(session.date).toLocaleDateString("fr-FR")}</TableCell>
                    <TableCell>{`${session.heureDebut} - ${session.heureFin}`}</TableCell>
                    <TableCell>
                      <StatusBadge status={session.status as any} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" asChild>
                          <Link href={routes.admin.sessions.presence(session.id)}>
                            <Calendar className="h-4 w-4" />
                            <span className="sr-only">Présence</span>
                          </Link>
                        </Button>
                        <Button variant="outline" size="icon" asChild>
                          <Link href={`${routes.admin.documents.index}?session=${session.id}`}>
                            <FileText className="h-4 w-4" />
                            <span className="sr-only">Documents</span>
                          </Link>
                        </Button>
                        <Button variant="outline" size="icon" asChild>
                          <Link href={routes.admin.sessions.edit(session.id)}>
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
