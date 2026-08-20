import { Router } from "express";
import { getFlashcards, updateProgress } from "../controllers/flashcard.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/", authMiddleware, getFlashcards);
router.post("/:questionId/progress", authMiddleware, updateProgress);

export default router;
