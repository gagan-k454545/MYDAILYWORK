export interface Question {
  question: string
  options: string[]
  correctAnswer: number
}

export interface Quiz {
  id: string
  title: string
  description: string
  questions: Question[]
  createdBy: string
  createdAt: string
}

export interface QuizResult {
  quizId: string
  quizTitle: string
  totalQuestions: number
  correctAnswers: number
  score: number
  timeElapsed: number
  answers: number[]
  completedAt: string
}
