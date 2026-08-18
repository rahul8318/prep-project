import { Request, Response, NextFunction } from "express";

const requestCounts = new Map<string, { count: number; resetTime: number }>();

export const rateLimitMiddleware = (
  maxRequests: number = 100,
  windowMs: number = 60000,
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const key = req.ip || req.socket.remoteAddress || "unknown";
    const now = Date.now();

    const record = requestCounts.get(key);
    if (!record || now > record.resetTime) {
      requestCounts.set(key, { count: 1, resetTime: now + windowMs });
      next();
      return;
    }

    record.count += 1;
    if (record.count > maxRequests) {
      res.status(429).json({
        success: false,
        message: "Too many requests, please try again later.",
      });
      return;
    }

    next();
  };
};
