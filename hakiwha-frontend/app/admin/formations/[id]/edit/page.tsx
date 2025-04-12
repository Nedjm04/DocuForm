"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AdminLayout } from "@/components/layout/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, Loader2, FileText, Calendar, Users } from "lucide-react"

export default function EditFormationPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formation, setFormation] = useState({
    id: Number.parseInt(params.id),
    title: "",
    category: "",
    trainer: "",
    client: "",
    duration: "",
    startDate: "",
    description: "",
  })

  useEffect(() => {
    const fetchFormation = async () => {
      setIsLoading(true)
      try {
        // Dans un environnement réel, vous feriez un appel API ici
        // const data = await api.getFormation(params.id)
        // setFormation(data)

        // Simulation pour la démo
        setTimeout(() => {
          setFormation({
            id: Number.parseInt(params.id),
            title: "Communication NLP",
            category: "Soft Skills",
            trainer: "Ahmed Benali",
            client: "OXXO Algérie",
            duration: "3",
            startDate: "2024-05-20",
            description:
              "Formation en Programmation Neuro-Linguistique pour améliorer vos compétences en communication et développer votre influence positive.",
          })
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Erreur lors de la récupération de la formation:", error)
        setIsLoading(false)
      }
    }

    fetchFormation()
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormation({
      ...formation,
      [name]: value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormation({
      ...formation,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      // Dans un environnement réel, vous feriez un appel API ici
      // await api.updateFormation(params.id, formation)

      // Simulation pour la démo
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Rediriger vers la liste des formations
      router.push("/admin/formations")
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la formation:", error)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/admin/formations">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Modifier la Formation</h1>
          </div>
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
                  <CardDescription>Modifiez les détails de base de la formation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Titre de la formation</Label>
                      <Input
                        id="title"
                        name="title"
                        value={formation.title}
                        onChange={handleChange}
                        placeholder="Ex: Communication NLP"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Catégorie</Label>
                      <Select
                        value={formation.category}
                        onValueChange={(value) => handleSelectChange("category", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Soft Skills">Soft Skills</SelectItem>
                          <SelectItem value="IT">IT</SelectItem>
                          <SelectItem value="Management">Management</SelectItem>
                          <SelectItem value="Qualité">Qualité</SelectItem>
                          <SelectItem value="Sécurité">Sécurité</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="trainer">Formateur</Label>
                      <Input
                        id="trainer"
                        name="trainer"
                        value={formation.trainer}
                        onChange={handleChange}
                        placeholder="Nom du formateur"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="client">Client</Label>
                      <Input
                        id="client"
                        name="client"
                        value={formation.client}
                        onChange={handleChange}
                        placeholder="Nom du client"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Durée (jours)</Label>
                      <Input
                        id="duration"
                        name="duration"
                        type="number"
                        min="1"
                        value={formation.duration}
                        onChange={handleChange}
                        placeholder="Ex: 3"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Date de début</Label>
                      <Input
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={formation.startDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formation.description}
                      onChange={handleChange}
                      placeholder="Description détaillée de la formation..."
                      rows={4}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" asChild>
                    <Link href="/admin/formations">Annuler</Link>
                  </Button>
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enregistrement...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Enregistrer
                      </>
                    )}
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
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Session 1 - Introduction à la PNL</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="session1-date">Date</Label>
                        <Input id="session1-date" type="date" defaultValue="2024-05-20" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="session1-start">Heure de début</Label>
                        <Input id="session1-start" type="time" defaultValue="09:00" />
                      </div>
                      <div className="space-y-2">
                        <Label html />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="session1-end">Heure de fin</Label>
                        <Input id="session1-end" type="time" defaultValue="17:00" />
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Session 2 - Techniques de communication avancées</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="session2-date">Date</Label>
                        <Input id="session2-date" type="date" defaultValue="2024-05-21" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="session2-start">Heure de début</Label>
                        <Input id="session2-start" type="time" defaultValue="09:00" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="session2-end">Heure de fin</Label>
                        <Input id="session2-end" type="time" defaultValue="17:00" />
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Session 3 - Applications pratiques</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="session3-date">Date</Label>
                        <Input id="session3-date" type="date" defaultValue="2024-05-22" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="session3-start">Heure de début</Label>
                        <Input id="session3-start" type="time" defaultValue="09:00" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="session3-end">Heure de fin</Label>
                        <Input id="session3-end" type="time" defaultValue="17:00" />
                      </div>
                    </div>
                  </div>

                  <Button variant="outline">
                    <Save className="mr-2 h-4 w-4" />
                    Enregistrer le calendrier
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="participants">
            <Card>
              <CardHeader>
                <CardTitle>Participants</CardTitle>
                <CardDescription>Gérez les participants de cette formation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button asChild>
                    <Link href={`/admin/groupes/${params.id}/participants`}>
                      <Users className="mr-2 h-4 w-4" />
                      Voir tous les participants
                    </Link>
                  </Button>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Résumé des participants</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-muted p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold">12</p>
                        <p className="text-sm text-muted-foreground">Total des participants</p>
                      </div>
                      <div className="bg-muted p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold">10</p>
                        <p className="text-sm text-muted-foreground">Participants actifs</p>
                      </div>
                      <div className="bg-muted p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold">80%</p>
                        <p className="text-sm text-muted-foreground">Taux de présence moyen</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
