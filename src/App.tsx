import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { HomePage } from "./pages/LandingPage";
import { AuthPage } from "./pages/AuthPage";
import { DashboardPage } from "./pages/DashboardPage";
import { QuestionBankPage } from "./pages/QuestionBankPage";
import { QuizPage } from "./pages/QuizPage";
import { MockInterviewPage } from "./pages/MockInterviewPage";
import { CodingPracticePage } from "./pages/CodingPracticePage";
import { FlashcardsPage } from "./pages/FlashcardsPage";
import { DailyChallengePage } from "./pages/DailyChallengePage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { BookmarksPage } from "./pages/BookmarksPage";
import { HrPreparationPage } from "./pages/HrPreparationPage";
import { ProfilePage } from "./pages/ProfilePage";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { authApi } from "./services/authApi";
import { apiClient } from "./services/api";
import type { UserProfile } from "./types";

function ProtectedRoutes({ isAuthenticated }: { isAuthenticated: boolean }) {
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
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
        ? "dark bg-slate-950 text-slate-50"
        : "bg-slate-50 text-slate-900",
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

  if (isLoading) {
    return (
      <div className={appClass}>
        <div className="flex h-screen items-center justify-center">
          <div className="text-lg font-semibold text-slate-900 dark:text-white">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={appClass}>
      <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-50">
        <Routes>
          <Route
            path="/"
            element={<HomePage theme={theme} toggleTheme={toggleTheme} />}
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
            element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}
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
                  onLogout={logout}
                  theme={theme}
                  toggleTheme={toggleTheme}
                />
              }
            />
            <Route
              path="/quiz"
              element={
                <QuizPage
                  user={user}
                  onLogout={logout}
                  theme={theme}
                  toggleTheme={toggleTheme}
                />
              }
            />
            <Route
              path="/mock"
              element={
                <MockInterviewPage
                  user={user}
                  onLogout={logout}
                  theme={theme}
                  toggleTheme={toggleTheme}
                />
              }
            />
            <Route
              path="/coding"
              element={
                <CodingPracticePage
                  user={user}
                  onLogout={logout}
                  theme={theme}
                  toggleTheme={toggleTheme}
                />
              }
            />
            <Route
              path="/flashcards"
              element={
                <FlashcardsPage
                  user={user}
                  onLogout={logout}
                  theme={theme}
                  toggleTheme={toggleTheme}
                />
              }
            />
            <Route
              path="/daily"
              element={
                <DailyChallengePage
                  user={user}
                  onLogout={logout}
                  theme={theme}
                  toggleTheme={toggleTheme}
                />
              }
            />
            <Route
              path="/analytics"
              element={
                <AnalyticsPage
                  user={user}
                  onLogout={logout}
                  theme={theme}
                  toggleTheme={toggleTheme}
                />
              }
            />
            <Route
              path="/bookmarks"
              element={
                <BookmarksPage
                  user={user}
                  onLogout={logout}
                  theme={theme}
                  toggleTheme={toggleTheme}
                />
              }
            />
            <Route
              path="/hr"
              element={
                <HrPreparationPage
                  user={user}
                  onLogout={logout}
                  theme={theme}
                  toggleTheme={toggleTheme}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProfilePage
                  user={user}
                  onLogout={logout}
                  theme={theme}
                  toggleTheme={toggleTheme}
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
