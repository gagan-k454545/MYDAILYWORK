"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, PlayCircle, Trophy, Users } from "lucide-react"
import QuizCreation from "@/components/quiz-creation"
import QuizListing from "@/components/quiz-listing"
import QuizTaking from "@/components/quiz-taking"
import QuizResults from "@/components/quiz-results"
import UserAuth from "@/components/user-auth"
import type { Quiz, QuizResult } from "@/types/quiz"

export default function HomePage() {
  const [currentView, setCurrentView] = useState<"home" | "create" | "list" | "take" | "results" | "auth">("home")
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null)
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null)
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null)

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result)
    setCurrentView("results")
  }

  const handleTakeQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz)
    setCurrentView("take")
  }

  const handleLogin = (userData: { id: string; name: string; email: string }) => {
    setUser(userData)
    setCurrentView("home")
  }

  if (currentView === "auth") {
    return <UserAuth onLogin={handleLogin} onBack={() => setCurrentView("home")} />
  }

  if (currentView === "create") {
    return <QuizCreation onBack={() => setCurrentView("home")} user={user} />
  }

  if (currentView === "list") {
    return <QuizListing onBack={() => setCurrentView("home")} onTakeQuiz={handleTakeQuiz} />
  }

  if (currentView === "take" && selectedQuiz) {
    return <QuizTaking quiz={selectedQuiz} onComplete={handleQuizComplete} onBack={() => setCurrentView("list")} />
  }

  if (currentView === "results" && quizResult) {
    return (
      <QuizResults result={quizResult} onBack={() => setCurrentView("home")} onRetake={() => setCurrentView("list")} />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-3 rounded-full">
              <Trophy className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4">
            QuizMaster
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Create engaging quizzes, challenge your knowledge, and track your progress with our interactive quiz
            platform.
          </p>
        </div>

        {/* User Status */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-gray-500" />
            <span className="text-gray-600">{user ? `Welcome back, ${user.name}!` : "Guest User"}</span>
          </div>
          {!user && (
            <Button variant="outline" onClick={() => setCurrentView("auth")} className="hover:bg-cyan-50">
              Sign In
            </Button>
          )}
        </div>

        {/* Main Actions */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full w-fit group-hover:scale-110 transition-transform">
                <PlusCircle className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">Create Quiz</CardTitle>
              <CardDescription className="text-gray-600">
                Design your own quiz with custom questions and multiple-choice answers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-semibold py-3"
                onClick={() => setCurrentView("create")}
              >
                Start Creating
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full w-fit group-hover:scale-110 transition-transform">
                <PlayCircle className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">Take Quiz</CardTitle>
              <CardDescription className="text-gray-600">
                Browse available quizzes and test your knowledge on various topics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white font-semibold py-3"
                onClick={() => setCurrentView("list")}
              >
                Browse Quizzes
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Why Choose QuizMaster?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6">
              <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-3 rounded-full w-fit mx-auto mb-4">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Experience</h3>
              <p className="text-gray-600">Engaging quiz interface with instant feedback and beautiful animations</p>
            </div>
            <div className="p-6">
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-3 rounded-full w-fit mx-auto mb-4">
                <PlusCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Creation</h3>
              <p className="text-gray-600">Simple and intuitive quiz creation tools for educators and learners</p>
            </div>
            <div className="p-6">
              <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-3 rounded-full w-fit mx-auto mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
              <p className="text-gray-600">Share quizzes with others and discover new topics to explore</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
