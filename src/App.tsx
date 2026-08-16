import { Route, Routes } from "react-router-dom";
import { useMemo, useState } from "react";
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
import type { UserProfile } from "./types";

const defaultUser: UserProfile = {
  id: "user-1",
  name: "Rahul Sharma",
  email: "rahul@example.com",
  password: "demo123",
  role: "Frontend Developer",
  skills: ["React", "TypeScript", "Node.js", "CSS"],
  preparationLevel: "Intermediate",
  avatar: "RS",
};

function App() {
  const [theme, setTheme] = useLocalStorage<"light" | "dark">(
    "interviewhub-theme",
    "dark",
  );
  const [user, setUser] = useLocalStorage<UserProfile | null>(
    "interviewhub-user",
    defaultUser,
  );
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(user));

  const appClass = useMemo(
    () =>
      theme === "dark"
        ? "dark bg-slate-950 text-slate-50"
        : "bg-slate-50 text-slate-900",
    [theme],
  );

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const login = (profile: UserProfile) => {
    setUser(profile);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <div className={appClass}>
      <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-50">
        <Routes>
          <Route
            path="/"
            element={<HomePage theme={theme} toggleTheme={toggleTheme} />}
          />
          <Route path="/auth" element={<AuthPage onLogin={login} />} />
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
        </Routes>
      </div>
    </div>
  );
}

export default App;
