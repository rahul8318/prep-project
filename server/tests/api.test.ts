import { describe, it, expect, beforeAll, afterAll, jest } from "vitest";
import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app";
import { connectDB, disconnectDB } from "../src/config/db";

const TEST_DB_URI = "mongodb://localhost:27017/interviewhub-test";

beforeAll(async () => {
  process.env.MONGODB_URI = TEST_DB_URI;
  process.env.JWT_SECRET = "test_secret";
  process.env.JWT_REFRESH_SECRET = "test_refresh_secret";
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await disconnectDB();
});

describe("Auth Endpoints", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ name: "Test User", email: "test@example.com", password: "password123" });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.email).toBe("test@example.com");
  });

  it("should login with valid credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "password123" });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.accessToken).toBeDefined();
  });

  it("should reject invalid login", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "wrong" });

    expect(res.status).toBe(401);
  });
});

describe("Question Endpoints", () => {
  it("should return 404 for removed question endpoints", async () => {
    const res = await request(app)
      .get("/api/questions?page=1&limit=10");

    expect(res.status).toBe(404);
  });
});

describe("Quiz Endpoints", () => {
  it("should start a quiz", async () => {
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "password123" });

    const token = loginRes.body.data.accessToken;

    const res = await request(app)
      .post("/api/quizzes/start")
      .set("Authorization", `Bearer ${token}`)
      .send({ category: "JavaScript", difficulty: "Beginner", count: 5 });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.questions).toBeDefined();
  });
});
