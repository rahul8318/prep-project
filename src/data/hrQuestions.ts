import type { HrQuestion } from "../types";

export const hrQuestions: HrQuestion[] = [
  {
    id: "hrq-1",
    title: "Tell me about yourself",
    sampleAnswer:
      "I am a frontend developer with experience building responsive web interfaces using React, TypeScript, and CSS. I enjoy solving user problems through clean UI design and scalable frontend architecture, and I am excited to join a team where I can contribute to impactful products.",
    answerStructure: [
      "Past experience",
      "Core skills",
      "Career motivation",
      "Role fit",
    ],
    tips: ["Keep it concise", "Focus on achievements", "Align with the role"],
    commonMistakes: [
      "Giving a long personal history",
      "Talking only about hobbies",
      "Being too vague",
    ],
  },
  {
    id: "hrq-2",
    title: "What are your strengths?",
    sampleAnswer:
      "One of my biggest strengths is problem-solving. I like breaking complex issues into smaller parts and creating practical solutions. I also work well in teams and value clear communication, which helps with collaboration and delivery.",
    answerStructure: ["Strength", "Evidence", "Impact"],
    tips: ["Choose strengths relevant to the role", "Back them with examples"],
    commonMistakes: ["Listing generic strengths", "Not providing proof"],
  },
  {
    id: "hrq-3",
    title: "What is your biggest weakness?",
    sampleAnswer:
      "Earlier, I used to take on too many tasks at once. I have since improved by prioritizing work using impact and urgency, which has helped me become more focused and efficient.",
    answerStructure: ["Weakness", "Improvement plan", "Current result"],
    tips: ["Pick a genuine weakness", "Show positive growth"],
    commonMistakes: [
      "Choosing a critical job requirement",
      "Not showing improvement",
    ],
  },
  {
    id: "hrq-4",
    title: "Why should we hire you?",
    sampleAnswer:
      "You should hire me because I combine strong technical execution with a customer-focused mindset. I build robust applications, communicate clearly with teams, and learn quickly, which helps me contribute value early in the role.",
    answerStructure: ["Relevant skills", "Value addition", "Team fit"],
    tips: ["Highlight impact", "Be confident but grounded"],
    commonMistakes: ["Being too humble", "Not linking to business value"],
  },
];
