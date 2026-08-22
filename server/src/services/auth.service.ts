import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, IUser } from "../models/User";
import {
  generateToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";

const blacklistedTokens = new Set<string>();

export const register = async (
  name: string,
  email: string,
  password: string,
) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  const user = await User.create({ name, email, password });

  const accessToken = generateToken({
    id: user._id,
    email: user.email,
    role: user.role,
  });
  const refreshToken = generateRefreshToken({
    id: user._id,
    email: user.email,
    role: user.role,
  });

  const userWithoutPassword = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    profilePicture: user.profilePicture,
    targetRole: user.targetRole,
    skills: user.skills,
    preparationLevel: user.preparationLevel,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return {
    user: userWithoutPassword,
    accessToken,
    refreshToken,
  };
};

export const login = async (email: string, password: string) => {
  const normalizedEmail = email.trim().toLowerCase();
  const user = (await User.findOne({ email: normalizedEmail }).select(
    "+password",
  )) as IUser | null;
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateToken({
    id: user._id,
    email: user.email,
    role: user.role,
  });
  const refreshToken = generateRefreshToken({
    id: user._id,
    email: user.email,
    role: user.role,
  });

  const userWithoutPassword = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    profilePicture: user.profilePicture,
    targetRole: user.targetRole,
    skills: user.skills,
    preparationLevel: user.preparationLevel,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return {
    user: userWithoutPassword,
    accessToken,
    refreshToken,
  };
};

export const getMe = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const userWithoutPassword = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    profilePicture: user.profilePicture,
    targetRole: user.targetRole,
    skills: user.skills,
    preparationLevel: user.preparationLevel,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return userWithoutPassword;
};

export const refreshToken = async (token: string) => {
  if (blacklistedTokens.has(token)) {
    throw new Error("Token has been blacklisted");
  }

  const decoded = verifyRefreshToken(token) as {
    id: string;
    email: string;
    role: string;
  };

  const user = await User.findById(decoded.id);
  if (!user) {
    throw new Error("User not found");
  }

  const newAccessToken = generateToken({
    id: user._id,
    email: user.email,
    role: user.role,
  });

  return { accessToken: newAccessToken };
};

export const logout = async (token: string) => {
  if (token) {
    blacklistedTokens.add(token);
  }
};

export const authService = { register, login, getMe, refreshToken, logout };
