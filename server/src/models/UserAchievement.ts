import mongoose, { Schema, Document } from "mongoose";

export interface IUserAchievement extends Document {
  userId: string;
  achievementId: string;
  unlockedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userAchievementSchema = new Schema<IUserAchievement>(
  {
    userId: { type: String, required: true, index: true },
    achievementId: { type: String, required: true },
    unlockedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

userAchievementSchema.index(
  { userId: 1, achievementId: 1 },
  { unique: true },
);

export const UserAchievement = mongoose.model<IUserAchievement>(
  "UserAchievement",
  userAchievementSchema,
);
