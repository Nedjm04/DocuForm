"use client"

import React, { useState } from "react"
import Link from "next/link"
import { BookOpen, ArrowLeft, Download, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image";

export default function CertificatPage({ params }: { params: { id: string } }) {
  const [certificateData] = useState({
    id: params.id,
    title: "Communication NLP",
    participant: "Mohamed Amine",
    date: "22 Mai 2024",
    duration: "3 jours (21 heures)",
    formateur: "Ahmed Benali",
    qrCode: "/placeholder.svg?height=150&width=150",
    certificateUrl: "#",
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

      <main className="container mx-auto p-4 md:p-6 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Certificat de formation</h1>
          <p className="text-muted-foreground">
            {certificateData.title} - Complété le {certificateData.date}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative bg-white p-8 border-b">
                  <div className="absolute top-4 right-4 opacity-10">
                    <BookOpen className="h-24 w-24 text-primary" />
                  </div>
                  <div className="text-center mb-8">
                    <Image src="/images/logo-full.png" alt="DocuForm" width={150} height={40} />
                    <p className="text-muted-foreground">Centre de Formation Professionnelle</p>
                  </div>
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-semibold mb-2">CERTIFICAT DE FORMATION</h3>
                    <p className="text-lg">Ce certificat est décerné à</p>
                    <p className="text-2xl font-bold my-4">{certificateData.participant}</p>
                    <p className="text-lg">pour avoir complété avec succès la formation</p>
                    <p className="text-xl font-semibold my-4">{certificateData.title}</p>
                    <p className="text-base">
                      Durée: {certificateData.duration}
                      <br />
                      Date: {certificateData.date}
                      <br />
                      Formateur: {certificateData.formateur}
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <img
                      src={certificateData.qrCode || "/placeholder.svg"}
                      alt="QR Code de vérification"
                      className="h-24 w-24"
                    />
                  </div>
                  <p className="text-center text-xs text-muted-foreground mt-2">
                    Scannez le QR code pour vérifier l'authenticité de ce certificat
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-4">Actions</h3>
                <div className="space-y-2">
                  <Button className="w-full" asChild>
                    <a href={certificateData.certificateUrl} download>
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger PDF
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full">
                    <QrCode className="h-4 w-4 mr-2" />
                    Partager
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-4">Informations</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ID Certificat:</span>
                    <span className="font-medium">{certificateData.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date d'émission:</span>
                    <span className="font-medium">{certificateData.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Validité:</span>
                    <span className="font-medium">Permanente</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
