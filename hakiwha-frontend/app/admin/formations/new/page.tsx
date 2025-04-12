"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/layout/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Calendar, Users, FileText } from "lucide-react"

export default function NewFormationPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call to Laravel backend
    setTimeout(() => {
      setIsLoading(false)
      router.push("/admin/formations")
    }, 1000)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold">Nouvelle Formation</h1>
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
                  <CardTitle>Informations de la formation</CardTitle>
                  <CardDescription>Entrez les détails de base de la formation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Titre de la formation</Label>
                      <Input id="title" placeholder="Ex: Communication NLP" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Catégorie</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="soft-skills">Soft Skills</SelectItem>
                          <SelectItem value="it">IT</SelectItem>
                          <SelectItem value="management">Management</SelectItem>
                          <SelectItem value="qualite">Qualité</SelectItem>
                          <SelectItem value="securite">Sécurité</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="trainer">Formateur</Label>
                      <Input id="trainer" placeholder="Nom du formateur" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="client">Client</Label>
                      <Input id="client" placeholder="Nom du client" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Durée (jours)</Label>
                      <Input id="duration" type="number" min="1" placeholder="Ex: 3" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="start-date">Date de début</Label>
                      <Input id="start-date" type="date" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Description détaillée de la formation..." rows={4} />
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
                <CardTitle>Calendrier de la formation</CardTitle>
                <CardDescription>Définissez le planning des sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Veuillez d'abord enregistrer les détails de la formation.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="participants">
            <Card>
              <CardHeader>
                <CardTitle>Participants</CardTitle>
                <CardDescription>Ajoutez les participants à la formation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center border-2 border-dashed rounded-lg p-12">
                  <div className="flex flex-col items-center text-center">
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <h3 className="font-medium">Importer une liste de participants</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Glissez-déposez un fichier Excel ou CSV, ou cliquez pour parcourir
                    </p>
                    <Button variant="outline" className="mt-4">
                      Parcourir
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-center text-muted-foreground">ou</p>
                <Button className="w-full">Ajouter des participants manuellement</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
