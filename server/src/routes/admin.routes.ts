import { Router } from "express";
import {
  getAllUsers,
  getAllQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getStatistics,
} from "../controllers/admin.controller";
import { authMiddleware, adminMiddleware } from "../middleware/auth";
import { validateRequest } from "../middleware/validation";
import { paginationSchema, questionSchema } from "../validators";

const router = Router();

router.get("/users", authMiddleware, adminMiddleware, validateRequest(paginationSchema), getAllUsers);
router.get("/questions", authMiddleware, adminMiddleware, validateRequest(paginationSchema), getAllQuestions);
router.post("/questions", authMiddleware, adminMiddleware, validateRequest(questionSchema), createQuestion);
router.put("/questions/:id", authMiddleware, adminMiddleware, validateRequest(questionSchema), updateQuestion);
router.delete("/questions/:id", authMiddleware, adminMiddleware, deleteQuestion);
router.get("/statistics", authMiddleware, adminMiddleware, getStatistics);

export default router;
