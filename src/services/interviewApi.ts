import { apiClient } from "./api";

export interface InterviewFilters {
  category?: string;
  difficulty?: string;
}

export interface AnswerData {
  questionId: string;
  answer: string;
}

export const interviewApi = {
  startInterview: (filters: InterviewFilters) =>
    apiClient.post<{
      success: boolean;
      data: { sessionId: string; questions: any[]; timeLimit: number };
    }>("/interviews/start", filters),

  submitAnswer: (sessionId: string, data: AnswerData) =>
    apiClient.post<{ success: boolean; message: string }>(`/interviews/${sessionId}/answer`, data),

  completeInterview: (sessionId: string) =>
    apiClient.post<{ success: boolean; data: any }>(`/interviews/${sessionId}/complete`),

  getHistory: (filters?: { page?: number; limit?: number }) => {
    const params = new URLSearchParams();
    if (filters?.page) params.append("page", String(filters.page));
    if (filters?.limit) params.append("limit", String(filters.limit));
    const query = params.toString();
    return apiClient.get<{ success: boolean; data: { data: any[]; pagination: any }; message: string }>(`/interviews/history${query ? `?${query}` : ""}`);
  },

  getResult: (id: string) =>
    apiClient.get<{ success: boolean; data: any }>(`/interviews/${id}`),
};
