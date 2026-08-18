import mongoose, { Schema, Document } from "mongoose";
import { FlashcardStatus } from "../types";

export interface IFlashcardProgress extends Document {
  userId: string;
  questionId: string;
  status: FlashcardStatus;
  reviewCount: number;
  lastReviewedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const flashcardProgressSchema = new Schema<IFlashcardProgress>(
  {
    userId: { type: String, required: true, index: true },
    questionId: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["easy", "review", "difficult"],
      default: "review",
    },
    reviewCount: { type: Number, default: 0 },
    lastReviewedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

flashcardProgressSchema.index(
  { userId: 1, questionId: 1 },
  { unique: true },
);

export const FlashcardProgress = mongoose.model<IFlashcardProgress>(
  "FlashcardProgress",
  flashcardProgressSchema,
);
