import mongoose, { Schema, Document } from "mongoose";

export interface IQuizResult extends Document {
  userId: string;
  questions: Array<{
    questionId: string;
    question: string;
    options: string[];
    correctAnswer: string;
    userAnswer?: string;
  }>;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracy: number;
  timeTaken: number;
  category: string;
  difficulty: string;
  createdAt: Date;
  updatedAt: Date;
}

const quizResultSchema = new Schema<IQuizResult>(
  {
    userId: { type: String, required: true, index: true },
    questions: [
      {
        questionId: { type: String, required: true },
        question: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctAnswer: { type: String, required: true },
        userAnswer: { type: String },
      },
    ],
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    correctAnswers: { type: Number, required: true },
    incorrectAnswers: { type: Number, required: true },
    accuracy: { type: Number, required: true },
    timeTaken: { type: Number, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, required: true },
  },
  { timestamps: true },
);

export const QuizResult = mongoose.model<IQuizResult>(
  "QuizResult",
  quizResultSchema,
);
