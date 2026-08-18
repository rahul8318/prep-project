import { apiClient } from "./api";

export interface BookmarkResponse {
  success: boolean;
  data: {
    data: Array<{
      _id: string;
      questionId: {
        _id: string;
        question: string;
        category: string;
        topic: string;
        difficulty: string;
      };
      createdAt: string;
    }>;
    pagination: { page: number; limit: number; total: number; totalPages: number };
  };
  message: string;
}

export const bookmarkApi = {
  getBookmarks: (filters?: { page?: number; limit?: number }) => {
    const params = new URLSearchParams();
    if (filters?.page) params.append("page", String(filters.page));
    if (filters?.limit) params.append("limit", String(filters.limit));
    const query = params.toString();
    return apiClient.get<BookmarkResponse>(`/bookmarks${query ? `?${query}` : ""}`);
  },

  addBookmark: (questionId: string) =>
    apiClient.post<{ success: boolean; message: string }>(`/bookmarks/${questionId}`),

  removeBookmark: (questionId: string) =>
    apiClient.delete<{ success: boolean; message: string }>(`/bookmarks/${questionId}`),

  checkBookmark: (questionId: string) =>
    apiClient.get<{ success: boolean; data: { bookmarked: boolean } }>(`/bookmarks/check/${questionId}`),
};
