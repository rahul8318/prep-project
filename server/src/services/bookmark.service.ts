import { Bookmark } from "../models/Bookmark";
import { Question } from "../models/Question";
import { getPagination, getSkip } from "../utils/pagination";

export const getBookmarks = async (userId: string, pagination: { page?: number; limit?: number }) => {
  const pg = getPagination(pagination.page, pagination.limit);
  const skip = getSkip(pg.page, pg.limit);

  const [data, total] = await Promise.all([
    Bookmark.find({ userId })
      .skip(skip)
      .limit(pg.limit)
      .sort({ createdAt: -1 })
      .populate("questionId", "question category topic difficulty type options correctAnswer explanation tags codeExample"),
    Bookmark.countDocuments({ userId }),
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

export const addBookmark = async (userId: string, questionId: string) => {
  const existing = await Bookmark.findOne({ userId, questionId });
  if (existing) {
    return existing;
  }

  const bookmark = await Bookmark.create({ userId, questionId });
  return bookmark;
};

export const removeBookmark = async (userId: string, questionId: string) => {
  return Bookmark.findOneAndDelete({ userId, questionId });
};

export const checkBookmark = async (userId: string, questionId: string) => {
  const bookmark = await Bookmark.findOne({ userId, questionId });
  return !!bookmark;
};

export const bookmarkService = { getBookmarks, addBookmark, removeBookmark, checkBookmark };
