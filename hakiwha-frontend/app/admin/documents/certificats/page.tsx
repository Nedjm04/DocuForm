"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AdminLayout } from "@/components/layout/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Download, Printer, QrCode, Eye, Upload, Save, Edit, Plus, BookOpen, ArrowRight } from "lucide-react"

export default function CertificatsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("generate")
  const [isLoading, setIsLoading] = useState(false)

  // Sample data
  const formations = [
    { id: 1, title: "Communication NLP", client: "OXXO Algérie", participants: 12 },
    { id: 2, title: "Scrum Niv1", client: "ELSECOM", participants: 8 },
    { id: 3, title: "Linux Avancé", client: "AMC", participants: 6 },
    { id: 4, title: "HACCP", client: "SONELGAZ", participants: 15 },
    { id: 5, title: "HSE", client: "Mobilis", participants: 10 },
  ]

  const participants = [
    { id: 1, name: "Ahmed Benali", email: "ahmed.benali@example.com", present: true },
    { id: 2, name: "Leila Mansouri", email: "leila.mansouri@example.com", present: true },
    { id: 3, name: "Karim Hadj", email: "karim.hadj@example.com", present: false },
    { id: 4, name: "Amina Berrada", email: "amina.berrada@example.com", present: true },
    { id: 5, name: "Yacine Kaci", email: "yacine.kaci@example.com", present: true },
  ]

  const templates = [
    { id: 1, name: "Certificat Standard", preview: "/placeholder.svg?height=200&width=300" },
    { id: 2, name: "Certificat Premium", preview: "/placeholder.svg?height=200&width=300" },
    { id: 3, name: "Certificat Minimaliste", preview: "/placeholder.svg?height=200&width=300" },
  ]

  const handleGenerate = () => {
    setIsLoading(true)

    // Simulate API call to Laravel backend
    setTimeout(() => {
      setIsLoading(false)
      setActiveTab("preview")
    }, 1500)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Gestion des Certificats</h1>
            <p className="text-muted-foreground">Créez, personnalisez et générez des certificats pour vos formations</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/admin/documents">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux documents
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="generate" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="generate">Générer des certificats</TabsTrigger>
            <TabsTrigger value="templates">Modèles de certificats</TabsTrigger>
            <TabsTrigger value="preview">Aperçu et téléchargement</TabsTrigger>
          </TabsList>

          <TabsContent value="generate">
            <Card>
              <CardHeader>
                <CardTitle>Générer des certificats</CardTitle>
                <CardDescription>
                  Sélectionnez une formation et les participants pour générer des certificats
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="formation">Formation</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une formation" />
                    </SelectTrigger>
                    <SelectContent>
                      {formations.map((formation) => (
                        <SelectItem key={formation.id} value={formation.id.toString()}>
                          {formation.title} - {formation.client}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="template">Modèle de certificat</Label>
                  <Select defaultValue="1">
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un modèle" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id.toString()}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Participants</Label>
                    <div className="flex items-center gap-2">
                      <Checkbox id="selectAll" />
                      <Label htmlFor="selectAll" className="text-sm">
                        Sélectionner tous
                      </Label>
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
                        <TableHead className="font-medium">Présent</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {participants.map((participant) => (
                        <TableRow key={participant.id}>
                          <TableCell>
                            <Checkbox checked={participant.present} />
                          </TableCell>
                          <TableCell className="font-medium">{participant.name}</TableCell>
                          <TableCell>{participant.email}</TableCell>
                          <TableCell>{participant.present ? "Oui" : "Non"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signature">Signature</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-64 border rounded-md bg-muted/20 flex items-center justify-center text-sm text-muted-foreground">
                      Signature du formateur
                    </div>
                    <Button variant="outline" size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      Importer
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalText">Texte supplémentaire (optionnel)</Label>
                  <Textarea id="additionalText" placeholder="Texte à ajouter sur le certificat..." />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => router.push("/admin/documents")}>
                  Annuler
                </Button>
                <Button onClick={handleGenerate} disabled={isLoading}>
                  <QrCode className="mr-2 h-4 w-4" />
                  {isLoading ? "Génération en cours..." : "Générer les certificats"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="templates">
            <Card>
              <CardHeader>
                <CardTitle>Modèles de certificats</CardTitle>
                <CardDescription>Gérez vos modèles de certificats personnalisés</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
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
                          <h3 className="font-medium">{template.name}</h3>
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
                          Personnalisez votre propre modèle de certificat
                        </p>
                        <Button className="mt-4">Créer un modèle</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle>Aperçu des certificats</CardTitle>
                <CardDescription>Prévisualisez et téléchargez les certificats générés</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border rounded-lg p-6 bg-white">
                  <div className="relative bg-white">
                    <div className="absolute top-4 right-4 opacity-10">
                      <BookOpen className="h-24 w-24 text-primary" />
                    </div>
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-primary mb-1">FormationPro</h2>
                      <p className="text-muted-foreground">Centre de Formation Professionnelle</p>
                    </div>
                    <div className="text-center mb-8">
                      <h3 className="text-xl font-semibold mb-2">CERTIFICAT DE FORMATION</h3>
                      <p className="text-lg">Ce certificat est décerné à</p>
                      <p className="text-2xl font-bold my-4">Ahmed Benali</p>
                      <p className="text-lg">pour avoir complété avec succès la formation</p>
                      <p className="text-xl font-semibold my-4">Communication NLP</p>
                      <p className="text-base">
                        Durée: 3 jours (21 heures)
                        <br />
                        Date: 22 Mai 2024
                        <br />
                        Formateur: Ahmed Benali
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <img
                        src="/placeholder.svg?height=150&width=150"
                        alt="QR Code de vérification"
                        className="h-24 w-24"
                      />
                    </div>
                    <p className="text-center text-xs text-muted-foreground mt-2">
                      Scannez le QR code pour vérifier l'authenticité de ce certificat
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Précédent
                    </Button>
                    <span className="text-sm text-muted-foreground">1 sur 5</span>
                    <Button variant="outline" size="sm">
                      <ArrowRight className="h-4 w-4 ml-1" />
                      Suivant
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger PDF
                    </Button>
                    <Button variant="outline">
                      <Printer className="mr-2 h-4 w-4" />
                      Imprimer
                    </Button>
                    <Button>
                      <Save className="mr-2 h-4 w-4" />
                      Enregistrer tous
                    </Button>
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
