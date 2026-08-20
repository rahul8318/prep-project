import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { achievementService } from "../services/achievement.service";
import { sendSuccess, sendError } from "../utils/response";

export const checkAchievements = async (req: AuthRequest, res: Response) => {
  try {
    const result = await achievementService.checkAchievements(req.user!.id);
    sendSuccess(res, result, "Achievements checked successfully");
  } catch (error) {
    sendError(res, "Failed to check achievements", 500, [(error as Error).message]);
  }
};

export const getUserAchievements = async (req: AuthRequest, res: Response) => {
  try {
    const achievements = await achievementService.getUserAchievements(req.user!.id);
    sendSuccess(res, achievements);
  } catch (error) {
    sendError(res, "Failed to fetch achievements", 500, [(error as Error).message]);
  }
};

export const achievementController = { checkAchievements, getUserAchievements };
