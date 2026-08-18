import { Question } from "../models/Question";
import { InterviewResult } from "../models/InterviewResult";

const interviewSessions = new Map<
  string,
  {
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
    expiresAt: number;
  }
>();

const SESSION_DURATION = 30 * 60 * 1000;

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const generateMockFeedback = () => {
  const strengthsList = [
    "Strong understanding of core concepts",
    "Clear explanation of technical terms",
    "Good problem-solving approach",
    "Effective use of examples",
    "Demonstrates solid foundation",
    "Articulate communication style",
    "Structured thinking process",
    "Attention to detail",
  ];

  const weaknessesList = [
    "Could improve depth in advanced topics",
    "More practice with edge cases needed",
    "Limited experience with system design",
    "Need to strengthen debugging skills",
    "Time management during interviews",
    "Less exposure to real-world scenarios",
    "Could elaborate more on trade-offs",
    "Need more hands-on project experience",
  ];

  const recommendationsList = [
    "Practice more system design questions",
    "Review advanced data structures",
    "Build more real-world projects",
    "Participate in mock interviews regularly",
    "Study industry best practices",
    "Work on open source contributions",
    "Focus on behavioral question preparation",
    "Improve technical writing skills",
  ];

  const pick = (arr: string[], count: number) => {
    const shuffled = shuffleArray(arr);
    return shuffled.slice(0, count);
  };

  return {
    strengths: pick(strengthsList, 2 + Math.floor(Math.random() * 2)),
    weaknesses: pick(weaknessesList, 2 + Math.floor(Math.random() * 2)),
    recommendations: pick(recommendationsList, 2 + Math.floor(Math.random() * 2)),
  };
};

export const startInterview = async (
  userId: string,
  data: { category: string; difficulty: string },
) => {
  const { category, difficulty } = data;
  const query: Record<string, unknown> = {};

  if (category) query.category = category;
  if (difficulty) query.difficulty = difficulty;

  const allQuestions = await Question.find(query).limit(20);
  const shuffled = shuffleArray(allQuestions);
  const selectedCount = 3 + Math.floor(Math.random() * 3);
  const selected = shuffled.slice(0, Math.min(selectedCount, shuffled.length));

  const sessionQuestions = selected.map((q: any) => ({
    _id: q._id.toString(),
    question: q.question,
    topic: q.topic,
    difficulty: q.difficulty,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
  }));

  const sessionId = `interview_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  interviewSessions.set(sessionId, {
    userId,
    category,
    difficulty,
    questions: sessionQuestions,
    expiresAt: Date.now() + SESSION_DURATION,
  });

  const responseQuestions = sessionQuestions.map((q) => ({
    id: q._id,
    question: q.question,
    topic: q.topic,
    difficulty: q.difficulty,
    options: q.options,
  }));

  return {
    sessionId,
    questions: responseQuestions,
    timeLimit: 900,
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
  return { success: true };
};

export const completeInterview = async (userId: string, sessionId: string) => {
  const session = interviewSessions.get(sessionId);
  if (!session || session.userId !== userId) {
    throw new Error("Invalid or expired interview session");
  }

  const technicalScore = Math.round(60 + Math.random() * 35);
  const communicationScore = Math.round(65 + Math.random() * 30);
  const score = Math.round((technicalScore + communicationScore) / 2);

  const { strengths, weaknesses, recommendations } = generateMockFeedback();

  const questions = session.questions.map((q) => ({
    questionId: q._id,
    question: q.question,
    userAnswer: q.userAnswer || "",
  }));

  const answers = session.questions.map((q) => ({
    questionId: q._id,
    answer: q.userAnswer || "",
  }));

  const result = await InterviewResult.create({
    userId,
    category: session.category,
    difficulty: session.difficulty,
    questions,
    answers,
    score,
    technicalScore,
    communicationScore,
    strengths,
    weaknesses,
    recommendations,
  });

  interviewSessions.delete(sessionId);

  return result;
};

export const getInterviewHistory = async (userId: string, pagination: { page?: number; limit?: number }) => {
  const { getPagination: getPg, getSkip } = await import("../utils/pagination");
  const pg = getPg(pagination.page, pagination.limit);
  const skip = getSkip(pg.page, pg.limit);

  const [data, total] = await Promise.all([
    InterviewResult.find({ userId })
      .skip(skip)
      .limit(pg.limit)
      .sort({ createdAt: -1 }),
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

export const interviewService = { startInterview, submitAnswer, completeInterview, getInterviewHistory, getInterviewResult };
