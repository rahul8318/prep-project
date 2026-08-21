import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { config } from "./config/env";
import { connectDB } from "./config/db";
import router from "./routes";
import { errorMiddleware } from "./middleware/error";
import { rateLimitMiddleware } from "./middleware/rateLimit";

const isVercel = process.env.VERCEL === "1";

const app: Application = express();

app.use(helmet());
app.use(
  cors({
    origin: config.clientUrl,
    credentials: true,
  }),
);
app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());
app.use(rateLimitMiddleware(100, 60000));

app.use(isVercel ? "/" : "/api", router);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

app.use(errorMiddleware);

export default app;
