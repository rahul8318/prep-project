import { allQuestions } from "../data/questions";
import { DailyChallenge } from "../models/DailyChallenge";
import { DailyChallengeProgress } from "../models/DailyChallengeProgress";

export const getDailyChallenge = async () => {
  const today = new Date().toISOString().split("T")[0];

  let challenge = await DailyChallenge.findOne({ date: today });

  if (!challenge) {
    const questionCount = Math.min(5, allQuestions.length);

    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, questionCount);
    const questionIds = selected.map((q) => `${q.category}-${q.topic}-${q.question}`.replace(/[^a-zA-Z0-9]/g, "_"));

    challenge = await DailyChallenge.create({
      date: today,
      questionIds,
    });
  }

  const questions = allQuestions.filter((q) =>
    challenge.questionIds.includes(`${q.category}-${q.topic}-${q.question}`.replace(/[^a-zA-Z0-9]/g, "_")),
  );

  const questionsWithoutAnswers = questions.map((q) => ({
    _id: `${q.category}-${q.topic}-${q.question}`.replace(/[^a-zA-Z0-9]/g, "_"),
    question: q.question,
    category: q.category,
    topic: q.topic,
    difficulty: q.difficulty,
    type: q.type,
    options: q.options,
    tags: q.tags,
  }));

  return {
    _id: challenge._id.toString(),
    date: challenge.date,
    questions: questionsWithoutAnswers,
    totalQuestions: questionsWithoutAnswers.length,
  };
};

export const completeQuestion = async (userId: string, questionId: string) => {
  const today = new Date().toISOString().split("T")[0];

  const challenge = await DailyChallenge.findOne({ date: today });
  if (!challenge) {
    throw new Error("No daily challenge available for today");
  }

  const progress = await DailyChallengeProgress.findOne({ userId, date: today });

  if (!progress) {
    const newProgress = await DailyChallengeProgress.create({
      userId,
      date: today,
      completedQuestions: [questionId],
      completed: challenge.questionIds.length === 1,
    });
    return newProgress;
  }

  if (!progress.completedQuestions.includes(questionId)) {
    progress.completedQuestions.push(questionId);
  }

  progress.completed = progress.completedQuestions.length >= challenge.questionIds.length;

  await progress.save();
  return progress;
};

export const getDailyProgress = async (userId: string) => {
  const today = new Date().toISOString().split("T")[0];

  const progress = await DailyChallengeProgress.findOne({ userId, date: today });

  if (!progress) {
    return {
      userId,
      date: today,
      completedQuestions: [],
      completed: false,
      totalQuestions: 0,
    };
  }

  const challenge = await DailyChallenge.findOne({ date: today });

  return {
    _id: progress._id.toString(),
    userId: progress.userId,
    date: progress.date,
    completedQuestions: progress.completedQuestions,
    completed: progress.completed,
    totalQuestions: challenge ? challenge.questionIds.length : 0,
    createdAt: progress.createdAt,
    updatedAt: progress.updatedAt,
  };
};

export const dailyChallengeService = { getDailyChallenge, completeQuestion, getDailyProgress };
