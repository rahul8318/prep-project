import { Router } from "express";
import { quizController } from "../controllers/quiz.controller";
import { authMiddleware } from "../middleware/auth";
import { validateRequest } from "../middleware/validation";
import { paginationSchema, startQuizSchema } from "../validators";

const router = Router();

router.post("/start", authMiddleware, validateRequest(startQuizSchema, "body"), quizController.startQuiz);
router.post("/:id/submit", authMiddleware, quizController.submitQuiz);
router.get("/history", authMiddleware, validateRequest(paginationSchema, "query"), quizController.getQuizHistory);
router.get("/results/:id", authMiddleware, quizController.getQuizResult);

export default router;
