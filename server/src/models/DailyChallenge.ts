import mongoose, { Schema, Document } from "mongoose";

export interface IDailyChallenge extends Document {
  date: string;
  questionIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

const dailyChallengeSchema = new Schema<IDailyChallenge>({
  date: { type: String, required: true, unique: true },
  questionIds: [{ type: String, required: true }],
});

export const DailyChallenge = mongoose.model<IDailyChallenge>(
  "DailyChallenge",
  dailyChallengeSchema,
);
