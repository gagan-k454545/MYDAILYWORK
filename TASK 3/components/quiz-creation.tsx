"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Plus, Trash2, Save } from "lucide-react"
import type { Quiz, Question } from "@/types/quiz"

interface QuizCreationProps {
  onBack: () => void
  user: { id: string; name: string; email: string } | null
}

export default function QuizCreation({ onBack, user }: QuizCreationProps) {
  const [quiz, setQuiz] = useState<Partial<Quiz>>({
    title: "",
    description: "",
    questions: [],
  })

  const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
  })

  const addQuestion = () => {
    if (currentQuestion.question && currentQuestion.options?.every((opt) => opt.trim())) {
      setQuiz((prev) => ({
        ...prev,
        questions: [...(prev.questions || []), currentQuestion as Question],
      }))
      setCurrentQuestion({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
      })
    }
  }

  const removeQuestion = (index: number) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions?.filter((_, i) => i !== index) || [],
    }))
  }

  const saveQuiz = () => {
    if (quiz.title && quiz.questions && quiz.questions.length > 0) {
      const savedQuizzes = JSON.parse(localStorage.getItem("quizzes") || "[]")
      const newQuiz: Quiz = {
        id: Date.now().toString(),
        title: quiz.title,
        description: quiz.description || "",
        questions: quiz.questions,
        createdBy: user?.name || "Anonymous",
        createdAt: new Date().toISOString(),
      }
      savedQuizzes.push(newQuiz)
      localStorage.setItem("quizzes", JSON.stringify(savedQuizzes))
      onBack()
    }
  }

  const loadSampleQuiz = () => {
    const sampleQuestions: Question[] = [
      {
        question: "Which HTML tag is used to define the structure of an HTML document?",
        options: ["<body>", "<html>", "<head>", "<div>"],
        correctAnswer: 1,
      },
      {
        question: "What does CSS stand for?",
        options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
        correctAnswer: 1,
      },
      {
        question: "Which CSS property is used to change the text color of an element?",
        options: ["font-color", "text-color", "color", "background-color"],
        correctAnswer: 2,
      },
      {
        question: "What is the correct HTML tag for the largest heading?",
        options: ["<h6>", "<heading>", "<h1>", "<header>"],
        correctAnswer: 2,
      },
      {
        question: "Which CSS property is used to make text bold?",
        options: ["font-weight", "text-style", "font-style", "text-weight"],
        correctAnswer: 0,
      },
      {
        question: "What is the correct HTML tag to create a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        correctAnswer: 1,
      },
      {
        question: "Which CSS property is used to change the background color?",
        options: ["color", "bg-color", "background-color", "background"],
        correctAnswer: 2,
      },
      {
        question: "What does the HTML <br> tag do?",
        options: ["Creates a line break", "Makes text bold", "Creates a border", "Defines a paragraph"],
        correctAnswer: 0,
      },
      {
        question: "Which CSS unit is relative to the font-size of the element?",
        options: ["px", "em", "pt", "cm"],
        correctAnswer: 1,
      },
      {
        question: "What is the correct way to comment in CSS?",
        options: ["// comment", "<!-- comment -->", "/* comment */", "# comment"],
        correctAnswer: 2,
      },
    ]

    setQuiz({
      title: "HTML & CSS Fundamentals",
      description: "Test your knowledge of basic HTML and CSS concepts",
      questions: sampleQuestions,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">Create New Quiz</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Quiz Details */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                Quiz Information
                <Button variant="outline" size="sm" onClick={loadSampleQuiz} className="ml-auto bg-transparent">
                  Load Sample Quiz
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Quiz Title</Label>
                <Input
                  id="title"
                  value={quiz.title}
                  onChange={(e) => setQuiz((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter quiz title"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={quiz.description}
                  onChange={(e) => setQuiz((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter quiz description"
                />
              </div>
            </CardContent>
          </Card>

          {/* Add Question */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Add Question</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="question">Question</Label>
                <Textarea
                  id="question"
                  value={currentQuestion.question}
                  onChange={(e) => setCurrentQuestion((prev) => ({ ...prev, question: e.target.value }))}
                  placeholder="Enter your question"
                />
              </div>
              {currentQuestion.options?.map((option, index) => (
                <div key={index}>
                  <Label htmlFor={`option-${index}`}>
                    Option {index + 1} {index === currentQuestion.correctAnswer && "(Correct)"}
                  </Label>
                  <div className="flex space-x-2">
                    <Input
                      id={`option-${index}`}
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...(currentQuestion.options || [])]
                        newOptions[index] = e.target.value
                        setCurrentQuestion((prev) => ({ ...prev, options: newOptions }))
                      }}
                      placeholder={`Enter option ${index + 1}`}
                    />
                    <Button
                      variant={index === currentQuestion.correctAnswer ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentQuestion((prev) => ({ ...prev, correctAnswer: index }))}
                    >
                      ✓
                    </Button>
                  </div>
                </div>
              ))}
              <Button onClick={addQuestion} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Questions List */}
        {quiz.questions && quiz.questions.length > 0 && (
          <Card className="mt-8 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Questions ({quiz.questions.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quiz.questions.map((q, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">
                        Q{index + 1}: {q.question}
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeQuestion(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {q.options.map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className={`p-2 rounded ${
                            optIndex === q.correctAnswer ? "bg-green-100 text-green-800 font-semibold" : "bg-white"
                          }`}
                        >
                          {String.fromCharCode(65 + optIndex)}. {option}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <Button onClick={saveQuiz} className="w-full mt-6 bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Save Quiz
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
