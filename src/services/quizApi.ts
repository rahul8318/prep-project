import { apiClient } from "./api";

export interface QuizFilters {
  category?: string;
  difficulty?: string;
  count?: number;
}

export interface QuizAnswer {
  sessionId: string;
  answers: Record<string, string>;
  timeTaken: number;
}

export const quizApi = {
  startQuiz: (filters: QuizFilters) =>
    apiClient.post<{
      success: boolean;
      data: { sessionId: string; questions: Array<{ id: string; question: string; options: string[]; category: string; difficulty: string; topic: string }> };
    }>("/quizzes/start", filters),

  submitQuiz: (data: QuizAnswer) =>
    apiClient.post<{
      success: boolean;
      data: { result: { _id: string; score: number; totalQuestions: number; correctAnswers: number; incorrectAnswers: number; accuracy: number; timeTaken: number; category: string; difficulty: string; createdAt: string }; score: number; accuracy: number; correctAnswers: number; incorrectAnswers: number; timeTaken: number };
    }>("/quizzes/submit", data),

  getHistory: (filters?: { page?: number; limit?: number }) => {
    const params = new URLSearchParams();
    if (filters?.page) params.append("page", String(filters.page));
    if (filters?.limit) params.append("limit", String(filters.limit));
    const query = params.toString();
    return apiClient.get<{ success: boolean; data: { data: any[]; pagination: { page: number; limit: number; total: number; totalPages: number } }; message: string }>(`/quizzes/history${query ? `?${query}` : ""}`);
  },

  getResult: (id: string) =>
    apiClient.get<{ success: boolean; data: any }>(`/quizzes/results/${id}`),
};
