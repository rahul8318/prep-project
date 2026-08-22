import { allQuestions, categories as allCategories } from "../data/questions";
import { InterviewResult } from "../models/InterviewResult";

interface InterviewSession {
  userId: string;
  category: string;
  difficulty: string;
  questions: Array<{
    _id: string;
    question: string;
    topic: string;
    difficulty: string;
    options?: string[];
    correctAnswer: string;
    explanation: string;
    userAnswer?: string;
  }>;
  currentIndex: number;
  expiresAt: number;
}

const interviewSessions = new Map<string, InterviewSession>();

const SESSION_DURATION = 30 * 60 * 1000;

const shuffleArray = <T>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const generateFeedback = (correctCount: number, total: number, topicStats: Record<string, { correct: number; total: number }>) => {
  const accuracy = total > 0 ? (correctCount / total) * 100 : 0;

  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const recommendations: string[] = [];

  Object.entries(topicStats).forEach(([topic, stats]) => {
    const topicAccuracy = stats.total > 0 ? (stats.correct / stats.total) * 100 : 0;
    if (topicAccuracy >= 70) {
      strengths.push(`Strong in ${topic}`);
    } else if (topicAccuracy <= 40) {
      weaknesses.push(`Needs improvement in ${topic}`);
      recommendations.push(`Practice more ${topic} questions`);
    }
  });

  if (strengths.length === 0) {
    strengths.push("Completed the interview session");
  }
  if (weaknesses.length === 0) {
    weaknesses.push("Review incorrect answers for improvement areas");
  }
  if (recommendations.length === 0) {
    recommendations.push("Continue practicing across all topics");
  }

  const delta = strengths.length > weaknesses.length ? 10 : -5;
  const technicalScore = Math.round(Math.min(95, Math.max(40, accuracy + delta)));
  const communicationScore = Math.round(Math.min(95, Math.max(40, accuracy + Math.random() * 20)));

  return {
    strengths: strengths.slice(0, 3),
    weaknesses: weaknesses.slice(0, 3),
    recommendations: recommendations.slice(0, 3),
    technicalScore,
    communicationScore,
  };
};

