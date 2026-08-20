import jwt from "jsonwebtoken";

export const generateToken = (payload: object): string => {
  const secret = process.env.JWT_SECRET || "fallback_secret";
  const expire = process.env.JWT_EXPIRE || "15m";
  return jwt.sign(payload, secret, { expiresIn: expire });
};

export const generateRefreshToken = (payload: object): string => {
  const secret = process.env.JWT_REFRESH_SECRET || "fallback_refresh_secret";
  const expire = process.env.JWT_REFRESH_EXPIRE || "7d";
  return jwt.sign(payload, secret, { expiresIn: expire });
};

export const verifyToken = (token: string) => {
  const secret = process.env.JWT_SECRET || "fallback_secret";
  return jwt.verify(token, secret);
};

export const verifyRefreshToken = (token: string) => {
  const secret = process.env.JWT_REFRESH_SECRET || "fallback_refresh_secret";
  return jwt.verify(token, secret);
};
