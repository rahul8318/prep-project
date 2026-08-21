import app from "../src/app";
import { connectDB } from "../src/config/db";

let dbPromise: Promise<void> | null = null;

if (!dbPromise) {
  dbPromise = connectDB().catch((error) => {
    console.error("MongoDB connection error:", error);
  });
}

export default async (req: any, res: any) => {
  if (dbPromise) {
    await dbPromise;
  }
  return app(req, res);
};
