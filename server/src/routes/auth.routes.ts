import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth";
import { validateRequest } from "../middleware/validation";
import { registerSchema, loginSchema } from "../validators";

const router = Router();

router.post("/register", validateRequest(registerSchema, "body"), authController.register);
router.post("/login", validateRequest(loginSchema, "body"), authController.login);
router.get("/me", authMiddleware, authController.getMe);
router.post("/refresh", authController.refreshToken);
router.post("/logout", authController.logout);

export default router;
