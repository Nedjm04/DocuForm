"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/layout/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatCard } from "@/components/ui/stat-card"
import { BarChart } from "@/components/charts/bar-chart"
import { LineChart } from "@/components/charts/line-chart"
import { PieChart } from "@/components/charts/pie-chart"

export default function StatistiquesPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [period, setPeriod] = useState("month")
  const [stats, setStats] = useState({
    totalFormations: 0,
    totalStagiaires: 0,
    totalGroupes: 0,
    totalSessions: 0,
    formationsParCategorie: [],
    formationsParMois: [],
    stagiairesParFormation: [],
    evaluationsParFormation: [],
  })

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true)
      try {
        // Dans un environnement réel, vous feriez un appel API ici
        // const response = await api.getStats(period)
        // setStats(response)

        // Simulation de données pour la démo
        setTimeout(() => {
          setStats({
            totalFormations: 1923,
            totalStagiaires: 1340,
            totalGroupes: 3543,
            totalSessions: 4210,
            formationsParCategorie: [
              { name: "Soft Skills", value: 35 },
              { name: "IT", value: 25 },
              { name: "Management", value: 20 },
              { name: "Qualité", value: 10 },
              { name: "Sécurité", value: 10 },
            ],
            formationsParMois: [
              { name: "Jan", value: 65 },
              { name: "Fév", value: 59 },
              { name: "Mar", value: 80 },
              { name: "Avr", value: 81 },
              { name: "Mai", value: 90 },
              { name: "Juin", value: 125 },
              { name: "Juil", value: 110 },
              { name: "Août", value: 70 },
              { name: "Sep", value: 85 },
              { name: "Oct", value: 95 },
              { name: "Nov", value: 100 },
              { name: "Déc", value: 120 },
            ],
            stagiairesParFormation: [
              { name: "Communication NLP", value: 120 },
              { name: "Scrum Niv1", value: 80 },
              { name: "Linux Avancé", value: 60 },
              { name: "HACCP", value: 150 },
              { name: "HSE", value: 100 },
            ],
            evaluationsParFormation: [
              { name: "Communication NLP", value: 4.5 },
              { name: "Scrum Niv1", value: 4.2 },
              { name: "Linux Avancé", value: 4.7 },
              { name: "HACCP", value: 3.9 },
              { name: "HSE", value: 4.1 },
            ],
          })
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Erreur lors de la récupération des statistiques:", error)
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [period])

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold">Statistiques</h1>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Cette semaine</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
              <SelectItem value="quarter">Ce trimestre</SelectItem>
              <SelectItem value="year">Cette année</SelectItem>
              <SelectItem value="all">Toutes les données</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Cartes de statistiques */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total formations créées"
            value={stats.totalFormations}
            change={{ value: "0,5k increase", type: "increase" }}
          />
          <StatCard
            title="Nombre des stagiaires"
            value={stats.totalStagiaires}
            change={{ value: "3% decrease", type: "decrease" }}
          />
          <StatCard
            title="Nombres de Groupes"
            value={stats.totalGroupes}
            change={{ value: "7% increase", type: "increase" }}
          />
          <StatCard
            title="Sessions réalisées"
            value={stats.totalSessions}
            change={{ value: "12% increase", type: "increase" }}
          />
        </div>

        <Tabs defaultValue="formations" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="formations">Formations</TabsTrigger>
            <TabsTrigger value="stagiaires">Stagiaires</TabsTrigger>
            <TabsTrigger value="evaluations">Évaluations</TabsTrigger>
          </TabsList>

          <TabsContent value="formations">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Formations par catégorie</CardTitle>
                  <CardDescription>Répartition des formations par catégorie</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <PieChart data={stats.formationsParCategorie} isLoading={isLoading} />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Formations par mois</CardTitle>
                  <CardDescription>Nombre de formations créées par mois</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <BarChart data={stats.formationsParMois} isLoading={isLoading} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="stagiaires">
            <Card>
              <CardHeader>
                <CardTitle>Stagiaires par formation</CardTitle>
                <CardDescription>Nombre de stagiaires par formation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <BarChart data={stats.stagiairesParFormation} isLoading={isLoading} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="evaluations">
            <Card>
              <CardHeader>
                <CardTitle>Évaluations par formation</CardTitle>
                <CardDescription>Note moyenne des évaluations par formation (sur 5)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <LineChart data={stats.evaluationsParFormation} isLoading={isLoading} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
