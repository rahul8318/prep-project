import mongoose, { Schema, Document } from "mongoose";

export interface IDailyChallengeProgress extends Document {
  userId: string;
  date: string;
  completedQuestions: string[];
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const dailyChallengeProgressSchema = new Schema<IDailyChallengeProgress>(
  {
    userId: { type: String, required: true },
    date: { type: String, required: true },
    completedQuestions: [{ type: String }],
    completed: { type: Boolean, default: false },
  },
  { timestamps: true },
);

dailyChallengeProgressSchema.index(
  { userId: 1, date: 1 },
  { unique: true },
);

export const DailyChallengeProgress = mongoose.model<IDailyChallengeProgress>(
  "DailyChallengeProgress",
  dailyChallengeProgressSchema,
);
