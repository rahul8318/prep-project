import { Router } from "express";
import {
  startInterview,
  submitAnswer,
  nextQuestion,
  completeInterview,
  getInterviewHistory,
  getInterviewResult,
} from "../controllers/interview.controller";
import { authMiddleware } from "../middleware/auth";
import { validateRequest } from "../middleware/validation";
import { paginationSchema } from "../validators";

const router = Router();

router.post("/start", authMiddleware, startInterview);
router.post("/:id/answer", authMiddleware, submitAnswer);
router.post("/:id/next", authMiddleware, nextQuestion);
router.post("/:id/complete", authMiddleware, completeInterview);
router.get("/history", authMiddleware, validateRequest(paginationSchema), getInterviewHistory);
router.get("/:id", authMiddleware, getInterviewResult);

export default router;
