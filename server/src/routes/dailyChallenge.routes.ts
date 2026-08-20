import { Router } from "express";
import {
  getDailyChallenge,
  completeQuestion,
  getDailyProgress,
} from "../controllers/dailyChallenge.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/", authMiddleware, getDailyChallenge);
router.post("/:questionId/complete", authMiddleware, completeQuestion);
router.get("/progress", authMiddleware, getDailyProgress);

export default router;
