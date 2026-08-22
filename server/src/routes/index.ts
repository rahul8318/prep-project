import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import quizRoutes from "./quiz.routes";
import interviewRoutes from "./interview.routes";
import bookmarkRoutes from "./bookmark.routes";
import flashcardRoutes from "./flashcard.routes";
import dailyChallengeRoutes from "./dailyChallenge.routes";
import analyticsRoutes from "./analytics.routes";
import achievementRoutes from "./achievement.routes";
import adminRoutes from "./admin.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/quizzes", quizRoutes);
router.use("/interviews", interviewRoutes);
router.use("/bookmarks", bookmarkRoutes);
router.use("/flashcards", flashcardRoutes);
router.use("/daily-challenges", dailyChallengeRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/achievements", achievementRoutes);
router.use("/admin", adminRoutes);

export { authRoutes, userRoutes, quizRoutes, interviewRoutes, bookmarkRoutes, flashcardRoutes, dailyChallengeRoutes, analyticsRoutes, achievementRoutes, adminRoutes };
export default router;
