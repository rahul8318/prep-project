import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { userService } from "../services/user.service";
import { sendSuccess, sendError } from "../utils/response";

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await userService.getMe(req.user!.id);
    sendSuccess(res, user);
  } catch (error) {
    sendError(res, "Failed to fetch user profile", 500, [(error as Error).message]);
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await userService.updateProfile(req.user!.id, req.body);
    sendSuccess(res, user, "Profile updated successfully");
  } catch (error) {
    sendError(res, "Failed to update profile", 500, [(error as Error).message]);
  }
};

export const changePassword = async (req: AuthRequest, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const result = await userService.changePassword(req.user!.id, currentPassword, newPassword);
    sendSuccess(res, result);
  } catch (error) {
    sendError(res, "Failed to change password", 400, [(error as Error).message]);
  }
};

export const getUserStats = async (req: AuthRequest, res: Response) => {
  try {
    const stats = await userService.getUserStats(req.user!.id);
    sendSuccess(res, stats);
  } catch (error) {
    sendError(res, "Failed to fetch user stats", 500, [(error as Error).message]);
  }
};

export const userController = { getMe, updateProfile, changePassword, getUserStats };
