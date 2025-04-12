"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image";

export default function StagiaireLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmitCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Pour la démo, nous acceptons n'importe quel code
      // Dans un environnement réel, vous feriez un appel API ici

      // Simuler un délai d'authentification
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Vérifier si le code est valide (pour la démo, nous acceptons "123456")
      if (code !== "123456" && code !== "") {
        setError("Code d'accès invalide")
        setIsLoading(false)
        return
      }

      // Stocker un token factice dans le sessionStorage
      sessionStorage.setItem("stagiaire_token", "demo_token_" + Date.now())

      // Stocker les informations utilisateur
      const userData = {
        id: 1,
        name: "Mohamed Amine",
        email: "stagiaire@example.com",
        role: "stagiaire",
      }
      sessionStorage.setItem("stagiaire_data", JSON.stringify(userData))

      // Rediriger vers le tableau de bord stagiaire
      router.push("/stagiaire/dashboard")
    } catch (error) {
      console.error("Erreur de connexion:", error)
      setError("Une erreur est survenue lors de la connexion")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      // Pour la démo, nous simulons l'envoi d'un code d'accès
      // Dans un environnement réel, vous feriez un appel API ici

      // Simuler un délai d'envoi
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Afficher un message de succès
      setSuccess("Un code d'accès a été envoyé à votre adresse email.")
    } catch (error) {
      console.error("Erreur d'envoi:", error)
      setError("Une erreur est survenue lors de l'envoi du code d'accès")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-blue-light p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <Image src="/images/logo-full.png" alt="DocuForm" width={150} height={40} />
          <p className="text-sm text-muted-foreground">Espace stagiaire - Accédez à vos formations et certificats</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Connexion Stagiaire</CardTitle>
            <CardDescription>
              Accédez à votre espace stagiaire pour consulter vos formations et certificats
            </CardDescription>
          </CardHeader>
          <Tabs defaultValue="code" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="code">Code d'accès</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
            </TabsList>
            <TabsContent value="code">
              <form onSubmit={handleSubmitCode}>
                <CardContent className="space-y-4 pt-4">
                  {error && (
                    <div className="p-3 text-sm bg-red-50 border border-red-200 text-red-600 rounded-md">{error}</div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="code">Code d'accès</Label>
                    <Input
                      id="code"
                      placeholder="Entrez votre code d'accès"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">Pour la démo, utilisez le code: 123456</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Connexion en cours..." : "Se connecter"}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
            <TabsContent value="email">
              <form onSubmit={handleSubmitEmail}>
                <CardContent className="space-y-4 pt-4">
                  {error && (
                    <div className="p-3 text-sm bg-red-50 border border-red-200 text-red-600 rounded-md">{error}</div>
                  )}
                  {success && (
                    <div className="p-3 text-sm bg-green-50 border border-green-200 text-green-600 rounded-md">
                      {success}
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre.email@exemple.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Envoi en cours..." : "Recevoir un code d'accès"}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
        <div className="mt-4 text-center text-sm">
          <span className="text-muted-foreground">Accès administrateur? </span>
          <Link href="/auth/login" className="text-primary hover:underline">
            Connexion admin
          </Link>
        </div>
      </div>
    </div>
  )
}
