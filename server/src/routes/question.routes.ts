import { Router } from "express";
import { questionController } from "../controllers/question.controller";
import { authMiddleware, adminMiddleware } from "../middleware/auth";
import { validateRequest } from "../middleware/validation";
import { questionSchema, paginationSchema } from "../validators";

const router = Router();

router.get("/", validateRequest(paginationSchema, "query"), questionController.getQuestions);
router.get("/:id", questionController.getQuestionById);
router.post("/", authMiddleware, adminMiddleware, validateRequest(questionSchema, "body"), questionController.createQuestion);
router.put("/:id", authMiddleware, adminMiddleware, validateRequest(questionSchema, "body"), questionController.updateQuestion);
router.delete("/:id", authMiddleware, adminMiddleware, questionController.deleteQuestion);

export default router;
