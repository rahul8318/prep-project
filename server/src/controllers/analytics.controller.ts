import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { analyticsService } from "../services/analytics.service";
import { sendSuccess, sendError } from "../utils/response";

export const getOverview = async (req: AuthRequest, res: Response) => {
  try {
    const overview = await analyticsService.getOverview(req.user!.id);
    sendSuccess(res, overview);
  } catch (error) {
    sendError(res, "Failed to fetch analytics overview", 500, [(error as Error).message]);
  }
};

export const getCategories = async (req: AuthRequest, res: Response) => {
  try {
    const categories = await analyticsService.getCategories(req.user!.id);
    sendSuccess(res, categories);
  } catch (error) {
    sendError(res, "Failed to fetch category analytics", 500, [(error as Error).message]);
  }
};

export const getActivity = async (req: AuthRequest, res: Response) => {
  try {
    const days = req.query.days ? parseInt(req.query.days as string) : 7;
    const activity = await analyticsService.getActivity(req.user!.id, days);
    sendSuccess(res, activity);
  } catch (error) {
    sendError(res, "Failed to fetch activity data", 500, [(error as Error).message]);
  }
};

export const getAccuracy = async (req: AuthRequest, res: Response) => {
  try {
    const accuracy = await analyticsService.getAccuracy(req.user!.id);
    sendSuccess(res, accuracy);
  } catch (error) {
    sendError(res, "Failed to fetch accuracy data", 500, [(error as Error).message]);
  }
};

export const analyticsController = { getOverview, getCategories, getActivity, getAccuracy };
