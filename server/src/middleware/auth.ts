import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/env";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({
        success: false,
        message: "Not authorized, no token",
      });
      return;
    }

    const decoded = jwt.verify(token, config.jwt.secret) as {
      id: string;
      email: string;
      role: string;
    };

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Not authorized, token failed",
    });
  }
};

export const adminMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  if (req.user?.role !== "admin") {
    res.status(403).json({
      success: false,
      message: "Not authorized as admin",
    });
    return;
  }
  next();
};
