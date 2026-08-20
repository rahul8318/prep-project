import { Request, Response } from "express";
import { questionService } from "../services/question.service";
import { sendSuccess, sendError } from "../utils/response";

export const getQuestions = async (req: Request, res: Response) => {
  try {
    const { page, limit, category, difficulty, topic, search } = req.query;
    const result = await questionService.getQuestions({
      page: page ? parseInt(page as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
      category: category as string,
      difficulty: difficulty as string,
      topic: topic as string,
      search: search as string,
    });
    sendSuccess(res, result);
  } catch (error) {
    sendError(res, "Failed to fetch questions", 500, [(error as Error).message]);
  }
};

export const getQuestionById = async (req: Request, res: Response) => {
  try {
    const question = await questionService.getQuestionById(req.params.id as string);
    if (!question) {
      sendError(res, "Question not found", 404);
      return;
    }
    sendSuccess(res, question);
  } catch (error) {
    sendError(res, "Failed to fetch question", 500, [(error as Error).message]);
  }
};

export const createQuestion = async (req: Request, res: Response) => {
  try {
    const question = await questionService.createQuestion(req.body);
    sendSuccess(res, question, "Question created successfully", 201);
  } catch (error) {
    sendError(res, "Failed to create question", 500, [(error as Error).message]);
  }
};

export const updateQuestion = async (req: Request, res: Response) => {
  try {
    const question = await questionService.updateQuestion(req.params.id as string, req.body);
    if (!question) {
      sendError(res, "Question not found", 404);
      return;
    }
    sendSuccess(res, question, "Question updated successfully");
  } catch (error) {
    sendError(res, "Failed to update question", 500, [(error as Error).message]);
  }
};

export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const question = await questionService.deleteQuestion(req.params.id as string);
    if (!question) {
      sendError(res, "Question not found", 404);
      return;
    }
    sendSuccess(res, null, "Question deleted successfully");
  } catch (error) {
    sendError(res, "Failed to delete question", 500, [(error as Error).message]);
  }
};

export const questionController = { getQuestions, getQuestionById, createQuestion, updateQuestion, deleteQuestion };
