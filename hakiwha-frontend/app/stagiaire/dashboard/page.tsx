"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, LogOut, FileText, Award, User, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { routes } from "@/app/routes"

export default function StagiaireDashboardPage() {
  const [user] = useState({
    name: "Mohamed Amine",
    email: "m.amine@example.com",
  })

  const formations = [
    {
      id: 1,
      title: "Communication NLP",
      date: "20-22 Mai 2024",
      status: "completed",
      certificateAvailable: true,
      evaluationCompleted: true,
    },
    {
      id: 2,
      title: "Scrum Niveau 1",
      date: "10-11 Avril 2024",
      status: "completed",
      certificateAvailable: true,
      evaluationCompleted: false,
    },
    {
      id: 3,
      title: "Excel Avancé",
      date: "15-16 Mars 2024",
      status: "completed",
      certificateAvailable: true,
      evaluationCompleted: true,
    },
  ]

  return (
    <div className="min-h-screen bg-blue-light">
      <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-white px-4 md:px-6">
        <div className="flex items-center gap-2 font-semibold text-lg text-primary">
          <BookOpen className="h-6 w-6" />
          <span>FormationPro</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/stagiaire/login">
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Bienvenue, {user.name}</h1>
          <p className="text-muted-foreground">
            Consultez vos formations, téléchargez vos certificats et complétez vos évaluations.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-primary mb-4">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="font-medium">Mes Formations</h3>
              <p className="text-sm text-muted-foreground mt-1">{formations.length} formations suivies</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-primary mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="font-medium">Mes Certificats</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {formations.filter((f) => f.certificateAvailable).length} certificats disponibles
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-primary mb-4">
                <User className="h-6 w-6" />
              </div>
              <h3 className="font-medium">Mon Profil</h3>
              <p className="text-sm text-muted-foreground mt-1">Gérer vos informations personnelles</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Mes Formations</h2>

          {formations.map((formation) => (
            <Card key={formation.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-lg">{formation.title}</h3>
                    <p className="text-sm text-muted-foreground">{formation.date}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                        Complété
                      </Badge>
                      {!formation.evaluationCompleted && (
                        <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                          Évaluation requise
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    {formation.certificateAvailable && (
                      <Button variant="outline" asChild>
                        <Link href={routes.stagiaire.certificats.view(formation.id)}>
                          <Award className="h-4 w-4 mr-2" />
                          Certificat
                        </Link>
                      </Button>
                    )}
                    {!formation.evaluationCompleted && (
                      <Button asChild>
                        <Link href={routes.stagiaire.evaluations.submit(formation.id)}>
                          <FileText className="h-4 w-4 mr-2" />
                          Évaluer
                        </Link>
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={routes.stagiaire.formations.view(formation.id)}>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
