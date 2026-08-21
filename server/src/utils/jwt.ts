import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "fallback_secret";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "fallback_refresh_secret";

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, SECRET as jwt.Secret, { expiresIn: "15m" });
};

export const generateRefreshToken = (payload: object): string => {
  return jwt.sign(payload, REFRESH_SECRET as jwt.Secret, { expiresIn: "7d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET as jwt.Secret);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_SECRET as jwt.Secret);
};
