import { apiClient } from "./api";

export interface AnalyticsOverview {
  totalQuestions: number;
  solvedQuestions: number;
  accuracy: number;
  streak: number;
  totalQuizzes: number;
  totalInterviews: number;
  avgInterviewScore: number;
  preparationPercentage: number;
}

export interface CategoryPerformance {
  name: string;
  score: number;
}

export const analyticsApi = {
  getOverview: () =>
    apiClient.get<{ success: boolean; data: AnalyticsOverview }>("/analytics/overview"),

  getCategories: () =>
    apiClient.get<{ success: boolean; data: CategoryPerformance[] }>("/analytics/categories"),

  getActivity: (days?: number) => {
    const query = days ? `?days=${days}` : "";
    return apiClient.get<{ success: boolean; data: any[] }>(`/analytics/activity${query}`);
  },

  getAccuracy: () =>
    apiClient.get<{ success: boolean; data: any[] }>("/analytics/accuracy"),
};
