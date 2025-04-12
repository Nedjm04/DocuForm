"use client"

import React, { useState } from "react"
import Link from "next/link"
import { BookOpen, ArrowLeft, FileText, Award, Calendar, Clock, MapPin, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image";

export default function FormationDetailPage({ params }: { params: { id: string } }) {
  const [formationData] = useState({
    id: params.id,
    title: "Communication NLP",
    description:
      "Formation en Programmation Neuro-Linguistique pour améliorer vos compétences en communication et développer votre influence positive.",
    date: "20-22 Mai 2024",
    duration: "3 jours (21 heures)",
    location: "Centre de formation, Alger",
    formateur: "Ahmed Benali",
    status: "completed",
    certificateAvailable: true,
    evaluationCompleted: false,
    sessions: [
      {
        id: 1,
        date: "20 Mai 2024",
        time: "09:00 - 17:00",
        title: "Introduction à la PNL",
        present: true,
      },
      {
        id: 2,
        date: "21 Mai 2024",
        time: "09:00 - 17:00",
        title: "Techniques de communication avancées",
        present: true,
      },
      {
        id: 3,
        date: "22 Mai 2024",
        time: "09:00 - 17:00",
        title: "Applications pratiques",
        present: true,
      },
    ],
    materials: [
      {
        id: 1,
        title: "Support de cours - Communication NLP",
        type: "pdf",
        url: "#",
      },
      {
        id: 2,
        title: "Exercices pratiques",
        type: "pdf",
        url: "#",
      },
      {
        id: 3,
        title: "Ressources complémentaires",
        type: "pdf",
        url: "#",
      },
    ],
  })

  return (
    <div className="min-h-screen bg-blue-light">
      <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-white px-4 md:px-6">
        <div className="flex items-center gap-2 font-semibold text-lg text-primary">
          <Image src="/images/logo-full.png" alt="DocuForm" width={150} height={40} />
        </div>
        <div className="ml-auto">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/stagiaire/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au tableau de bord
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">{formationData.title}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
              Formation complétée
            </Badge>
            {formationData.certificateAvailable && (
              <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                Certificat disponible
              </Badge>
            )}
            {!formationData.evaluationCompleted && (
              <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                Évaluation requise
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">{formationData.description}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium">Date</h3>
                  <p className="text-sm text-muted-foreground">{formationData.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium">Durée</h3>
                  <p className="text-sm text-muted-foreground">{formationData.duration}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium">Lieu</h3>
                  <p className="text-sm text-muted-foreground">{formationData.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium">Formateur</h3>
                  <p className="text-sm text-muted-foreground">{formationData.formateur}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col gap-4">
              {formationData.certificateAvailable && (
                <Button asChild>
                  <Link href={`/stagiaire/certificats/${formationData.id}`}>
                    <Award className="h-4 w-4 mr-2" />
                    Voir mon certificat
                  </Link>
                </Button>
              )}
              {!formationData.evaluationCompleted && (
                <Button variant={formationData.certificateAvailable ? "outline" : "default"} asChild>
                  <Link href={`/stagiaire/evaluations/${formationData.id}`}>
                    <FileText className="h-4 w-4 mr-2" />
                    Évaluer la formation
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="sessions" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="materials">Supports de cours</TabsTrigger>
          </TabsList>
          <TabsContent value="sessions">
            <Card>
              <CardHeader>
                <CardTitle>Sessions de formation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {formationData.sessions.map((session) => (
                    <div key={session.id} className="border rounded-lg p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <h3 className="font-medium">{session.title}</h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{session.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{session.time}</span>
                            </div>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={session.present ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                        >
                          {session.present ? "Présent" : "Absent"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="materials">
            <Card>
              <CardHeader>
                <CardTitle>Supports de cours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {formationData.materials.map((material) => (
                    <div key={material.id} className="border rounded-lg p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <h3 className="font-medium">{material.title}</h3>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <a href={material.url} download>
                            Télécharger
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
