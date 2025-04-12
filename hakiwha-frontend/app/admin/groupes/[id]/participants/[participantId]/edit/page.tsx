"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/layout/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Save, Loader2, User, Mail, Phone, Building, Briefcase } from "lucide-react"

interface Participant {
  id: number
  name: string
  email: string
  phone: string
  company: string
  position: string
  status: "active" | "inactive" | "pending"
  attendance: {
    sessionId: number
    sessionDate: string
    sessionTitle: string
    present: boolean
  }[]
}

export default function EditParticipantPage({
  params,
}: {
  params: { id: string; participantId: string }
}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [participant, setParticipant] = useState<Participant | null>(null)

  useEffect(() => {
    const fetchParticipant = async () => {
      setIsLoading(true)
      try {
        // Dans un environnement réel, vous feriez un appel API ici
        // const data = await api.getParticipant(params.participantId)
        // setParticipant(data)

        // Simulation pour la démo
        setTimeout(() => {
          setParticipant({
            id: Number.parseInt(params.participantId),
            name: "Ahmed Benali",
            email: "ahmed.benali@example.com",
            phone: "0555123456",
            company: "OXXO Algérie",
            position: "Responsable RH",
            status: "active",
            attendance: [
              {
                sessionId: 1,
                sessionDate: "20 Mai 2024",
                sessionTitle: "Session 1 - Introduction à la PNL",
                present: true,
              },
              {
                sessionId: 2,
                sessionDate: "21 Mai 2024",
                sessionTitle: "Session 2 - Techniques de communication avancées",
                present: true,
              },
              {
                sessionId: 3,
                sessionDate: "22 Mai 2024",
                sessionTitle: "Session 3 - Applications pratiques",
                present: true,
              },
            ],
          })
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Erreur lors de la récupération du participant:", error)
        setIsLoading(false)
      }
    }

    fetchParticipant()
  }, [params.participantId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!participant) return
    const { name, value } = e.target
    setParticipant({
      ...participant,
      [name]: value,
    })
  }

  const handleStatusChange = (value: string) => {
    if (!participant) return
    setParticipant({
      ...participant,
      status: value as "active" | "inactive" | "pending",
    })
  }

  const handleAttendanceChange = (sessionId: number, present: boolean) => {
    if (!participant) return
    setParticipant({
      ...participant,
      attendance: participant.attendance.map((a) => (a.sessionId === sessionId ? { ...a, present } : a)),
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!participant) return

    setIsSaving(true)
    try {
      // Dans un environnement réel, vous feriez un appel API ici
      // await api.updateParticipant(params.participantId, participant)

      // Simulation pour la démo
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Rediriger vers la page des participants
      router.push(`/admin/groupes/${params.id}/participants`)
    } catch (error) {
      console.error("Erreur lors de la mise à jour du participant:", error)
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

  if (!participant) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-[50vh]">
          <p>Participant non trouvé</p>
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
              <Link href={`/admin/groupes/${params.id}/participants`}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Modifier le participant</h1>
          </div>
        </div>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info">Informations</TabsTrigger>
            <TabsTrigger value="attendance">Présence</TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <Card>
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle>Informations du participant</CardTitle>
                  <CardDescription>Modifiez les informations personnelles du participant</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Nom complet
                      </Label>
                      <Input id="name" name="name" value={participant.name} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={participant.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Téléphone
                      </Label>
                      <Input id="phone" name="phone" value={participant.phone} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Statut
                      </Label>
                      <Select value={participant.status} onValueChange={handleStatusChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un statut" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Actif</SelectItem>
                          <SelectItem value="inactive">Inactif</SelectItem>
                          <SelectItem value="pending">En attente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company" className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        Entreprise
                      </Label>
                      <Input id="company" name="company" value={participant.company} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position" className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        Poste
                      </Label>
                      <Input id="position" name="position" value={participant.position} onChange={handleChange} />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" asChild>
                    <Link href={`/admin/groupes/${params.id}/participants`}>Annuler</Link>
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

          <TabsContent value="attendance">
            <Card>
              <CardHeader>
                <CardTitle>Présence aux sessions</CardTitle>
                <CardDescription>Gérez la présence du participant aux différentes sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-medium">Date</TableHead>
                      <TableHead className="font-medium">Session</TableHead>
                      <TableHead className="font-medium">Présent</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {participant.attendance.map((attendance) => (
                      <TableRow key={attendance.sessionId}>
                        <TableCell>{attendance.sessionDate}</TableCell>
                        <TableCell>{attendance.sessionTitle}</TableCell>
                        <TableCell>
                          <Checkbox
                            checked={attendance.present}
                            onCheckedChange={(checked) =>
                              handleAttendanceChange(attendance.sessionId, checked === true)
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" asChild>
                  <Link href={`/admin/groupes/${params.id}/participants`}>Annuler</Link>
                </Button>
                <Button onClick={() => handleSubmit({ preventDefault: () => {} } as any)} disabled={isSaving}>
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
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
