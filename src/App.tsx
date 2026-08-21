import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { HomePage } from "./pages/LandingPage";
import { AuthPage } from "./pages/AuthPage";
import { DashboardPage } from "./pages/DashboardPage";
import { QuestionBankPage } from "./pages/QuestionBankPage";
import { QuizPage } from "./pages/QuizPage";
import { MockInterviewPage } from "./pages/MockInterviewPage";
import { FlashcardsPage } from "./pages/FlashcardsPage";
import { DailyChallengePage } from "./pages/DailyChallengePage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { BookmarksPage } from "./pages/BookmarksPage";
import { HrPreparationPage } from "./pages/HrPreparationPage";
import { ProfilePage } from "./pages/ProfilePage";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { authApi } from "./services/authApi";
import { apiClient } from "./services/api";
import { Navbar } from "./components/Navbar";
import type { UserProfile } from "./types";

function ProtectedRoutes({
  isAuthenticated,
  user,
  onLogout,
  theme,
  toggleTheme,
}: {
  isAuthenticated: boolean;
  user: UserProfile | null;
  onLogout: () => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
}) {
  return isAuthenticated ? (
    <>
      <Navbar
        user={user}
        onLogout={onLogout}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <Outlet />
    </>
  ) : (
    <Navigate to="/auth" replace />
  );
}

function App() {
  const [theme, setTheme] = useLocalStorage<"light" | "dark">(
    "interviewhub-theme",
    "dark",
  );
  const [user, setUser] = useLocalStorage<UserProfile | null>(
    "interviewhub-user",
    null,
  );
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(user));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("interviewhub-token");
      if (token) {
        apiClient.setToken(token);
        try {
          const res = await authApi.getMe();
          if (res.success && res.data) {
            setUser({
              id: res.data.id,
              name: res.data.name,
              email: res.data.email,
              password: "",
              role: res.data.role || "user",
              skills: res.data.skills || [],
              preparationLevel: res.data.preparationLevel || "Beginner",
              avatar: res.data.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase(),
            });
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem("interviewhub-token");
            apiClient.setToken(null);
            setUser(null);
            setIsAuthenticated(false);
          }
        } catch {
          localStorage.removeItem("interviewhub-token");
          apiClient.setToken(null);
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };
    void initAuth();
  }, [setUser]);

  const appClass = useMemo(
    () =>
      theme === "dark"
        ? "dark bg-[var(--background)] text-[var(--foreground)]"
        : "bg-[var(--background)] text-[var(--foreground)]",
    [theme],
  );

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const login = (profile: UserProfile, token?: string) => {
    setUser(profile);
    setIsAuthenticated(true);
    if (token) {
      apiClient.setToken(token);
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // ignore logout errors
    }
    setUser(null);
    setIsAuthenticated(false);
    apiClient.setToken(null);
  };

  useEffect(() => {
    apiClient.setOnUnauthorized(() => {
      setUser(null);
      setIsAuthenticated(false);
    });
  }, [setUser, setIsAuthenticated]);

  if (isLoading) {
    return (
      <div className={appClass}>
        <div className="flex h-screen items-center justify-center">
          <div className="text-lg font-semibold text-[var(--foreground)]">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={appClass}>
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                theme={theme}
                toggleTheme={toggleTheme}
                isAuthenticated={isAuthenticated}
                user={user}
              />
            }
          />
          <Route
            path="/auth"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <AuthPage onLogin={login} />
              )
            }
          />
          <Route
            element={
              <ProtectedRoutes
                isAuthenticated={isAuthenticated}
                user={user}
                onLogout={logout}
                theme={theme}
                toggleTheme={toggleTheme}
              />
            }
          >
            <Route
              path="/dashboard"
              element={
                <DashboardPage
                  user={user}
                  onLogout={logout}
                  theme={theme}
                  toggleTheme={toggleTheme}
                />
              }
            />
            <Route
              path="/questions"
              element={
                <QuestionBankPage
                  user={user}
                />
              }
            />
            <Route
              path="/quiz"
              element={
                <QuizPage
                  user={user}
                />
              }
            />
            <Route
              path="/mock"
              element={
                <MockInterviewPage
                  user={user}
                />
              }
            />
            <Route
              path="/flashcards"
              element={
                <FlashcardsPage
                  user={user}
                />
              }
            />
            <Route
              path="/daily"
              element={
                <DailyChallengePage
                  user={user}
                />
              }
            />
            <Route
              path="/analytics"
              element={
                <AnalyticsPage
                  user={user}
                />
              }
            />
            <Route
              path="/bookmarks"
              element={
                <BookmarksPage
                  user={user}
                />
              }
            />
            <Route
              path="/hr"
              element={
                <HrPreparationPage
                  user={user}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProfilePage
                  user={user}
                />
              }
            />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
