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
import { Upload, Calendar, Users, FileText, Plus, Search } from "lucide-react"

export default function NewGroupePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  // Sample data for participants
  const availableParticipants = [
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
      router.push("/admin/groupes")
    }, 1000)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold">Nouveau Groupe</h1>
        </div>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Détails
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Calendrier
            </TabsTrigger>
            <TabsTrigger value="participants" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Participants
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <Card>
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle>Informations du groupe</CardTitle>
                  <CardDescription>Entrez les détails de base du groupe</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom du groupe</Label>
                      <Input id="name" placeholder="Ex: Groupe A - Communication" required />
                    </div>
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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="client">Client</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un client" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">OXXO Algérie</SelectItem>
                          <SelectItem value="2">ELSECOM</SelectItem>
                          <SelectItem value="3">AMC</SelectItem>
                          <SelectItem value="4">SONELGAZ</SelectItem>
                          <SelectItem value="5">Mobilis</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Date de début</Label>
                      <DatePicker date={startDate} setDate={setStartDate} />
                    </div>
                    <div className="space-y-2">
                      <Label>Date de fin</Label>
                      <DatePicker date={endDate} setDate={setEndDate} />
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
                <CardTitle>Calendrier du groupe</CardTitle>
                <CardDescription>Définissez le planning des sessions pour ce groupe</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Veuillez d'abord enregistrer les détails du groupe.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="participants">
            <Card>
              <CardHeader>
                <CardTitle>Participants</CardTitle>
                <CardDescription>Ajoutez des participants au groupe</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Importer CSV
                    </Button>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter un participant
                    </Button>
                  </div>
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Rechercher..." className="pl-8 h-9 w-full" />
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox />
                      </TableHead>
                      <TableHead className="font-medium">Nom</TableHead>
                      <TableHead className="font-medium">Email</TableHead>
                      <TableHead className="font-medium">Téléphone</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {availableParticipants.map((participant) => (
                      <TableRow key={participant.id}>
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell className="font-medium">{participant.name}</TableCell>
                        <TableCell>{participant.email}</TableCell>
                        <TableCell>{participant.phone}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="flex justify-end">
                  <Button>Ajouter les participants sélectionnés</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
