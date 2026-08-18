import { Question } from "../models/Question";
import { DailyChallenge } from "../models/DailyChallenge";
import { DailyChallengeProgress } from "../models/DailyChallengeProgress";

export const getDailyChallenge = async () => {
  const today = new Date().toISOString().split("T")[0];

  let challenge = await DailyChallenge.findOne({ date: today });

  if (!challenge) {
    const totalQuestions = await Question.countDocuments();
    const questionCount = Math.min(5, totalQuestions);

    const pipeline = [
      { $sample: { size: questionCount } },
      { $project: { _id: 1 } },
    ];

    const samples = await Question.aggregate(pipeline) as Array<{ _id: any }>;
    const questionIds = samples.map((s) => s._id.toString());

    challenge = await DailyChallenge.create({
      date: today,
      questionIds,
    });
  }

  const questions = await Question.find({
    _id: { $in: challenge.questionIds },
  });

  const questionsWithoutAnswers = questions.map((q) => ({
    _id: q._id.toString(),
    question: q.question,
    category: q.category,
    topic: q.topic,
    difficulty: q.difficulty,
    type: q.type,
    options: q.options,
    tags: q.tags,
    codeExample: q.codeExample,
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
