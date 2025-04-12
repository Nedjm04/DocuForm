"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { AdminLayout } from "@/components/layout/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/ui/status-badge"
import { Search, Plus, Edit, Trash2, FileText, Download, Loader2 } from "lucide-react"
import { routes } from "@/app/routes"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Formation {
  id: number
  title: string
  category: string
  duration: string
  trainer: string
  client: string
  startDate: string
  status: "delivered" | "processing" | "new"
}

export default function FormationsPage() {
  const [formations, setFormations] = useState<Formation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fetchFormations = async () => {
      setIsLoading(true)
      try {
        // Dans un environnement réel, vous feriez un appel API ici
        // const data = await api.getFormations()
        // setFormations(data)

        // Simulation pour la démo
        setTimeout(() => {
          setFormations([
            {
              id: 1,
              title: "Communication NLP",
              category: "Soft Skills",
              duration: "3 jours",
              trainer: "Ahmed Benali",
              client: "OXXO Algérie",
              startDate: "2024-05-20",
              status: "delivered",
            },
            {
              id: 2,
              title: "Scrum Niv1",
              category: "Gestion de Projet",
              duration: "2 jours",
              trainer: "Karim Hadj",
              client: "ELSECOM",
              startDate: "2024-05-19",
              status: "processing",
            },
            {
              id: 3,
              title: "Linux Avancé",
              category: "IT",
              duration: "5 jours",
              trainer: "Sofiane Amara",
              client: "AMC",
              startDate: "2024-05-19",
              status: "processing",
            },
            {
              id: 4,
              title: "HACCP",
              category: "Qualité",
              duration: "2 jours",
              trainer: "Leila Mansouri",
              client: "SONELGAZ",
              startDate: "2024-05-18",
              status: "delivered",
            },
            {
              id: 5,
              title: "HSE",
              category: "Sécurité",
              duration: "1 jour",
              trainer: "Yacine Kaci",
              client: "Mobilis",
              startDate: "2024-05-18",
              status: "new",
            },
          ])
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Erreur lors de la récupération des formations:", error)
        setIsLoading(false)
      }
    }

    fetchFormations()
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const filteredFormations = formations.filter(
    (formation) =>
      formation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formation.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formation.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formation.trainer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = async () => {
    if (!deleteId) return

    setIsDeleting(true)
    try {
      // Dans un environnement réel, vous feriez un appel API ici
      // await api.deleteFormation(deleteId)

      // Simulation pour la démo
      setTimeout(() => {
        setFormations(formations.filter((formation) => formation.id !== deleteId))
        setDeleteId(null)
        setIsDeleting(false)
      }, 1000)
    } catch (error) {
      console.error("Erreur lors de la suppression de la formation:", error)
      setIsDeleting(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold">Gestion des Formations</h1>
          <Button asChild>
            <Link href={routes.admin.formations.new}>
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle Formation
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Liste des Formations</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher..."
                className="pl-8 h-9 w-full"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-medium">Titre</TableHead>
                    <TableHead className="font-medium">Catégorie</TableHead>
                    <TableHead className="font-medium">Durée</TableHead>
                    <TableHead className="font-medium">Formateur</TableHead>
                    <TableHead className="font-medium">Client</TableHead>
                    <TableHead className="font-medium">Date début</TableHead>
                    <TableHead className="font-medium">Statut</TableHead>
                    <TableHead className="text-right font-medium">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFormations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        Aucune formation trouvée
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredFormations.map((formation) => (
                      <TableRow key={formation.id}>
                        <TableCell className="font-medium">{formation.title}</TableCell>
                        <TableCell>{formation.category}</TableCell>
                        <TableCell>{formation.duration}</TableCell>
                        <TableCell>{formation.trainer}</TableCell>
                        <TableCell>{formation.client}</TableCell>
                        <TableCell>{new Date(formation.startDate).toLocaleDateString("fr-FR")}</TableCell>
                        <TableCell>
                          <StatusBadge status={formation.status} />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="icon" asChild>
                              <Link href={routes.admin.formations.edit(formation.id)}>
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Modifier</span>
                              </Link>
                            </Button>
                            <Button variant="outline" size="icon" asChild>
                              <Link href={`${routes.admin.documents.index}?formation=${formation.id}`}>
                                <FileText className="h-4 w-4" />
                                <span className="sr-only">Documents</span>
                              </Link>
                            </Button>
                            <Button variant="outline" size="icon">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Télécharger</span>
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="text-destructive hover:bg-destructive/10"
                                  onClick={() => setDeleteId(formation.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Supprimer</span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Confirmer la suppression</DialogTitle>
                                  <DialogDescription>
                                    Êtes-vous sûr de vouloir supprimer la formation "{formation.title}" ? Cette action
                                    est irréversible.
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setDeleteId(null)}>
                                    Annuler
                                  </Button>
                                  <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                                    {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Supprimer
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
