import mongoose, { Schema, Document } from "mongoose";

export interface IAchievement extends Document {
  title: string;
  description: string;
  icon: string;
  requirement: {
    type: string;
    value: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const achievementSchema = new Schema<IAchievement>({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  requirement: {
    type: {
      type: String,
      required: true,
      enum: [
        "quizzes_completed",
        "questions_solved",
        "streak_days",
        "accuracy_percentage",
        "interviews_completed",
      ],
    },
    value: { type: Number, required: true },
  },
});

export const Achievement = mongoose.model<IAchievement>(
  "Achievement",
  achievementSchema,
);
