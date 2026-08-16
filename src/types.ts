export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export type Category =
  | "HTML"
  | "CSS"
  | "JavaScript"
  | "React"
  | "TypeScript"
  | "Node.js"
  | "Git & GitHub"
  | "DSA"
  | "DBMS"
  | "Operating Systems"
  | "Computer Networks"
  | "HR";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  skills: string[];
  preparationLevel: string;
  avatar: string;
}

export interface Question {
  id: string;
  category: Category;
  topic: string;
  difficulty: Difficulty;
  question: string;
  answer: string;
  explanation: string;
  tags: string[];
  codeExample?: string;
}

export interface QuizResult {
  id: string;
  category: string;
  difficulty: string;
  score: number;
  total: number;
  correct: number;
  wrong: number;
  accuracy: number;
  timeTaken: number;
  createdAt: string;
}

export interface InterviewResult {
  id: string;
  technology: string;
  difficulty: string;
  score: number;
  technicalKnowledge: number;
  accuracy: number;
  timeManagement: number;
  strongAreas: string[];
  weakAreas: string[];
  recommendedTopics: string[];
  suggestedQuestions: string[];
  createdAt: string;
}

export interface BookmarkItem {
  questionId: string;
  createdAt: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
  difficulty: "Easy" | "Need Review" | "Difficult";
  explanation: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  icon: string;
}

export interface ProgressEntry {
  date: string;
  solved: number;
  accuracy: number;
  minutes: number;
}

export interface DailyChallengeItem {
  id: string;
  type: "technical" | "coding" | "hr";
  title: string;
  description: string;
  category: string;
  completed: boolean;
}

export interface CodingProblem {
  id: string;
  title: string;
  category: string;
  difficulty: Difficulty;
  description: string;
  examples: Array<{ input: string; output: string; explanation?: string }>;
  constraints: string[];
  approach: string;
  testCases: Array<{ input: string; expected: string }>;
}

export interface HrQuestion {
  id: string;
  title: string;
  sampleAnswer: string;
  answerStructure: string[];
  tips: string[];
  commonMistakes: string[];
}

export interface FormState {
  email: string;
  password: string;
  name?: string;
}
