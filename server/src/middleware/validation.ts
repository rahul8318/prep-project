import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validateRequest = (schema: Joi.ObjectSchema, source: "body" | "query" = "body") => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const target = source === "query" ? req.query : req.body;
    const { error } = schema.validate(target);
    if (error) {
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: [error.details[0].message],
      });
      return;
    }
    next();
  };
};
