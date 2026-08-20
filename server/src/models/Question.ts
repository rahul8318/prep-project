import mongoose, { Schema, Document } from "mongoose";
import { Category, Difficulty, QuestionType } from "../types";

export interface IQuestion extends Document {
  question: string;
  category: Category;
  topic: string;
  difficulty: Difficulty;
  type: QuestionType;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  tags: string[];
  codeExample?: string;
  createdAt: Date;
  updatedAt: Date;
}

const questionSchema = new Schema<IQuestion>(
  {
    question: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "TypeScript",
        "Node.js",
        "Git & GitHub",
        "DSA",
        "DBMS",
        "Operating Systems",
        "Computer Networks",
        "HR",
      ],
    },
    topic: { type: String, required: true },
    difficulty: {
      type: String,
      required: true,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },
    type: {
      type: String,
      required: true,
      enum: ["MCQ", "Technical", "HR", "Coding"],
    },
    options: [{ type: String }],
    correctAnswer: { type: String, required: true },
    explanation: { type: String, required: true },
    tags: [{ type: String }],
    codeExample: { type: String },
  },
  { timestamps: true },
);

export const Question = mongoose.model<IQuestion>("Question", questionSchema);
