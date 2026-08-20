import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { dailyChallengeService } from "../services/dailyChallenge.service";
import { sendSuccess, sendError } from "../utils/response";

export const getDailyChallenge = async (req: Request, res: Response) => {
  try {
    const challenge = await dailyChallengeService.getDailyChallenge();
    sendSuccess(res, challenge);
  } catch (error) {
    sendError(res, "Failed to fetch daily challenge", 500, [(error as Error).message]);
  }
};

export const completeQuestion = async (req: AuthRequest, res: Response) => {
  try {
    const progress = await dailyChallengeService.completeQuestion(
      req.user!.id,
      req.params.questionId as string,
    );
    sendSuccess(res, progress, "Question completed successfully");
  } catch (error) {
    sendError(res, "Failed to complete question", 500, [(error as Error).message]);
  }
};

export const getDailyProgress = async (req: AuthRequest, res: Response) => {
  try {
    const progress = await dailyChallengeService.getDailyProgress(req.user!.id);
    sendSuccess(res, progress);
  } catch (error) {
    sendError(res, "Failed to fetch daily progress", 500, [(error as Error).message]);
  }
};

export const dailyChallengeController = { getDailyChallenge, completeQuestion, getDailyProgress };
