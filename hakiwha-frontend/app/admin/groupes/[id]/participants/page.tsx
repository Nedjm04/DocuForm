"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { AdminLayout } from "@/components/layout/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Plus, Edit, Trash2, Mail, Download, Upload, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Participant {
  id: number
  name: string
  email: string
  phone: string
  company: string
  position: string
  status: "active" | "inactive" | "pending"
  attendance: number
}

export default function GroupParticipantsPage({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [groupInfo, setGroupInfo] = useState({
    id: Number.parseInt(params.id),
    name: "Groupe A - Communication",
    formation: "Communication NLP",
    client: "OXXO Algérie",
    startDate: "20 Mai 2024",
    endDate: "22 Mai 2024",
    participants: 12,
  })
  const [participants, setParticipants] = useState<Participant[]>([])
  const [selectedParticipants, setSelectedParticipants] = useState<number[]>([])
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isAddingParticipant, setIsAddingParticipant] = useState(false)
  const [newParticipant, setNewParticipant] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    position: "",
  })

  useEffect(() => {
    const fetchParticipants = async () => {
      setIsLoading(true)
      try {
        // Dans un environnement réel, vous feriez un appel API ici
        // const data = await api.getGroupParticipants(params.id)
        // setParticipants(data)

        // Simulation pour la démo
        setTimeout(() => {
          setParticipants([
            {
              id: 1,
              name: "Ahmed Benali",
              email: "ahmed.benali@example.com",
              phone: "0555123456",
              company: "OXXO Algérie",
              position: "Responsable RH",
              status: "active",
              attendance: 100,
            },
            {
              id: 2,
              name: "Leila Mansouri",
              email: "leila.mansouri@example.com",
              phone: "0555789012",
              company: "OXXO Algérie",
              position: "Chargée de communication",
              status: "active",
              attendance: 100,
            },
            {
              id: 3,
              name: "Karim Hadj",
              email: "karim.hadj@example.com",
              phone: "0555345678",
              company: "OXXO Algérie",
              position: "Directeur commercial",
              status: "active",
              attendance: 67,
            },
            {
              id: 4,
              name: "Amina Berrada",
              email: "amina.berrada@example.com",
              phone: "0555901234",
              company: "OXXO Algérie",
              position: "Assistante de direction",
              status: "active",
              attendance: 100,
            },
            {
              id: 5,
              name: "Yacine Kaci",
              email: "yacine.kaci@example.com",
              phone: "0555567890",
              company: "OXXO Algérie",
              position: "Responsable logistique",
              status: "active",
              attendance: 33,
            },
          ])
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Erreur lors de la récupération des participants:", error)
        setIsLoading(false)
      }
    }

    fetchParticipants()
  }, [params.id])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const filteredParticipants = participants.filter(
    (participant) =>
      participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.position.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedParticipants(filteredParticipants.map((p) => p.id))
    } else {
      setSelectedParticipants([])
    }
  }

  const handleSelectParticipant = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedParticipants([...selectedParticipants, id])
    } else {
      setSelectedParticipants(selectedParticipants.filter((p) => p !== id))
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return

    setIsDeleting(true)
    try {
      // Dans un environnement réel, vous feriez un appel API ici
      // await api.deleteParticipant(deleteId)

      // Simulation pour la démo
      setTimeout(() => {
        setParticipants(participants.filter((p) => p.id !== deleteId))
        setDeleteId(null)
        setIsDeleting(false)
      }, 1000)
    } catch (error) {
      console.error("Erreur lors de la suppression du participant:", error)
      setIsDeleting(false)
    }
  }

  const handleAddParticipant = async () => {
    setIsAddingParticipant(true)
    try {
      // Dans un environnement réel, vous feriez un appel API ici
      // await api.addParticipant(params.id, newParticipant)

      // Simulation pour la démo
      setTimeout(() => {
        const newId = Math.max(...participants.map((p) => p.id)) + 1
        setParticipants([
          ...participants,
          {
            id: newId,
            ...newParticipant,
            status: "active",
            attendance: 0,
          } as Participant,
        ])
        setNewParticipant({
          name: "",
          email: "",
          phone: "",
          company: "",
          position: "",
        })
        setIsAddingParticipant(false)
      }, 1000)
    } catch (error) {
      console.error("Erreur lors de l'ajout du participant:", error)
      setIsAddingParticipant(false)
    }
  }

  const getAttendanceBadge = (attendance: number) => {
    if (attendance >= 80) {
      return <Badge className="bg-green-100 text-green-800">Excellent</Badge>
    } else if (attendance >= 50) {
      return <Badge className="bg-amber-100 text-amber-800">Moyen</Badge>
    } else {
      return <Badge className="bg-red-100 text-red-800">Faible</Badge>
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" asChild>
                <Link href="/admin/groupes">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <h1 className="text-2xl font-bold">Participants du groupe</h1>
            </div>
            <p className="text-muted-foreground mt-1">
              {groupInfo.name} - {groupInfo.formation} - {groupInfo.client}
            </p>
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter un participant
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ajouter un participant</DialogTitle>
                  <DialogDescription>Ajoutez un nouveau participant au groupe {groupInfo.name}.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet</Label>
                      <Input
                        id="name"
                        value={newParticipant.name}
                        onChange={(e) => setNewParticipant({ ...newParticipant, name: e.target.value })}
                        placeholder="Nom et prénom"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newParticipant.email}
                        onChange={(e) => setNewParticipant({ ...newParticipant, email: e.target.value })}
                        placeholder="exemple@domaine.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        value={newParticipant.phone}
                        onChange={(e) => setNewParticipant({ ...newParticipant, phone: e.target.value })}
                        placeholder="0555 123 456"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Entreprise</Label>
                      <Input
                        id="company"
                        value={newParticipant.company}
                        onChange={(e) => setNewParticipant({ ...newParticipant, company: e.target.value })}
                        placeholder="Nom de l'entreprise"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Poste</Label>
                    <Input
                      id="position"
                      value={newParticipant.position}
                      onChange={(e) => setNewParticipant({ ...newParticipant, position: e.target.value })}
                      placeholder="Poste occupé"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setNewParticipant({
                        name: "",
                        email: "",
                        phone: "",
                        company: "",
                        position: "",
                      })
                    }
                  >
                    Annuler
                  </Button>
                  <Button onClick={handleAddParticipant} disabled={isAddingParticipant}>
                    {isAddingParticipant && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Ajouter
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Importer CSV
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Période de formation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {groupInfo.startDate} - {groupInfo.endDate}
              </p>
              <p className="text-muted-foreground text-sm">3 jours de formation</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Nombre de participants</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{groupInfo.participants}</p>
              <p className="text-muted-foreground text-sm">Participants inscrits</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Taux de présence moyen</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">80%</p>
              <p className="text-muted-foreground text-sm">Sur l'ensemble des sessions</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Liste des participants</CardTitle>
            <div className="flex items-center gap-2">
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
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="inactive">Inactif</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                </SelectContent>
              </Select>
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
                    <TableHead className="w-12">
                      <Checkbox
                        checked={
                          selectedParticipants.length === filteredParticipants.length && filteredParticipants.length > 0
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead className="font-medium">Nom</TableHead>
                    <TableHead className="font-medium">Email</TableHead>
                    <TableHead className="font-medium">Téléphone</TableHead>
                    <TableHead className="font-medium">Entreprise</TableHead>
                    <TableHead className="font-medium">Poste</TableHead>
                    <TableHead className="font-medium">Présence</TableHead>
                    <TableHead className="text-right font-medium">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredParticipants.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        Aucun participant trouvé
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredParticipants.map((participant) => (
                      <TableRow key={participant.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedParticipants.includes(participant.id)}
                            onCheckedChange={(checked) => handleSelectParticipant(participant.id, checked === true)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{participant.name}</TableCell>
                        <TableCell>{participant.email}</TableCell>
                        <TableCell>{participant.phone}</TableCell>
                        <TableCell>{participant.company}</TableCell>
                        <TableCell>{participant.position}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{participant.attendance}%</span>
                            {getAttendanceBadge(participant.attendance)}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="icon">
                              <Mail className="h-4 w-4" />
                              <span className="sr-only">Envoyer un email</span>
                            </Button>
                            <Button variant="outline" size="icon" asChild>
                              <Link href={`/admin/groupes/${params.id}/participants/${participant.id}/edit`}>
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Modifier</span>
                              </Link>
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="text-destructive hover:bg-destructive/10"
                                  onClick={() => setDeleteId(participant.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Supprimer</span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Confirmer la suppression</DialogTitle>
                                  <DialogDescription>
                                    Êtes-vous sûr de vouloir supprimer le participant "{participant.name}" ? Cette
                                    action est irréversible.
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
            {selectedParticipants.length > 0 && (
              <div className="mt-4 flex items-center justify-between bg-muted p-2 rounded-md">
                <span className="text-sm">{selectedParticipants.length} participant(s) sélectionné(s)</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Mail className="mr-2 h-4 w-4" />
                    Envoyer un email
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Exporter
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Supprimer
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
