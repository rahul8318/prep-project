import { apiClient } from "./api";

export interface QuestionFilters {
  page?: number;
  limit?: number;
  category?: string;
  difficulty?: string;
  topic?: string;
  search?: string;
}

export interface Question {
  _id: string;
  question: string;
  category: string;
  topic: string;
  difficulty: string;
  type: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  tags: string[];
  codeExample?: string;
  createdAt: string;
}

export interface QuestionListResponse {
  data: Question[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

export const questionApi = {
  getQuestions: (filters?: QuestionFilters) => {
    const params = new URLSearchParams();
    if (filters?.page) params.append("page", String(filters.page));
    if (filters?.limit) params.append("limit", String(filters.limit));
    if (filters?.category) params.append("category", filters.category);
    if (filters?.difficulty) params.append("difficulty", filters.difficulty);
    if (filters?.topic) params.append("topic", filters.topic);
    if (filters?.search) params.append("search", filters.search);

    const query = params.toString();
    return apiClient.get<{
      success: boolean;
      data: QuestionListResponse;
      message: string;
    }>(`/questions${query ? `?${query}` : ""}`);
  },

  getQuestion: (id: string) =>
    apiClient.get<{ success: boolean; data: Question }>(`/questions/${id}`),

  createQuestion: (data: Partial<Question>) =>
    apiClient.post<{ success: boolean; data: Question }>("/questions", data),

  updateQuestion: (id: string, data: Partial<Question>) =>
    apiClient.put<{ success: boolean; data: Question }>(`/questions/${id}`, data),

  deleteQuestion: (id: string) =>
    apiClient.delete<{ success: boolean; message: string }>(`/questions/${id}`),
};
