"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, PlayCircle, Clock, User } from "lucide-react"
import type { Quiz } from "@/types/quiz"

interface QuizListingProps {
  onBack: () => void
  onTakeQuiz: (quiz: Quiz) => void
}

export default function QuizListing({ onBack, onTakeQuiz }: QuizListingProps) {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([])

  useEffect(() => {
    const savedQuizzes = JSON.parse(localStorage.getItem("quizzes") || "[]")
    setQuizzes(savedQuizzes)
    setFilteredQuizzes(savedQuizzes)
  }, [])

  useEffect(() => {
    const filtered = quizzes.filter(
      (quiz) =>
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredQuizzes(filtered)
  }, [searchTerm, quizzes])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">Available Quizzes</h1>
        </div>

        {/* Search */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search quizzes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quiz Grid */}
        {filteredQuizzes.length === 0 ? (
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="text-center py-12">
              <div className="text-gray-500 mb-4">
                <PlayCircle className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No Quizzes Found</h3>
                <p>
                  {searchTerm
                    ? "No quizzes match your search criteria."
                    : "No quizzes available yet. Create your first quiz!"}
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map((quiz) => (
              <Card
                key={quiz.id}
                className="group hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm"
              >
                <CardHeader>
                  <CardTitle className="line-clamp-2">{quiz.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{quiz.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {quiz.questions.length} questions
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {quiz.createdBy}
                    </div>
                  </div>
                  <Button
                    onClick={() => onTakeQuiz(quiz)}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 group-hover:scale-105 transition-transform"
                  >
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Take Quiz
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
