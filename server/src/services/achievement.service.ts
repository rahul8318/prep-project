import { Achievement } from "../models/Achievement";
import { UserAchievement } from "../models/UserAchievement";
import { QuizResult } from "../models/QuizResult";
import { InterviewResult } from "../models/InterviewResult";

export const checkAchievements = async (userId: string) => {
  const [existingAchievements, quizResults, interviewResults] =
    await Promise.all([
      UserAchievement.find({ userId }),
      QuizResult.find({ userId }),
      InterviewResult.find({ userId }),
    ]);

  const unlockedAchievementIds = new Set(
    existingAchievements.map((ua) => ua.achievementId.toString()),
  );

  const quizzesCompleted = quizResults.length;
  const questionsSolved = quizResults.reduce(
    (sum: number, q: any) => sum + q.correctAnswers,
    0,
  );

  const uniqueDays = new Set(
    [...quizResults, ...interviewResults].map((r) => {
      const d = new Date(r.createdAt);
      return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    }),
  );
  const streakDays = uniqueDays.size;

  const totalQuestions = quizResults.reduce((sum: number, q: any) => sum + q.totalQuestions, 0);
  const totalCorrect = quizResults.reduce((sum: number, q: any) => sum + q.correctAnswers, 0);
  const accuracyPercentage =
    totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  const interviewsCompleted = interviewResults.length;

  const stats = {
    quizzes_completed: quizzesCompleted,
    questions_solved: questionsSolved,
    streak_days: streakDays,
    accuracy_percentage: accuracyPercentage,
    interviews_completed: interviewsCompleted,
  };

  const allAchievements = await Achievement.find();

  const newUnlocks: string[] = [];

  for (const achievement of allAchievements) {
    if (unlockedAchievementIds.has(achievement._id.toString())) {
      continue;
    }

    const statValue = stats[achievement.requirement.type as keyof typeof stats];

    if (statValue !== undefined && statValue >= achievement.requirement.value) {
      await UserAchievement.create({
        userId,
        achievementId: achievement._id,
      });
      newUnlocks.push(achievement.title);
    }
  }

  return {
    newUnlocks,
    totalUnlocked: unlockedAchievementIds.size + newUnlocks.length,
  };
};

export const getUserAchievements = async (userId: string) => {
  const userAchievements = await UserAchievement.find({ userId });

  const achievementIds = userAchievements.map((ua: any) => ua.achievementId);

  const achievements = await Achievement.find({
    _id: { $in: achievementIds },
  });

  const unlockedMap = new Map(
    userAchievements.map((ua: any) => [ua.achievementId.toString(), ua.unlockedAt]),
  );

  const result = achievements.map((a: any) => ({
    _id: a._id.toString(),
    title: a.title,
    description: a.description,
    icon: a.icon,
    requirement: a.requirement,
    unlocked: true,
    unlockedAt: unlockedMap.get(a._id.toString()),
  }));

  return result;
};

export const achievementService = { checkAchievements, getUserAchievements };
