import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./config/db";
import mongoose from "mongoose";
import { config } from "./config/env";

dotenv.config();

const isVercel = process.env.VERCEL === "1";

const startServer = async (): Promise<void> => {
  await connectDB();

  if (isVercel) {
    console.log("Server running on Vercel in serverless mode");
    return;
  }

  const server = app.listen(config.port, () => {
    console.log(`Server running on port ${config.port} in ${config.nodeEnv} mode`);
  });

  process.on("SIGTERM", async () => {
    console.log("SIGTERM received, shutting down gracefully");
    server.close(async () => {
      await mongoose.disconnect();
      process.exit(0);
    });
  });
};

void startServer();
