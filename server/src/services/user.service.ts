import bcrypt from "bcryptjs";
import { User } from "../models/User";
import { QuizResult } from "../models/QuizResult";
import { InterviewResult } from "../models/InterviewResult";
import { Bookmark } from "../models/Bookmark";
import { FlashcardProgress } from "../models/FlashcardProgress";
import { DailyChallengeProgress } from "../models/DailyChallengeProgress";

export const getMe = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export const updateProfile = async (userId: string, data: Record<string, unknown>) => {
  const user = await User.findByIdAndUpdate(userId, { $set: data }, { new: true, runValidators: true });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export const changePassword = async (userId: string, currentPassword: string, newPassword: string) => {
  const user = await User.findById(userId).select("+password");
  if (!user) {
    throw new Error("User not found");
  }

  const isCurrentPasswordValid = await bcrypt.compare(currentPassword, (user as any).password);
  if (!isCurrentPasswordValid) {
    throw new Error("Current password is incorrect");
  }

  (user as any).password = newPassword;
  await user.save();

  return { message: "Password changed successfully" };
};

export const getUserStats = async (userId: string) => {
  const [quizResults, interviewResults, bookmarkCount, flashcardCount, dailyChallenges] = await Promise.all([
    QuizResult.find({ userId }),
    InterviewResult.find({ userId }),
    Bookmark.countDocuments({ userId }),
    FlashcardProgress.countDocuments({ userId }),
    DailyChallengeProgress.find({ userId }).sort({ date: -1 }),
  ]);

  const totalQuizzes = quizResults.length;
  const totalInterviews = interviewResults.length;

  const totalQuestionsAttempted = quizResults.reduce((sum: number, qr: any) => sum + qr.totalQuestions, 0);
  const totalCorrectAnswers = quizResults.reduce((sum: number, qr: any) => sum + qr.correctAnswers, 0);

  const questionsSolved = totalCorrectAnswers;
  const totalAttempted = totalQuestionsAttempted;
  const accuracy = totalAttempted > 0 ? Math.round((questionsSolved / totalAttempted) * 100) : 0;

  const avgInterviewScore =
    totalInterviews > 0
      ? Math.round(interviewResults.reduce((sum: number, ir: any) => sum + ir.score, 0) / totalInterviews)
      : 0;

  let currentStreak = 0;
  if (dailyChallenges.length > 0) {
    const today = new Date().toISOString().split("T")[0];
    const completedDates = new Set(
      dailyChallenges.filter((dc: any) => dc.completed).map((dc: any) => dc.date),
    );

    let checkDate = new Date(today);
    if (!completedDates.has(today)) {
      checkDate.setDate(checkDate.getDate() - 1);
    }

    while (completedDates.has(checkDate.toISOString().split("T")[0])) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    }
  }

  const preparationPercentage = Math.min(
    100,
    Math.max(0, Math.round(currentStreak * 3 + totalQuizzes * 2 + totalInterviews * 5 + bookmarkCount + flashcardCount * 0.5)),
  );

  return {
    questionsSolved,
    totalAttempted,
    accuracy,
    currentStreak,
    totalQuizzes,
    totalInterviews,
    avgInterviewScore,
    preparationPercentage,
  };
};

export const userService = { getMe, updateProfile, changePassword, getUserStats };
