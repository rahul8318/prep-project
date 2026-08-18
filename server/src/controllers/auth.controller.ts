import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { authService } from "../services/auth.service";
import { sendSuccess, sendError } from "../utils/response";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const result = await authService.register(name, email, password);
    sendSuccess(res, result, "User registered successfully", 201);
  } catch (error) {
    sendError(res, "Failed to register user", 400, [(error as Error).message]);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    sendSuccess(res, result, "Login successful");
  } catch (error) {
    sendError(res, "Failed to login", 401, [(error as Error).message]);
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await authService.getMe(req.user!.id);
    sendSuccess(res, user);
  } catch (error) {
    sendError(res, "Failed to fetch user", 500, [(error as Error).message]);
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.refreshToken(refreshToken);
    sendSuccess(res, result);
  } catch (error) {
    sendError(res, "Failed to refresh token", 401, [(error as Error).message]);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    await authService.logout(token || "");
    sendSuccess(res, null, "Logged out successfully");
  } catch (error) {
    sendError(res, "Failed to logout", 500, [(error as Error).message]);
  }
};

export const authController = { register, login, getMe, refreshToken, logout };
