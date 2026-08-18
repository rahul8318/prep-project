import { QuizResult } from "../models/QuizResult";
import { InterviewResult } from "../models/InterviewResult";

export const getOverview = async (userId: string) => {
  const [quizResults, interviewResults] = await Promise.all([
    QuizResult.find({ userId }),
    InterviewResult.find({ userId }),
  ]);

  const totalQuizzes = quizResults.length;
  const totalInterviews = interviewResults.length;

  const totalQuestions = quizResults.reduce(
    (sum: number, q: any) => sum + q.totalQuestions,
    0,
  );
  const solvedQuestions = quizResults.reduce(
    (sum: number, q: any) => sum + q.correctAnswers,
    0,
  );

  const overallAccuracy =
    totalQuestions > 0
      ? Math.round((solvedQuestions / totalQuestions) * 100)
      : 0;

  const avgInterviewScore =
    interviewResults.length > 0
      ? Math.round(
          interviewResults.reduce((sum: number, r: any) => sum + r.score, 0) /
            interviewResults.length,
        )
      : 0;

  const streak = calculateStreak(quizResults, interviewResults);
  const preparationPercentage = Math.min(
    100,
    Math.round(streak * 5 + totalQuizzes * 2 + totalInterviews * 5),
  );

  return {
    totalQuestions,
    solvedQuestions,
    accuracy: overallAccuracy,
    streak,
    totalQuizzes,
    totalInterviews,
    avgInterviewScore,
    preparationPercentage: Math.max(0, Math.min(100, preparationPercentage)),
  };
};

const calculateStreak = (
  quizResults: any[],
  interviewResults: any[],
): number => {
  const allResults = [
    ...quizResults.map((q) => q.createdAt),
    ...interviewResults.map((i) => i.createdAt),
  ].sort((a, b) => (b as any).getTime() - (a as any).getTime());

  if (allResults.length === 0) return 0;

  const uniqueDays = new Set(
    allResults.map((d) => {
      const date = new Date(d);
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    }),
  );

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < 365; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() - i);
    const key = `${checkDate.getFullYear()}-${checkDate.getMonth()}-${checkDate.getDate()}`;

    if (uniqueDays.has(key)) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }

  return streak;
};

export const getCategories = async (userId: string) => {
  const quizResults = await QuizResult.find({ userId });

  const categoryMap = new Map<
    string,
    { total: number; correct: number; count: number }
  >();

  quizResults.forEach((result: any) => {
    const current = categoryMap.get(result.category) || {
      total: 0,
      correct: 0,
      count: 0,
    };
    current.total += result.totalQuestions;
    current.correct += result.correctAnswers;
    current.count += 1;
    categoryMap.set(result.category, current);
  });

  const categories = [
    "JavaScript",
    "React",
    "TypeScript",
    "HTML",
    "CSS",
    "DSA",
    "DBMS",
    "Operating Systems",
    "Computer Networks",
  ];

  const breakdown = categories.map((cat) => {
    const data = categoryMap.get(cat);
    const accuracy =
      data && data.total > 0
        ? Math.round((data.correct / data.total) * 100)
        : 0;
    const solved = data ? data.correct : 0;
    const total = data ? data.total : 0;

    return {
      category: cat,
      accuracy,
      solved,
      total,
    };
  });

  return breakdown;
};

export const getActivity = async (userId: string, days: number = 7) => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - days);

  const quizResults = await QuizResult.find({
    userId,
    createdAt: { $gte: startDate, $lte: endDate },
  });

  const interviewResults = await InterviewResult.find({
    userId,
    createdAt: { $gte: startDate, $lte: endDate },
  });

  const activityMap = new Map<string, number>();

  for (let i = 0; i < days; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    const key = d.toISOString().split("T")[0];
    activityMap.set(key, 0);
  }

  quizResults.forEach((q: any) => {
    const key = new Date(q.createdAt).toISOString().split("T")[0];
    if (activityMap.has(key)) {
      activityMap.set(key, activityMap.get(key)! + 1);
    }
  });

  interviewResults.forEach((i: any) => {
    const key = new Date(i.createdAt).toISOString().split("T")[0];
    if (activityMap.has(key)) {
      activityMap.set(key, activityMap.get(key)! + 1);
    }
  });

  const activity = Array.from(activityMap.entries()).map(([date, count]) => ({
    date,
    count,
  }));

  return activity;
};

export const getAccuracy = async (userId: string) => {
  const quizResults = await QuizResult.find({ userId }).sort({ createdAt: 1 });

  const accuracyByDate = new Map<string, { total: number; correct: number }>();

  quizResults.forEach((q: any) => {
    const key = new Date(q.createdAt).toISOString().split("T")[0];
    const current = accuracyByDate.get(key) || { total: 0, correct: 0 };
    current.total += q.totalQuestions;
    current.correct += q.correctAnswers;
    accuracyByDate.set(key, current);
  });

  const trend = Array.from(accuracyByDate.entries()).map(([date, data]) => ({
    date,
    accuracy:
      data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
  }));

  const overallAccuracy =
    trend.length > 0
      ? Math.round(trend.reduce((sum, t) => sum + t.accuracy, 0) / trend.length)
      : 0;

  return {
    trend,
    overallAccuracy,
  };
};

export const analyticsService = {
  getOverview,
  getCategories,
  getActivity,
  getAccuracy,
};
