"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/layout/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Edit, Trash2, Eye, Plus, Save } from "lucide-react"

export default function ParametresPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("general")
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: "Certificat Standard",
      type: "certificat",
      isDefault: true,
      preview: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      name: "Fiche de présence",
      type: "presence",
      isDefault: true,
      preview: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      name: "Fiche d'évaluation",
      type: "evaluation",
      isDefault: true,
      preview: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      name: "Attestation de formation",
      type: "attestation",
      isDefault: false,
      preview: "/placeholder.svg?height=200&width=300",
    },
  ])
  const [generalSettings, setGeneralSettings] = useState({
    companyName: "FormationPro",
    email: "contact@formationpro.com",
    phone: "+213 555 123 456",
    address: "123 Rue des Formations, Alger, Algérie",
    logo: "/placeholder.svg?height=100&width=100",
    enableNotifications: true,
    defaultLanguage: "fr",
  })

  useEffect(() => {
    const fetchSettings = async () => {
      setIsLoading(true)
      try {
        // Dans un environnement réel, vous feriez un appel API ici
        // const response = await api.getSettings()
        // setGeneralSettings(response.general)
        // setTemplates(response.templates)

        // Simulation pour la démo
        setTimeout(() => {
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Erreur lors de la récupération des paramètres:", error)
        setIsLoading(false)
      }
    }

    fetchSettings()
  }, [])

  const handleGeneralSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setGeneralSettings({
      ...generalSettings,
      [name]: value,
    })
  }

  const handleSaveGeneralSettings = async () => {
    try {
      // await api.updateSettings({ general: generalSettings })
      alert("Paramètres généraux enregistrés avec succès!")
    } catch (error) {
      console.error("Erreur lors de l'enregistrement des paramètres:", error)
      alert("Erreur lors de l'enregistrement des paramètres")
    }
  }

  const handleSetDefaultTemplate = async (id: number) => {
    const updatedTemplates = templates.map((template) => ({
      ...template,
      isDefault:
        template.id === id
          ? true
          : template.type === templates.find((t) => t.id === id)?.type
            ? false
            : template.isDefault,
    }))
    setTemplates(updatedTemplates)
    // await api.updateTemplates(updatedTemplates)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold">Paramètres</h1>
        </div>

        <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="templates">Modèles de documents</TabsTrigger>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres généraux</CardTitle>
                <CardDescription>Configurez les informations de base de votre entreprise</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Nom de l'entreprise</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={generalSettings.companyName}
                      onChange={handleGeneralSettingsChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={generalSettings.email}
                      onChange={handleGeneralSettingsChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={generalSettings.phone}
                      onChange={handleGeneralSettingsChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="defaultLanguage">Langue par défaut</Label>
                    <Select
                      value={generalSettings.defaultLanguage}
                      onValueChange={(value) => setGeneralSettings({ ...generalSettings, defaultLanguage: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une langue" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="en">Anglais</SelectItem>
                        <SelectItem value="ar">Arabe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={generalSettings.address}
                    onChange={handleGeneralSettingsChange}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Logo de l'entreprise</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 border rounded-md overflow-hidden">
                      <img
                        src={generalSettings.logo || "/placeholder.svg"}
                        alt="Logo de l'entreprise"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <Button variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Changer le logo
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="enableNotifications"
                    checked={generalSettings.enableNotifications}
                    onCheckedChange={(checked) =>
                      setGeneralSettings({ ...generalSettings, enableNotifications: checked })
                    }
                  />
                  <Label htmlFor="enableNotifications">Activer les notifications par email</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveGeneralSettings}>
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer les modifications
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="templates">
            <Card>
              <CardHeader>
                <CardTitle>Modèles de documents</CardTitle>
                <CardDescription>Gérez les modèles de documents pour vos formations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-end">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter un modèle
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <Card key={template.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative">
                          <img
                            src={template.preview || "/placeholder.svg"}
                            alt={template.name}
                            className="w-full h-auto"
                          />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/50 transition-opacity">
                            <div className="flex gap-2">
                              <Button size="sm" variant="secondary">
                                <Eye className="h-4 w-4 mr-1" />
                                Aperçu
                              </Button>
                              <Button size="sm" variant="secondary">
                                <Edit className="h-4 w-4 mr-1" />
                                Modifier
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="p-3">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{template.name}</h3>
                            {template.isDefault && (
                              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                Par défaut
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Type: {template.type.charAt(0).toUpperCase() + template.type.slice(1)}
                          </p>
                          <div className="flex justify-between items-center mt-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSetDefaultTemplate(template.id)}
                              disabled={template.isDefault}
                            >
                              {template.isDefault ? "Par défaut" : "Définir par défaut"}
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <Card className="overflow-hidden border-dashed">
                    <CardContent className="p-0 h-full">
                      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                        <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                        <h3 className="font-medium">Créer un nouveau modèle</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Personnalisez votre propre modèle de document
                        </p>
                        <Button className="mt-4">Créer un modèle</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des utilisateurs</CardTitle>
                <CardDescription>Gérez les utilisateurs et leurs permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end mb-4">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter un utilisateur
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-medium">Nom</TableHead>
                      <TableHead className="font-medium">Email</TableHead>
                      <TableHead className="font-medium">Rôle</TableHead>
                      <TableHead className="font-medium">Statut</TableHead>
                      <TableHead className="text-right font-medium">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Admin</TableCell>
                      <TableCell>admin@example.com</TableCell>
                      <TableCell>Administrateur</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Actif
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Modifier
                          </Button>
                          <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Supprimer
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Formateur</TableCell>
                      <TableCell>formateur@example.com</TableCell>
                      <TableCell>Formateur</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Actif
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Modifier
                          </Button>
                          <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Supprimer
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