export const startInterview = async (
  userId: string,
  data: { category?: string; difficulty?: string; count?: number },
) => {
  const { category, difficulty, count = 5 } = data;

  const categoryMap: Record<string, string[]> = {
    Frontend: ["JavaScript", "React", "HTML", "CSS", "TypeScript"],
    Backend: ["Node.js", "DBMS", "Computer Networks", "Operating Systems", "DSA"],
    "Full Stack": ["JavaScript", "React", "HTML", "CSS", "TypeScript", "Node.js", "DBMS", "Computer Networks", "Operating Systems", "DSA"],
    "System Design": ["DSA", "DBMS", "Computer Networks", "Operating Systems"],
  };

  const categories = categoryMap[category || ""] || [];
  let filtered = allQuestions;

  if (categories.length > 0) {
    filtered = filtered.filter((q) => categories.includes(q.category));
  }
  if (difficulty) filtered = filtered.filter((q) => q.difficulty === difficulty);

  const shuffled = shuffleArray(filtered);
  const selected = shuffled.slice(0, count);

  if (selected.length === 0) {
    throw new Error("No questions available for the selected category and difficulty.");
  }

  const sessionQuestions = selected.map((q) => {
    const opts = Array.isArray(q.options) ? q.options : [];
    if (opts.length === 0 || !opts.includes(q.correctAnswer)) {
      throw new Error(`Invalid question data for "${q.question}"`);
    }
    return {
      _id: `${q.category}-${q.topic}-${q.question}`.replace(/[^a-zA-Z0-9]/g, "_"),
      question: q.question,
      topic: q.topic,
      difficulty: q.difficulty,
      options: shuffleArray([...opts]),
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
    };
  });

  if (sessionQuestions.length === 0) {
    throw new Error("No valid questions available for the selected category and difficulty.");
  }

  const sessionId = `interview_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  interviewSessions.set(sessionId, {
    userId,
    category: category || "General",
    difficulty: difficulty || "Intermediate",
    questions: sessionQuestions,
    currentIndex: 0,
    expiresAt: Date.now() + SESSION_DURATION,
  });

  const firstQuestion = sessionQuestions[0];
  return {
    sessionId,
    currentQuestion: {
      id: firstQuestion._id,
      question: firstQuestion.question,
      topic: firstQuestion.topic,
      difficulty: firstQuestion.difficulty,
      options: firstQuestion.options,
      currentIndex: 0,
      totalQuestions: sessionQuestions.length,
    },
    totalQuestions: sessionQuestions.length,
  };
};

export const submitAnswer = async (
  userId: string,
  data: { sessionId: string; questionId: string; answer: string },
) => {
  const session = interviewSessions.get(data.sessionId);
  if (!session || session.userId !== userId) {
    throw new Error("Invalid or expired interview session");
  }

  if (Date.now() > session.expiresAt) {
    interviewSessions.delete(data.sessionId);
    throw new Error("Interview session expired");
  }

  const question = session.questions.find((q) => q._id === data.questionId);
  if (!question) {
    throw new Error("Question not found in session");
  }

  question.userAnswer = data.answer;
  return { success: true, currentIndex: session.currentIndex };
};

export const nextQuestion = async (userId: string, sessionId: string) => {
  const session = interviewSessions.get(sessionId);
  if (!session || session.userId !== userId) {
    throw new Error("Invalid or expired interview session");
  }

  session.currentIndex += 1;
  const idx = session.currentIndex;

  if (idx >= session.questions.length) {
    return { done: true };
  }

  const q = session.questions[idx];
  return {
    done: false,
    currentQuestion: {
      id: q._id,
      question: q.question,
      topic: q.topic,
      difficulty: q.difficulty,
      options: q.options,
      currentIndex: idx,
      totalQuestions: session.questions.length,
    },
  };
};

export const completeInterview = async (userId: string, sessionId: string) => {
  const session = interviewSessions.get(sessionId);
  if (!session || session.userId !== userId) {
    throw new Error("Invalid or expired interview session");
  }

  let correctAnswers = 0;
  const topicStats: Record<string, { correct: number; total: number }> = {};

  session.questions.forEach((q) => {
    if (!topicStats[q.topic]) {
      topicStats[q.topic] = { correct: 0, total: 0 };
    }
    topicStats[q.topic].total += 1;
    if (q.userAnswer === q.correctAnswer) {
      correctAnswers += 1;
      topicStats[q.topic].correct += 1;
    }
  });

  const totalQuestions = session.questions.length;
  const feedback = generateFeedback(correctAnswers, totalQuestions, topicStats);

  const questions = session.questions.map((q) => ({
    questionId: q._id,
    question: q.question,
    topic: q.topic,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
    userAnswer: q.userAnswer || "",
  }));

  const result = await InterviewResult.create({
    userId,
    category: session.category,
    difficulty: session.difficulty,
    questions,
    answers: questions.map((q) => ({
      questionId: q.questionId,
      answer: q.userAnswer,
    })),
    score: feedback.technicalScore,
    technicalScore: feedback.technicalScore,
    communicationScore: feedback.communicationScore,
    strengths: feedback.strengths,
    weaknesses: feedback.weaknesses,
    recommendations: feedback.recommendations,
  });

  interviewSessions.delete(sessionId);

  return result;
};

export const getInterviewHistory = async (userId: string, pagination: { page?: number; limit?: number }) => {
  const { getPagination: getPg, getSkip } = await import("../utils/pagination");
  const pg = getPg(pagination.page, pagination.limit);
  const skip = getSkip(pg.page, pg.limit);

  const [data, total] = await Promise.all([
    InterviewResult.find({ userId }).skip(skip).limit(pg.limit).sort({ createdAt: -1 }),
    InterviewResult.countDocuments({ userId }),
  ]);

  return {
    data,
    pagination: {
      page: pg.page,
      limit: pg.limit,
      total,
      totalPages: Math.ceil(total / pg.limit),
    },
  };
};

export const getInterviewResult = async (userId: string, resultId: string) => {
  return InterviewResult.findOne({ _id: resultId, userId });
};

export const interviewService = { startInterview, submitAnswer, nextQuestion, completeInterview, getInterviewHistory, getInterviewResult };
