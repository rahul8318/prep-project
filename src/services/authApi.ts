import { apiClient } from "./api";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      profilePicture?: string;
      targetRole?: string;
      skills?: string[];
      preparationLevel?: string;
    };
    accessToken: string;
    refreshToken: string;
  };
  message: string;
}

export interface CurrentUserResponse {
  success: boolean;
  data: {
    id: string;
    name: string;
    email: string;
    role: string;
    profilePicture?: string;
    targetRole?: string;
    skills?: string[];
    preparationLevel?: string;
  };
  message: string;
}

export const authApi = {
  login: (credentials: LoginCredentials) =>
    apiClient.post<AuthResponse>("/auth/login", credentials),

  register: (data: RegisterData) =>
    apiClient.post<AuthResponse>("/auth/register", data),

  getMe: () => apiClient.get<CurrentUserResponse>("/auth/me"),

  refreshToken: (refreshToken: string) =>
    apiClient.post<{ success: boolean; data: { accessToken: string } }>(
      "/auth/refresh",
      { refreshToken },
    ),

  logout: () =>
    apiClient.post<{ success: boolean; message: string }>("/auth/logout"),
};
