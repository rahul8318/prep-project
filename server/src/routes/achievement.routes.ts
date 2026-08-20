import { Router } from "express";
import {
  checkAchievements,
  getUserAchievements,
} from "../controllers/achievement.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/check", authMiddleware, checkAchievements);
router.get("/", authMiddleware, getUserAchievements);

export default router;
