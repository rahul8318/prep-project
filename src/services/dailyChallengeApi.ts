import { apiClient } from "./api";

export interface DailyChallenge {
  _id: string;
  date: string;
  questions: Array<{
    _id: string;
    question: string;
    category: string;
    topic: string;
    difficulty: string;
    type: string;
    options?: string[];
    tags: string[];
    codeExample?: string;
  }>;
  totalQuestions: number;
}

export interface DailyChallengeProgress {
  userId: string;
  date: string;
  completedQuestions: string[];
  completed: boolean;
  totalQuestions: number;
}

export const dailyChallengeApi = {
  getDailyChallenge: () =>
    apiClient.get<{ success: boolean; data: DailyChallenge }>(
      "/daily-challenges",
    ),

  completeQuestion: (questionId: string) =>
    apiClient.post<{ success: boolean; data: DailyChallengeProgress }>(
      `/daily-challenges/${questionId}/complete`,
    ),

  getDailyProgress: () =>
    apiClient.get<{ success: boolean; data: DailyChallengeProgress }>(
      "/daily-challenges/progress",
    ),
};
