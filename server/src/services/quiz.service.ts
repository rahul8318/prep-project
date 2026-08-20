import { Question } from "../models/Question";
import { QuizResult } from "../models/QuizResult";

interface QuizSession {
  userId: string;
  questions: Array<{
    _id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    category: string;
    difficulty: string;
    topic: string;
    explanation: string;
  }>;
  expiresAt: number;
}

const quizSessions = new Map<string, QuizSession>();

const SESSION_DURATION = 30 * 60 * 1000;

const shuffleArray = <T>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const validateQuestion = (q: any): void => {
  const opts = q.options;
  if (!Array.isArray(opts) || opts.length !== 4) {
    throw new Error(`Question "${q.question}" must have exactly 4 options`);
  }
  if (!opts.includes(q.correctAnswer)) {
    throw new Error(`Correct answer for "${q.question}" must be one of the options`);
  }
};

export const startQuiz = async (
  userId: string,
  filters: { category?: string; difficulty?: string; count?: number },
) => {
  const { category, difficulty, count = 10 } = filters;
  const query: Record<string, unknown> = { type: "MCQ" };

  if (category) query.category = category;
  if (difficulty) query.difficulty = difficulty;

  const questions = await Question.find(query).limit(count * 3);
  const shuffled = shuffleArray(questions);
  const selected = shuffled.slice(0, count);

  const sessionQuestions = selected.map((q: any) => {
    validateQuestion(q);
    return {
      _id: q._id.toString(),
      question: q.question,
      options: shuffleArray([...q.options]),
      correctAnswer: q.correctAnswer,
      category: q.category,
      difficulty: q.difficulty,
      topic: q.topic,
      explanation: q.explanation,
    };
  });

  const sessionId = `quiz_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  quizSessions.set(sessionId, {
    userId,
    questions: sessionQuestions,
    expiresAt: Date.now() + SESSION_DURATION,
  });

  const responseQuestions = sessionQuestions.map((q) => ({
    id: q._id,
    question: q.question,
    options: q.options,
    category: q.category,
    difficulty: q.difficulty,
    topic: q.topic,
  }));

  return { sessionId, questions: responseQuestions };
};

export const submitQuiz = async (
  userId: string,
  data: { sessionId: string; answers: Record<string, string>; timeTaken: number },
) => {
  const session = quizSessions.get(data.sessionId);
  if (!session || session.userId !== userId) {
    throw new Error("Invalid or expired quiz session");
  }

  let correctAnswers = 0;
  const questionsWithAnswers = session.questions.map((q) => {
    const userAnswer = data.answers[q._id] || "";
    const isCorrect = userAnswer === q.correctAnswer;
    if (isCorrect) correctAnswers++;

    return {
      questionId: q._id,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      userAnswer,
    };
  });

  const totalQuestions = session.questions.length;
  const incorrectAnswers = totalQuestions - correctAnswers;
  const score = Math.round((correctAnswers / totalQuestions) * 100);
  const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

  const category = session.questions[0]?.category || "";
  const difficulty = session.questions[0]?.difficulty || "";

  const quizResult = await QuizResult.create({
    userId,
    questions: questionsWithAnswers,
    score,
    totalQuestions,
    correctAnswers,
    incorrectAnswers,
    accuracy,
    timeTaken: data.timeTaken,
    category,
    difficulty,
  });

  quizSessions.delete(data.sessionId);

  return {
    result: quizResult,
    score,
    accuracy,
    correctAnswers,
    incorrectAnswers,
    timeTaken: data.timeTaken,
  };
};

export const getQuizHistory = async (userId: string, pagination: { page?: number; limit?: number }) => {
  const { getPagination: getPg, getSkip } = await import("../utils/pagination");
  const pg = getPg(pagination.page, pagination.limit);
  const skip = getSkip(pg.page, pg.limit);

  const [data, total] = await Promise.all([
    QuizResult.find({ userId }).skip(skip).limit(pg.limit).sort({ createdAt: -1 }),
    QuizResult.countDocuments({ userId }),
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

export const getQuizResult = async (userId: string, resultId: string) => {
  return QuizResult.findOne({ _id: resultId, userId });
};

export const quizService = { startQuiz, submitQuiz, getQuizHistory, getQuizResult };
