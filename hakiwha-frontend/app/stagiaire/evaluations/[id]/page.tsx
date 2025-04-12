"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { BookOpen, ArrowLeft, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"

export default function EvaluationPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formationTitle = "Communication NLP"

  const steps = [
    {
      title: "Contenu de la formation",
      questions: [
        {
          id: "q1",
          question: "Le contenu de la formation correspondait-il à vos attentes?",
          type: "rating",
        },
        {
          id: "q2",
          question: "Les objectifs de la formation ont-ils été clairement définis?",
          type: "rating",
        },
        {
          id: "q3",
          question: "Le contenu était-il pertinent pour votre travail?",
          type: "rating",
        },
      ],
    },
    {
      title: "Qualité du formateur",
      questions: [
        {
          id: "q4",
          question: "Le formateur maîtrisait-il le sujet?",
          type: "rating",
        },
        {
          id: "q5",
          question: "Le formateur a-t-il répondu clairement à vos questions?",
          type: "rating",
        },
        {
          id: "q6",
          question: "Le formateur a-t-il su maintenir votre intérêt?",
          type: "rating",
        },
      ],
    },
    {
      title: "Organisation",
      questions: [
        {
          id: "q7",
          question: "La durée de la formation était-elle adaptée?",
          type: "rating",
        },
        {
          id: "q8",
          question: "Les supports de cours étaient-ils de bonne qualité?",
          type: "rating",
        },
        {
          id: "q9",
          question: "Les conditions matérielles étaient-elles satisfaisantes?",
          type: "rating",
        },
      ],
    },
    {
      title: "Commentaires",
      questions: [
        {
          id: "q10",
          question: "Avez-vous des commentaires ou suggestions pour améliorer cette formation?",
          type: "text",
        },
        {
          id: "q11",
          question: "Quelles autres formations souhaiteriez-vous suivre?",
          type: "text",
        },
      ],
    },
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      setProgress(((currentStep + 1) / (steps.length - 1)) * 100)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setProgress(((currentStep - 1) / (steps.length - 1)) * 100)
    }
  }

  const handleSubmit = () => {
    setIsSubmitting(true)

    // Simulate API call to Laravel backend
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/stagiaire/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-blue-light">
      <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-white px-4 md:px-6">
        <div className="flex items-center gap-2 font-semibold text-lg text-primary">
          <BookOpen className="h-6 w-6" />
          <span>FormationPro</span>
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

      <main className="container mx-auto p-4 md:p-6 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Évaluation de formation</h1>
          <p className="text-muted-foreground">
            {formationTitle} - Votre avis nous est précieux pour améliorer nos formations
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="mb-2">
              <Progress value={progress} className="h-2" />
            </div>
            <CardTitle>{steps[currentStep].title}</CardTitle>
            <CardDescription>
              Étape {currentStep + 1} sur {steps.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {steps[currentStep].questions.map((question) => (
                <div key={question.id} className="space-y-2">
                  <Label htmlFor={question.id}>{question.question}</Label>

                  {question.type === "rating" && (
                    <RadioGroup defaultValue="3" className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <div key={value} className="flex flex-col items-center">
                          <RadioGroupItem value={value.toString()} id={`${question.id}-${value}`} className="sr-only" />
                          <Label
                            htmlFor={`${question.id}-${value}`}
                            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border text-sm hover:bg-muted peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground"
                          >
                            {value}
                          </Label>
                          {value === 1 && <span className="text-xs mt-1">Pas du tout</span>}
                          {value === 5 && <span className="text-xs mt-1">Tout à fait</span>}
                        </div>
                      ))}
                    </RadioGroup>
                  )}

                  {question.type === "text" && <Textarea id={question.id} placeholder="Votre réponse..." />}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>
              Précédent
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button onClick={nextStep}>Suivant</Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  "Envoi en cours..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Soumettre
                  </>
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
