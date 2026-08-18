import { Response } from "express";

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message?: string,
  statusCode = 200,
): void => {
  res.status(statusCode).json({
    success: true,
    data,
    message: message || "Operation successful",
  });
};

export const sendError = (
  res: Response,
  message: string,
  statusCode = 500,
  errors: string[] = [],
): void => {
  res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};
