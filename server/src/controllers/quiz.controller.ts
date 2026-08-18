import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { quizService } from "../services/quiz.service";
import { sendSuccess, sendError } from "../utils/response";

export const startQuiz = async (req: AuthRequest, res: Response) => {
  try {
    const result = await quizService.startQuiz(req.user!.id, req.body);
    sendSuccess(res, result, "Quiz started successfully");
  } catch (error) {
    sendError(res, "Failed to start quiz", 500, [(error as Error).message]);
  }
};

export const submitQuiz = async (req: AuthRequest, res: Response) => {
  try {
    const result = await quizService.submitQuiz(req.user!.id, req.body);
    sendSuccess(res, result, "Quiz submitted successfully");
  } catch (error) {
    sendError(res, "Failed to submit quiz", 500, [(error as Error).message]);
  }
};

export const getQuizHistory = async (req: AuthRequest, res: Response) => {
  try {
    const { page, limit } = req.query;
    const result = await quizService.getQuizHistory(req.user!.id, {
      page: page ? parseInt(page as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
    });
    sendSuccess(res, result);
  } catch (error) {
    sendError(res, "Failed to fetch quiz history", 500, [(error as Error).message]);
  }
};

export const getQuizResult = async (req: AuthRequest, res: Response) => {
  try {
    const result = await quizService.getQuizResult(req.user!.id, req.params.id as string);
    if (!result) {
      sendError(res, "Quiz result not found", 404);
      return;
    }
    sendSuccess(res, result);
  } catch (error) {
    sendError(res, "Failed to fetch quiz result", 500, [(error as Error).message]);
  }
};

export const quizController = { startQuiz, submitQuiz, getQuizHistory, getQuizResult };
