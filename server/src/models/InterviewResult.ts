import mongoose, { Schema, Document } from "mongoose";

export interface IInterviewResult extends Document {
  userId: string;
  category: string;
  difficulty: string;
  questions: Array<{
    questionId: string;
    question: string;
    userAnswer: string;
  }>;
  answers: Array<{
    questionId: string;
    answer: string;
  }>;
  score: number;
  technicalScore: number;
  communicationScore: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  createdAt: Date;
  updatedAt: Date;
}

const interviewResultSchema = new Schema<IInterviewResult>(
  {
    userId: { type: String, required: true, index: true },
    category: { type: String, required: true },
    difficulty: { type: String, required: true },
    questions: [
      {
        questionId: { type: String, required: true },
        question: { type: String, required: true },
        userAnswer: { type: String, required: true },
      },
    ],
    answers: [
      {
        questionId: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
    score: { type: Number, required: true },
    technicalScore: { type: Number, required: true },
    communicationScore: { type: Number, required: true },
    strengths: [{ type: String }],
    weaknesses: [{ type: String }],
    recommendations: [{ type: String }],
  },
  { timestamps: true },
);

export const InterviewResult = mongoose.model<IInterviewResult>(
  "InterviewResult",
  interviewResultSchema,
);
