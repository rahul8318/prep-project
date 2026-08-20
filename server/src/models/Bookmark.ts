import mongoose, { Schema, Document } from "mongoose";

export interface IBookmark extends Document {
  userId: string;
  questionId: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookmarkSchema = new Schema<IBookmark>(
  {
    userId: { type: String, required: true, index: true },
    questionId: { type: String, required: true },
  },
  { timestamps: true },
);

bookmarkSchema.index({ userId: 1, questionId: 1 }, { unique: true });

export const Bookmark = mongoose.model<IBookmark>("Bookmark", bookmarkSchema);
