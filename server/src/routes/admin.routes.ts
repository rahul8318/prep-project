import { Router } from "express";
import {
  getAllUsers,
  getStatistics,
} from "../controllers/admin.controller";
import { authMiddleware, adminMiddleware } from "../middleware/auth";
import { validateRequest } from "../middleware/validation";
import { paginationSchema } from "../validators";

const router = Router();

router.get("/users", authMiddleware, adminMiddleware, validateRequest(paginationSchema), getAllUsers);
router.get("/statistics", authMiddleware, adminMiddleware, getStatistics);

export default router;
