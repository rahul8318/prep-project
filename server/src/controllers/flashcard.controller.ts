import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { flashcardService } from "../services/flashcard.service";
import { sendSuccess, sendError } from "../utils/response";

export const getFlashcards = async (req: AuthRequest, res: Response) => {
  try {
    const flashcards = await flashcardService.getFlashcards(req.user!.id);
    sendSuccess(res, flashcards);
  } catch (error) {
    sendError(res, "Failed to fetch flashcards", 500, [(error as Error).message]);
  }
};

export const updateProgress = async (req: AuthRequest, res: Response) => {
  try {
    const progress = await flashcardService.updateProgress(
      req.user!.id,
      req.params.questionId as string,
      req.body.status,
    );
    sendSuccess(res, progress, "Progress updated successfully");
  } catch (error) {
    sendError(res, "Failed to update progress", 500, [(error as Error).message]);
  }
};

export const flashcardController = { getFlashcards, updateProgress };
