import { User } from "../models/User";
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

export const getStatistics = async () => {
  const [
    totalUsers,
    totalQuizzes,
    totalInterviews,
    totalBookmarks,
  ] = await Promise.all([
    User.countDocuments(),
    QuizResult.countDocuments(),
    InterviewResult.countDocuments(),
    Bookmark.countDocuments(),
  ]);

  return {
    totalUsers,
    totalQuestions: 0,
    totalQuizzes,
    totalInterviews,
    totalBookmarks,
  };
};

export const adminService = { getAllUsers, getStatistics };
