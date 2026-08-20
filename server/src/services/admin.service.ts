import { User } from "../models/User";
import { Question } from "../models/Question";
import { QuizResult } from "../models/QuizResult";
import { InterviewResult } from "../models/InterviewResult";
import { Bookmark } from "../models/Bookmark";
import { getPagination, getSkip } from "../utils/pagination";

export const getAllUsers = async (pagination: { page?: number; limit?: number }) => {
  const pg = getPagination(pagination.page, pagination.limit);
  const skip = getSkip(pg.page, pg.limit);

  const [data, total] = await Promise.all([
    User.find().select("-password").skip(skip).limit(pg.limit).sort({ createdAt: -1 }),
    User.countDocuments(),
  ]);

  return {
    data,
    pagination: {
      page: pg.page,
      limit: pg.limit,
      total,
      totalPages: Math.ceil(total / pg.limit),
    },
  };
};

export const getAllQuestions = async (
  pagination: { page?: number; limit?: number },
  filters: { category?: string; difficulty?: string; search?: string },
) => {
  const pg = getPagination(pagination.page, pagination.limit);
  const skip = getSkip(pg.page, pg.limit);

  const query: Record<string, unknown> = {};

  if (filters.category) query.category = filters.category;
  if (filters.difficulty) query.difficulty = filters.difficulty;
  if (filters.search) {
    query.$or = [
      { question: new RegExp(filters.search, "i") },
      { topic: new RegExp(filters.search, "i") },
      { tags: new RegExp(filters.search, "i") },
    ];
  }

  const [data, total] = await Promise.all([
    Question.find(query).skip(skip).limit(pg.limit).sort({ createdAt: -1 }),
    Question.countDocuments(query),
  ]);

  return {
    data,
    pagination: {
      page: pg.page,
      limit: pg.limit,
      total,
      totalPages: Math.ceil(total / pg.limit),
    },
  };
};

export const createQuestion = async (data: Record<string, unknown>) => {
  return Question.create(data);
};

export const updateQuestion = async (id: string, data: Record<string, unknown>) => {
  return Question.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

export const deleteQuestion = async (id: string) => {
  return Question.findByIdAndDelete(id);
};

export const getStatistics = async () => {
  const [
    totalUsers,
    totalQuestions,
    totalQuizzes,
    totalInterviews,
    totalBookmarks,
  ] = await Promise.all([
    User.countDocuments(),
    Question.countDocuments(),
    QuizResult.countDocuments(),
    InterviewResult.countDocuments(),
    Bookmark.countDocuments(),
  ]);

  return {
    totalUsers,
    totalQuestions,
    totalQuizzes,
    totalInterviews,
    totalBookmarks,
  };
};

export const adminService = { getAllUsers, getAllQuestions, createQuestion, updateQuestion, deleteQuestion, getStatistics };
