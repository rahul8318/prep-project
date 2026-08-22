import app from "../src/app";
import { connectDB } from "../src/config/db";

let dbPromise: Promise<void> | null = null;
let dbConnected = false;

if (!dbPromise) {
  dbPromise = connectDB()
    .then(() => {
      dbConnected = true;
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
    });
}

export default async (req: any, res: any) => {
  if (dbPromise) {
    await dbPromise;
  }

  if (!dbConnected) {
    return res.status(500).json({
      success: false,
      message: "Database connection unavailable",
    });
  }

  return app(req, res);
};
