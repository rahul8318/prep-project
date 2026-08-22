import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "../config/db";
import { Achievement } from "../models/Achievement";

dotenv.config();

const achievements = [
  { title: "First Quiz", description: "Complete your first quiz", icon: "🎯", requirement: { type: "quizzes_completed", value: 1 } },
  { title: "Quiz Enthusiast", description: "Complete 5 quizzes", icon: "📝", requirement: { type: "quizzes_completed", value: 5 } },
  { title: "Question Solver", description: "Solve 50 questions", icon: "✅", requirement: { type: "questions_solved", value: 50 } },
  { title: "Knowledge Master", description: "Solve 100 questions", icon: "🏆", requirement: { type: "questions_solved", value: 100 } },
  { title: "Week Warrior", description: "Maintain a 7-day streak", icon: "🔥", requirement: { type: "streak_days", value: 7 } },
  { title: "Sharpshooter", description: "Achieve 90% accuracy", icon: "🎯", requirement: { type: "accuracy_percentage", value: 90 } },
  { title: "First Interview", description: "Complete your first mock interview", icon: "🎤", requirement: { type: "interviews_completed", value: 1 } },
];

const seedDatabase = async (): Promise<void> => {
  try {
    await connectDB();

    await Achievement.deleteMany({});
    await Achievement.insertMany(achievements);
    console.log(`Seeded ${achievements.length} achievements`);

    await mongoose.disconnect();
    console.log("Database seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

void seedDatabase();
