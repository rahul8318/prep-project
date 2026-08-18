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

export const getAllQuestions = async (req: AuthRequest, res: Response) => {
  try {
    const { page, limit, category, difficulty, search } = req.query;
    const result = await adminService.getAllQuestions(
      {
        page: page ? parseInt(page as string) : undefined,
        limit: limit ? parseInt(limit as string) : undefined,
      },
      {
        category: category as string | undefined,
        difficulty: difficulty as string | undefined,
        search: search as string | undefined,
      },
    );
    sendSuccess(res, result);
  } catch (error) {
    sendError(res, "Failed to fetch questions", 500, [(error as Error).message]);
  }
};

export const createQuestion = async (req: AuthRequest, res: Response) => {
  try {
    const question = await adminService.createQuestion(req.body);
    sendSuccess(res, question, "Question created successfully", 201);
  } catch (error) {
    sendError(res, "Failed to create question", 500, [(error as Error).message]);
  }
};

export const updateQuestion = async (req: AuthRequest, res: Response) => {
  try {
    const question = await adminService.updateQuestion(req.params.id as string, req.body);
    if (!question) {
      sendError(res, "Question not found", 404);
      return;
    }
    sendSuccess(res, question, "Question updated successfully");
  } catch (error) {
    sendError(res, "Failed to update question", 500, [(error as Error).message]);
  }
};

export const deleteQuestion = async (req: AuthRequest, res: Response) => {
  try {
    const question = await adminService.deleteQuestion(req.params.id as string);
    if (!question) {
      sendError(res, "Question not found", 404);
      return;
    }
    sendSuccess(res, null, "Question deleted successfully");
  } catch (error) {
    sendError(res, "Failed to delete question", 500, [(error as Error).message]);
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

export const adminController = { getAllUsers, getAllQuestions, createQuestion, updateQuestion, deleteQuestion, getStatistics };
