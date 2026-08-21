const API_BASE = import.meta.env.VITE_API_URL || "/api";

class ApiClient {
  private token: string | null = null;
  private refreshToken: string | null = null;
  private onUnauthorized?: () => void;
  private isRefreshing = false;
  private refreshPromise: Promise<string | null> | null = null;

  setTokens(accessToken: string | null, refreshTokenValue?: string | null) {
    this.token = accessToken;
    this.refreshToken = refreshTokenValue || null;
    if (accessToken) {
      localStorage.setItem("interviewhub-token", accessToken);
      if (refreshTokenValue) {
        localStorage.setItem("interviewhub-refresh-token", refreshTokenValue);
      }
    } else {
      localStorage.removeItem("interviewhub-token");
      localStorage.removeItem("interviewhub-refresh-token");
    }
  }

  setOnUnauthorized(callback: () => void) {
    this.onUnauthorized = callback;
  }

  getToken() {
    if (!this.token) {
      this.token = localStorage.getItem("interviewhub-token");
    }
    return this.token;
  }

  getRefreshToken() {
    if (!this.refreshToken) {
      this.refreshToken = localStorage.getItem("interviewhub-refresh-token");
    }
    return this.refreshToken;
  }

  async refreshAccessToken(): Promise<string | null> {
    if (this.isRefreshing && this.refreshPromise) {
      return this.refreshPromise;
    }

    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return null;
    }

    this.isRefreshing = true;
    this.refreshPromise = (async () => {
      try {
        const response = await fetch("/api/auth/refresh", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) {
          throw new Error("Refresh failed");
        }

        const result = await response.json();
        if (result.success && result.data?.accessToken) {
          this.setTokens(result.data.accessToken, refreshToken);
          return result.data.accessToken;
        }

        throw new Error("Invalid refresh response");
      } catch {
        this.setTokens(null);
        this.onUnauthorized?.();
        return null;
      } finally {
        this.isRefreshing = false;
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE}${endpoint}`;
    const token = this.getToken();

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      if (response.status === 401 && token) {
        const newToken = await this.refreshAccessToken();
        if (newToken) {
          headers.Authorization = `Bearer ${newToken}`;
          const retryResponse = await fetch(url, {
            ...config,
            headers,
          });

          if (retryResponse.ok) {
            return retryResponse.json();
          }
        }
      }

      if (response.status === 401) {
        localStorage.removeItem("interviewhub-token");
        localStorage.removeItem("interviewhub-refresh-token");
        this.setTokens(null);
        this.onUnauthorized?.();
      }
      const error = await response.json().catch(() => null);
      const details = Array.isArray(error?.errors)
        ? `: ${error.errors.join(", ")}`
        : "";
      throw new Error(
        `${error?.message || `Request failed (${response.status})`}${details}`,
      );
    }

    return response.json();
  }

  get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

export const apiClient = new ApiClient();
