"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AdminLayout } from "@/components/layout/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Download, Printer, Save } from "lucide-react"

export default function SessionPresencePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Sample data
  const sessionInfo = {
    id: params.id,
    title: "Session 1 - Communication NLP",
    formation: "Communication NLP",
    groupe: "Groupe A - Communication",
    date: "20 Mai 2024",
    heureDebut: "09:00",
    heureFin: "17:00",
    formateur: "Ahmed Benali",
  }

  const participants = [
    { id: 1, name: "Ahmed Benali", email: "ahmed.benali@example.com", present: true, signed: true },
    { id: 2, name: "Leila Mansouri", email: "leila.mansouri@example.com", present: true, signed: true },
    { id: 3, name: "Karim Hadj", email: "karim.hadj@example.com", present: false, signed: false },
    { id: 4, name: "Amina Berrada", email: "amina.berrada@example.com", present: true, signed: true },
    { id: 5, name: "Yacine Kaci", email: "yacine.kaci@example.com", present: true, signed: false },
  ]

  const handleSave = () => {
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
          <div>
            <h1 className="text-2xl font-bold">Feuille de Présence</h1>
            <p className="text-muted-foreground">
              {sessionInfo.title} - {sessionInfo.date}
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/admin/sessions">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux sessions
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informations de la session</CardTitle>
            <CardDescription>Détails de la session et liste des participants</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Formation</h3>
                <p>{sessionInfo.formation}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Groupe</h3>
                <p>{sessionInfo.groupe}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Date</h3>
                <p>{sessionInfo.date}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Horaire</h3>
                <p>
                  {sessionInfo.heureDebut} - {sessionInfo.heureFin}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Liste des participants</h3>
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
                  {participants.map((participant) => (
                    <TableRow key={participant.id}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell className="font-medium">{participant.name}</TableCell>
                      <TableCell>{participant.email}</TableCell>
                      <TableCell>
                        <Checkbox checked={participant.present} />
                      </TableCell>
                      <TableCell>
                        {participant.signed ? (
                          <div className="h-10 w-32 border rounded-md bg-muted/20 flex items-center justify-center text-xs text-muted-foreground">
                            Signé
                          </div>
                        ) : (
                          <div className="h-10 w-32 border rounded-md bg-muted/20"></div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Télécharger PDF
              </Button>
              <Button variant="outline">
                <Printer className="mr-2 h-4 w-4" />
                Imprimer
              </Button>
            </div>
            <Button onClick={handleSave} disabled={isLoading}>
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? "Enregistrement..." : "Enregistrer les présences"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AdminLayout>
  )
}
