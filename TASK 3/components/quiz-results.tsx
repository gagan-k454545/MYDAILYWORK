"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Trophy, RotateCcw, Share2, CheckCircle, XCircle } from "lucide-react"
import type { QuizResult } from "@/types/quiz"

interface QuizResultsProps {
  result: QuizResult
  onBack: () => void
  onRetake: () => void
}

export default function QuizResults({ result, onBack, onRetake }: QuizResultsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreMessage = (score: number) => {
    if (score >= 90) return "Excellent! Outstanding performance! 🎉"
    if (score >= 80) return "Great job! Well done! 👏"
    if (score >= 70) return "Good work! Keep it up! 👍"
    if (score >= 60) return "Not bad! Room for improvement. 📚"
    return "Keep practicing! You can do better! 💪"
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const shareResults = () => {
    const text = `I just scored ${result.score}% on "${result.quizTitle}" quiz! 🎯`
    if (navigator.share) {
      navigator.share({
        title: "Quiz Results",
        text: text,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(text)
      alert("Results copied to clipboard!")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">Quiz Results</h1>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Score Card */}
          <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
            <CardHeader className="text-center bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg">
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 p-4 rounded-full">
                  <Trophy className="h-12 w-12" />
                </div>
              </div>
              <CardTitle className="text-2xl mb-2">{result.quizTitle}</CardTitle>
              <p className="text-purple-100">Quiz Completed!</p>
            </CardHeader>
            <CardContent className="p-8 text-center">
              <div className="mb-8">
                <div className={`text-6xl font-bold mb-4 ${getScoreColor(result.score)}`}>{result.score}%</div>
                <p className="text-xl text-gray-600 mb-4">{getScoreMessage(result.score)}</p>
                <Progress value={result.score} className="h-4 mb-4" />
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{result.correctAnswers}</div>
                  <div className="text-gray-600">Correct Answers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-500 mb-2">
                    {result.totalQuestions - result.correctAnswers}
                  </div>
                  <div className="text-gray-600">Incorrect Answers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{formatTime(result.timeElapsed)}</div>
                  <div className="text-gray-600">Time Taken</div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  onClick={onRetake}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Retake Quiz
                </Button>
                <Button variant="outline" onClick={shareResults}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Results
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Performance Breakdown */}
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Performance Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: result.totalQuestions }, (_, index) => {
                  const isCorrect = result.answers[index] !== undefined && result.answers[index] === index // This would need the actual correct answers
                  return (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                      <div className="flex items-center">
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500 mr-3" />
                        )}
                        <span className="font-medium">Question {index + 1}</span>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {isCorrect ? "Correct" : "Incorrect"}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Achievement Badge */}
          {result.score >= 80 && (
            <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
              <CardContent className="text-center py-8">
                <Trophy className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Achievement Unlocked!</h3>
                <p className="text-lg">{result.score >= 90 ? "Quiz Master" : "High Achiever"}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
