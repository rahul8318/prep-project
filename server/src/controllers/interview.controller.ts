import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { interviewService } from "../services/interview.service";
import { sendSuccess, sendError } from "../utils/response";

export const startInterview = async (req: AuthRequest, res: Response) => {
  try {
    const result = await interviewService.startInterview(req.user!.id, req.body);
    sendSuccess(res, result, "Interview started successfully");
  } catch (error) {
    sendError(res, "Failed to start interview", 500, [(error as Error).message]);
  }
};

export const submitAnswer = async (req: AuthRequest, res: Response) => {
  try {
    const sessionId = req.params.id as string;
    const result = await interviewService.submitAnswer(req.user!.id, {
      sessionId,
      questionId: req.body.questionId,
      answer: req.body.answer,
    });
    sendSuccess(res, result, "Answer submitted successfully");
  } catch (error) {
    sendError(res, "Failed to submit answer", 500, [(error as Error).message]);
  }
};

export const nextQuestion = async (req: AuthRequest, res: Response) => {
  try {
    const sessionId = req.params.id as string;
    const result = await interviewService.nextQuestion(req.user!.id, sessionId);
    sendSuccess(res, result, "Next question retrieved");
  } catch (error) {
    sendError(res, "Failed to get next question", 500, [(error as Error).message]);
  }
};

export const completeInterview = async (req: AuthRequest, res: Response) => {
  try {
    const result = await interviewService.completeInterview(req.user!.id, req.params.id as string);
    sendSuccess(res, result, "Interview completed successfully");
  } catch (error) {
    sendError(res, "Failed to complete interview", 500, [(error as Error).message]);
  }
};

export const getInterviewHistory = async (req: AuthRequest, res: Response) => {
  try {
    const { page, limit } = req.query;
    const result = await interviewService.getInterviewHistory(req.user!.id, {
      page: page ? parseInt(page as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
    });
    sendSuccess(res, result);
  } catch (error) {
    sendError(res, "Failed to fetch interview history", 500, [(error as Error).message]);
  }
};

export const getInterviewResult = async (req: AuthRequest, res: Response) => {
  try {
    const result = await interviewService.getInterviewResult(req.user!.id, req.params.id as string);
    if (!result) {
      sendError(res, "Interview result not found", 404);
      return;
    }
    sendSuccess(res, result);
  } catch (error) {
    sendError(res, "Failed to fetch interview result", 500, [(error as Error).message]);
  }
};

export const interviewController = { startInterview, submitAnswer, nextQuestion, completeInterview, getInterviewHistory, getInterviewResult };
