import { Router } from "express";
import {
  getOverview,
  getCategories,
  getActivity,
  getAccuracy,
} from "../controllers/analytics.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/overview", authMiddleware, getOverview);
router.get("/categories", authMiddleware, getCategories);
router.get("/activity", authMiddleware, getActivity);
router.get("/accuracy", authMiddleware, getAccuracy);

export default router;
