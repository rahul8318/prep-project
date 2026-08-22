import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).max(50).optional(),
  targetRole: Joi.string().optional(),
  skills: Joi.array().items(Joi.string()).optional(),
  preparationLevel: Joi.string().optional(),
  profilePicture: Joi.string().optional(),
});

export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
});

export const startQuizSchema = Joi.object({
  category: Joi.string().optional(),
  difficulty: Joi.string().optional(),
  count: Joi.number().integer().min(1).max(50).optional(),
});

export const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).max(100).optional(),
  category: Joi.string().optional(),
  difficulty: Joi.string().optional(),
  topic: Joi.string().optional(),
  search: Joi.string().optional(),
});
