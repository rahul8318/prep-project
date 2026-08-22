import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { adminService } from "../services/admin.service";
import { sendSuccess, sendError } from "../utils/response";

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const { page, limit } = req.query;
    const result = await adminService.getAllUsers({
      page: page ? parseInt(page as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
    });
    sendSuccess(res, result);
  } catch (error) {
    sendError(res, "Failed to fetch users", 500, [(error as Error).message]);
  }
};

export const getStatistics = async (req: AuthRequest, res: Response) => {
  try {
    const stats = await adminService.getStatistics();
    sendSuccess(res, stats);
  } catch (error) {
    sendError(res, "Failed to fetch statistics", 500, [(error as Error).message]);
  }
};

export const adminController = { getAllUsers, getStatistics };
