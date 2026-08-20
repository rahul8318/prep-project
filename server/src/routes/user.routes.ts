import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth";
import { validateRequest } from "../middleware/validation";
import { updateProfileSchema, changePasswordSchema } from "../validators";

const router = Router();

router.get("/me", authMiddleware, userController.getMe);
router.put("/me", authMiddleware, validateRequest(updateProfileSchema, "body"), userController.updateProfile);
router.put("/me/password", authMiddleware, validateRequest(changePasswordSchema, "body"), userController.changePassword);
router.get("/me/stats", authMiddleware, userController.getUserStats);

export default router;
