import { Question } from "../models/Question";
import { FlashcardProgress } from "../models/FlashcardProgress";
import { FlashcardStatus } from "../types";

export const getFlashcards = async (userId: string) => {
  const questions = await Question.find({
    type: { $in: ["Technical", "HR"] },
  }).sort({ createdAt: -1 });

  const questionIds = questions.map((q: any) => q._id.toString());

  const progressRecords = await FlashcardProgress.find({
    userId,
    questionId: { $in: questionIds },
  });

  const progressMap = new Map(
    progressRecords.map((p: any) => [
      p.questionId,
      {
        status: p.status,
        reviewCount: p.reviewCount,
        lastReviewedAt: p.lastReviewedAt,
      },
    ]),
  );

  const flashcards = questions.map((q: any) => ({
    _id: q._id.toString(),
    question: q.question,
    category: q.category,
    topic: q.topic,
    difficulty: q.difficulty,
    type: q.type,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
    tags: q.tags,
    codeExample: q.codeExample,
    progress: progressMap.get(q._id.toString()) || null,
  }));

  return flashcards;
};

export const updateProgress = async (userId: string, questionId: string, status: FlashcardStatus) => {
  const validStatuses: FlashcardStatus[] = ["easy", "review", "difficult"];
  if (!validStatuses.includes(status)) {
    throw new Error("Invalid status. Must be easy, review, or difficult");
  }

  const existing = await FlashcardProgress.findOne({ userId, questionId });

  if (existing) {
    existing.status = status;
    existing.reviewCount += 1;
    existing.lastReviewedAt = new Date();
    await existing.save();
    return existing;
  }

  const progress = await FlashcardProgress.create({
    userId,
    questionId,
    status,
    reviewCount: 1,
    lastReviewedAt: new Date(),
  });

  return progress;
};

export const flashcardService = { getFlashcards, updateProgress };
