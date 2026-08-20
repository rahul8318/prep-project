import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { bookmarkService } from "../services/bookmark.service";
import { sendSuccess, sendError } from "../utils/response";

export const getBookmarks = async (req: AuthRequest, res: Response) => {
  try {
    const { page, limit } = req.query;
    const result = await bookmarkService.getBookmarks(req.user!.id, {
      page: page ? parseInt(page as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
    });
    sendSuccess(res, result);
  } catch (error) {
    sendError(res, "Failed to fetch bookmarks", 500, [(error as Error).message]);
  }
};

export const addBookmark = async (req: AuthRequest, res: Response) => {
  try {
    const bookmark = await bookmarkService.addBookmark(req.user!.id, req.params.questionId as string);
    sendSuccess(res, bookmark, "Bookmark added successfully", 201);
  } catch (error) {
    sendError(res, "Failed to add bookmark", 500, [(error as Error).message]);
  }
};

export const removeBookmark = async (req: AuthRequest, res: Response) => {
  try {
    const bookmark = await bookmarkService.removeBookmark(req.user!.id, req.params.questionId as string);
    if (!bookmark) {
      sendError(res, "Bookmark not found", 404);
      return;
    }
    sendSuccess(res, null, "Bookmark removed successfully");
  } catch (error) {
    sendError(res, "Failed to remove bookmark", 500, [(error as Error).message]);
  }
};

export const checkBookmark = async (req: AuthRequest, res: Response) => {
  try {
    const isBookmarked = await bookmarkService.checkBookmark(req.user!.id, req.params.questionId as string);
    sendSuccess(res, { bookmarked: isBookmarked });
  } catch (error) {
    sendError(res, "Failed to check bookmark", 500, [(error as Error).message]);
  }
};

export const bookmarkController = { getBookmarks, addBookmark, removeBookmark, checkBookmark };
