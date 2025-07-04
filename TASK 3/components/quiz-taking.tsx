"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"
import type { Quiz, QuizResult } from "@/types/quiz"

interface QuizTakingProps {
  quiz: Quiz
  onComplete: (result: QuizResult) => void
  onBack: () => void
}

export default function QuizTaking({ quiz, onComplete, onBack }: QuizTakingProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [timeElapsed, setTimeElapsed] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestionIndex] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const handleSubmit = () => {
    const correctAnswers = selectedAnswers.filter(
      (answer, index) => answer === quiz.questions[index].correctAnswer,
    ).length

    const result: QuizResult = {
      quizId: quiz.id,
      quizTitle: quiz.title,
      totalQuestions: quiz.questions.length,
      correctAnswers,
      score: Math.round((correctAnswers / quiz.questions.length) * 100),
      timeElapsed,
      answers: selectedAnswers,
      completedAt: new Date().toISOString(),
    }

    onComplete(result)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button variant="ghost" onClick={onBack} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{quiz.title}</h1>
              <p className="text-gray-600">
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Time Elapsed</div>
            <div className="text-xl font-mono font-bold text-gray-800">{formatTime(timeElapsed)}</div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>Progress: {Math.round(progress)}%</span>
            <span>{selectedAnswers.filter((a) => a !== undefined).length} answered</span>
          </div>
        </div>

        {/* Question Card */}
        <Card className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm shadow-xl">
          <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-xl">Question {currentQuestionIndex + 1}</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-8 text-gray-800 leading-relaxed">{currentQuestion.question}</h2>

            <div className="grid gap-4">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswers[currentQuestionIndex] === index ? "default" : "outline"}
                  className={`p-6 h-auto text-left justify-start text-wrap transition-all duration-200 ${
                    selectedAnswers[currentQuestionIndex] === index
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg scale-105"
                      : "hover:bg-cyan-50 hover:border-cyan-300"
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  <div className="flex items-center w-full">
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 flex-shrink-0 ${
                        selectedAnswers[currentQuestionIndex] === index
                          ? "border-white bg-white text-cyan-600"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedAnswers[currentQuestionIndex] === index ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <span className="font-bold">{String.fromCharCode(65 + index)}</span>
                      )}
                    </div>
                    <span className="text-lg">{option}</span>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="px-6 bg-transparent"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex space-x-2">
            {quiz.questions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentQuestionIndex
                    ? "bg-cyan-600"
                    : selectedAnswers[index] !== undefined
                      ? "bg-green-400"
                      : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          {currentQuestionIndex === quiz.questions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={selectedAnswers[currentQuestionIndex] === undefined}
              className="px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            >
              Submit Quiz
              <CheckCircle className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestionIndex] === undefined}
              className="px-6"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
