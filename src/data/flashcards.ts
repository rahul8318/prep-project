import type { Flashcard } from "../types";

export const flashcards: Flashcard[] = [
  {
    id: "fc-1",
    front: "What is the Virtual DOM?",
    back: "The Virtual DOM is a lightweight, in-memory representation of the real DOM that React compares and updates efficiently.",
    category: "React",
    difficulty: "Easy",
    explanation:
      "React batches DOM changes by comparing previous and next virtual states, which helps reduce expensive re-renders.",
  },
  {
    id: "fc-2",
    front: "What is a closure in JavaScript?",
    back: "A closure is a function that retains access to variables from its outer lexical scope even after that outer function finishes executing.",
    category: "JavaScript",
    difficulty: "Need Review",
    explanation:
      "Closures are commonly used for state privacy, callbacks, and higher-order functions.",
  },
  {
    id: "fc-3",
    front: "What is the difference between let and var?",
    back: "var is function-scoped and hoisted with undefined, while let is block-scoped and is not initialized until its declaration is evaluated.",
    category: "JavaScript",
    difficulty: "Difficult",
    explanation:
      "This difference is crucial for avoiding accidental variable leakage and the temporal dead zone.",
  },
  {
    id: "fc-4",
    front: "Why use CSS Grid?",
    back: "CSS Grid helps build two-dimensional layouts with rows and columns and gives fine-grained control over alignment and placement.",
    category: "CSS",
    difficulty: "Easy",
    explanation:
      "Grid is especially useful for dashboards, card collections, and complex page structures.",
  },
  {
    id: "fc-5",
    front: "What does a primary key do?",
    back: "A primary key uniquely identifies each record in a table and ensures no two rows share the same identifier.",
    category: "DBMS",
    difficulty: "Easy",
    explanation:
      "Primary keys are fundamental for relationship integrity and fast lookups.",
  },
];
