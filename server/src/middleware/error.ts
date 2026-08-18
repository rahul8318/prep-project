import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.error("Error:", err);

  const statusCode = (err as any).statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    errors: process.env.NODE_ENV === "development" ? [err.stack || ""] : [],
  });
};
