import type { CodingProblem } from "../types";

export const codingProblems: CodingProblem[] = [
  {
    id: "cp-1",
    title: "Two Sum",
    category: "Arrays",
    difficulty: "Easy",
    description:
      "Given an array of integers and a target value, return indices of the two numbers that add up to the target.",
    examples: [
      {
        input: "[2, 7, 11, 15], 9",
        output: "[0, 1]",
        explanation: "2 + 7 = 9",
      },
    ],
    constraints: ["Each input has exactly one solution", "Values are integers"],
    approach:
      "Use a hash map to store seen values and their indices while scanning the array.",
    testCases: [
      { input: "[2,7,11,15]|9", expected: "[0,1]" },
      { input: "[3,2,4]|6", expected: "[1,2]" },
    ],
  },
  {
    id: "cp-2",
    title: "Valid Anagram",
    category: "Strings",
    difficulty: "Easy",
    description: "Check whether two strings are anagrams of one another.",
    examples: [{ input: "anagram, nagaram", output: "true" }],
    constraints: ["Strings may contain lowercase English letters"],
    approach: "Sort both strings or use character counts.",
    testCases: [
      { input: "anagram|nagaram", expected: "true" },
      { input: "rat|car", expected: "false" },
    ],
  },
  {
    id: "cp-3",
    title: "Binary Search",
    category: "Searching",
    difficulty: "Medium",
    description: "Find the target value in a sorted array using binary search.",
    examples: [{ input: "[1,3,5,7,9], 7", output: "3" }],
    constraints: ["Array is sorted in ascending order"],
    approach:
      "Initialize left and right pointers and halve the search space each iteration.",
    testCases: [
      { input: "[1,3,5,7,9]|7", expected: "3" },
      { input: "[1,2,3,4]|9", expected: "-1" },
    ],
  },
  {
    id: "cp-4",
    title: "Merge Sort",
    category: "Sorting",
    difficulty: "Medium",
    description: "Sort an array using merge sort.",
    examples: [{ input: "[5,2,3,1]", output: "[1,2,3,5]" }],
    constraints: ["No restrictions"],
    approach:
      "Divide the array into halves, sort recursively, and merge the results.",
    testCases: [
      { input: "[5,2,3,1]", expected: "[1,2,3,5]" },
      { input: "[1,1,1]", expected: "[1,1,1]" },
    ],
  },
];
