import { Router } from "express";
import {
  getBookmarks,
  addBookmark,
  removeBookmark,
  checkBookmark,
} from "../controllers/bookmark.controller";
import { authMiddleware } from "../middleware/auth";
import { validateRequest } from "../middleware/validation";
import { paginationSchema } from "../validators";

const router = Router();

router.get("/", authMiddleware, validateRequest(paginationSchema), getBookmarks);
router.post("/:questionId", authMiddleware, addBookmark);
router.delete("/:questionId", authMiddleware, removeBookmark);
router.get("/check/:questionId", authMiddleware, checkBookmark);

export default router;
