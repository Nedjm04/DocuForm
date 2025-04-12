import { AdminLayout } from "@/components/layout/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { FileText, Download, QrCode, Printer, Eye } from "lucide-react"

export default function DocumentsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold">Génération de Documents</h1>
        </div>

        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="generate">Générer des documents</TabsTrigger>
            <TabsTrigger value="history">Historique des documents</TabsTrigger>
          </TabsList>

          <TabsContent value="generate">
            <Card>
              <CardHeader>
                <CardTitle>Générer des documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="formation">Sélectionner une formation</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir une formation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Communication NLP - OXXO Algérie</SelectItem>
                      <SelectItem value="2">Scrum Niv1 - ELSECOM</SelectItem>
                      <SelectItem value="3">Linux Avancé - AMC</SelectItem>
                      <SelectItem value="4">HACCP - SONELGAZ</SelectItem>
                      <SelectItem value="5">HSE - Mobilis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="bg-secondary">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <FileText className="h-10 w-10 text-primary mb-4" />
                      <h3 className="font-medium mb-2">Fiche de présence</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Générer la fiche de présence avec cases signature
                      </p>
                      <Button>Générer</Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-secondary">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <FileText className="h-10 w-10 text-primary mb-4" />
                      <h3 className="font-medium mb-2">Fiche d'évaluation</h3>
                      <p className="text-sm text-muted-foreground mb-4">Générer la fiche d'évaluation à chaud</p>
                      <Button>Générer</Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-secondary">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <FileText className="h-10 w-10 text-primary mb-4" />
                      <h3 className="font-medium mb-2">Fiche d'appréciation</h3>
                      <p className="text-sm text-muted-foreground mb-4">Générer la fiche d'appréciation du formateur</p>
                      <Button>Générer</Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-secondary">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <FileText className="h-10 w-10 text-primary mb-4" />
                      <h3 className="font-medium mb-2">Fiche pédagogique</h3>
                      <p className="text-sm text-muted-foreground mb-4">Générer la fiche de déroulement pédagogique</p>
                      <Button>Générer</Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-secondary">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <FileText className="h-10 w-10 text-primary mb-4" />
                      <h3 className="font-medium mb-2">Liste des participants</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Générer la liste des participants avec taux de présence
                      </p>
                      <Button>Générer</Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-secondary">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <QrCode className="h-10 w-10 text-primary mb-4" />
                      <h3 className="font-medium mb-2">Certificats</h3>
                      <p className="text-sm text-muted-foreground mb-4">Générer tous les certificats avec QR code</p>
                      <Button>Générer</Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Historique des documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <h3 className="font-medium">Communication NLP - OXXO Algérie</h3>
                        <p className="text-sm text-muted-foreground">Généré le 20 mai 2024</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Aperçu
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Télécharger
                        </Button>
                        <Button variant="outline" size="sm">
                          <Printer className="h-4 w-4 mr-2" />
                          Imprimer
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      <div className="border rounded p-2 text-sm">Fiche de présence</div>
                      <div className="border rounded p-2 text-sm">Fiche d'évaluation</div>
                      <div className="border rounded p-2 text-sm">Certificats (12)</div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <h3 className="font-medium">Scrum Niv1 - ELSECOM</h3>
                        <p className="text-sm text-muted-foreground">Généré le 19 mai 2024</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Aperçu
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Télécharger
                        </Button>
                        <Button variant="outline" size="sm">
                          <Printer className="h-4 w-4 mr-2" />
                          Imprimer
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      <div className="border rounded p-2 text-sm">Fiche de présence</div>
                      <div className="border rounded p-2 text-sm">Fiche pédagogique</div>
                      <div className="border rounded p-2 text-sm">Liste des participants</div>
                      <div className="border rounded p-2 text-sm">Certificats (8)</div>
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
