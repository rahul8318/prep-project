import { apiClient } from "./api";

export interface Flashcard {
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
  progress: {
    status: "easy" | "review" | "difficult";
    reviewCount: number;
    lastReviewedAt: string;
  } | null;
}

export const flashcardApi = {
  getFlashcards: () =>
    apiClient.get<{ success: boolean; data: Flashcard[] }>("/flashcards"),

  updateProgress: (questionId: string, status: "easy" | "review" | "difficult") =>
    apiClient.post<{ success: boolean; data: any }>(
      `/flashcards/${questionId}/progress`,
      { status },
    ),
};
