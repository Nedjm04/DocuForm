"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/layout/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Users, FileText, Clock } from "lucide-react"

export default function NewSessionPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [sessionDate, setSessionDate] = useState<Date>()

  // Sample data for participants
  const groupParticipants = [
    { id: 1, name: "Ahmed Benali", email: "ahmed.benali@example.com", phone: "0555123456" },
    { id: 2, name: "Leila Mansouri", email: "leila.mansouri@example.com", phone: "0555789012" },
    { id: 3, name: "Karim Hadj", email: "karim.hadj@example.com", phone: "0555345678" },
    { id: 4, name: "Amina Berrada", email: "amina.berrada@example.com", phone: "0555901234" },
    { id: 5, name: "Yacine Kaci", email: "yacine.kaci@example.com", phone: "0555567890" },
  ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call to Laravel backend
    setTimeout(() => {
      setIsLoading(false)
      router.push("/admin/sessions")
    }, 1000)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold">Nouvelle Session</h1>
        </div>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Détails
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Horaire
            </TabsTrigger>
            <TabsTrigger value="participants" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Présence
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <Card>
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle>Informations de la session</CardTitle>
                  <CardDescription>Entrez les détails de base de la session</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Titre de la session</Label>
                    <Input id="title" placeholder="Ex: Session 1 - Communication NLP" required />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="formation">Formation</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une formation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Communication NLP</SelectItem>
                          <SelectItem value="2">Scrum Niv1</SelectItem>
                          <SelectItem value="3">Linux Avancé</SelectItem>
                          <SelectItem value="4">HACCP</SelectItem>
                          <SelectItem value="5">HSE</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="groupe">Groupe</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un groupe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Groupe A - Communication</SelectItem>
                          <SelectItem value="2">Groupe B - Scrum</SelectItem>
                          <SelectItem value="3">Groupe C - Linux</SelectItem>
                          <SelectItem value="4">Groupe D - HACCP</SelectItem>
                          <SelectItem value="5">Groupe E - HSE</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="formateur">Formateur</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un formateur" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Ahmed Benali</SelectItem>
                          <SelectItem value="2">Leila Mansouri</SelectItem>
                          <SelectItem value="3">Karim Hadj</SelectItem>
                          <SelectItem value="4">Sofiane Amara</SelectItem>
                          <SelectItem value="5">Yacine Kaci</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="salle">Salle</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une salle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Salle A</SelectItem>
                          <SelectItem value="2">Salle B</SelectItem>
                          <SelectItem value="3">Salle C</SelectItem>
                          <SelectItem value="4">Salle D</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={() => router.back()}>
                    Annuler
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Enregistrement..." : "Enregistrer et continuer"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Horaire de la session</CardTitle>
                <CardDescription>Définissez la date et l'horaire de la session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Date de la session</Label>
                  <DatePicker date={sessionDate} setDate={setSessionDate} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="heureDebut">Heure de début</Label>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input id="heureDebut" type="time" defaultValue="09:00" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="heureFin">Heure de fin</Label>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input id="heureFin" type="time" defaultValue="17:00" required />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pause">Pause déjeuner</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input id="pauseDebut" type="time" defaultValue="12:30" placeholder="Début" />
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input id="pauseFin" type="time" defaultValue="13:30" placeholder="Fin" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => router.back()}>
                  Annuler
                </Button>
                <Button type="button">Enregistrer et continuer</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="participants">
            <Card>
              <CardHeader>
                <CardTitle>Feuille de présence</CardTitle>
                <CardDescription>Gérez la présence des participants pour cette session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox />
                      </TableHead>
                      <TableHead className="font-medium">Nom</TableHead>
                      <TableHead className="font-medium">Email</TableHead>
                      <TableHead className="font-medium">Présent</TableHead>
                      <TableHead className="font-medium">Signature</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {groupParticipants.map((participant) => (
                      <TableRow key={participant.id}>
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell className="font-medium">{participant.name}</TableCell>
                        <TableCell>{participant.email}</TableCell>
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell>
                          <div className="h-10 w-32 border rounded-md bg-muted/20"></div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Générer feuille de présence</Button>
                  <Button>Enregistrer les présences</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
