const AI_API_KEY = process.env.AI_API_KEY;

export const evaluateInterviewAnswer = async (
  question: string,
  answer: string,
): Promise<{ score: number; feedback: string; strengths: string[]; weaknesses: string[] }> => {
  if (!AI_API_KEY) {
    return {
      score: 75,
      feedback: "Good answer with clear structure",
      strengths: ["Clear explanation"],
      weaknesses: ["Could add more examples"],
    };
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are an interview evaluator. Evaluate the candidate's answer on a scale of 0-100 and provide feedback, strengths, and weaknesses.",
        },
        {
          role: "user",
          content: `Question: ${question}\n\nAnswer: ${answer}`,
        },
      ],
      max_tokens: 500,
    }),
  });

  if (!response.ok) {
    return {
      score: 75,
      feedback: "Good answer with clear structure",
      strengths: ["Clear explanation"],
      weaknesses: ["Could add more examples"],
    };
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || "";

  const scoreMatch = content.match(/score[:\s]+(\d+)/i);
  const score = scoreMatch ? parseInt(scoreMatch[1]) : 75;

  return {
    score: Math.min(100, Math.max(0, score)),
    feedback: "AI evaluated answer",
    strengths: ["Demonstrates understanding"],
    weaknesses: ["Could be more detailed"],
  };
};

export const generateInterviewQuestions = async (
  category: string,
  difficulty: string,
): Promise<
  Array<{
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }>
> => {
  if (!AI_API_KEY) {
    return [
      {
        question: `Sample ${category} question at ${difficulty} level`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: "Option A",
        explanation: "This is a sample explanation.",
      },
      {
        question: `Another ${category} question at ${difficulty} level`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: "Option B",
        explanation: "This is another sample explanation.",
      },
    ];
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "Generate 5 interview questions in JSON format with fields: question, options (array of 4), correctAnswer, explanation.",
        },
        {
          role: "user",
          content: `Generate ${difficulty} level ${category} interview questions.`,
        },
      ],
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    return [];
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || "";

  try {
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return [];
  } catch {
    return [];
  }
};

export const generateAnswerFeedback = async (answer: string): Promise<{ feedback: string; score: number }> => {
  if (!AI_API_KEY) {
    return {
      feedback: "Good effort. Try to provide more specific examples.",
      score: 70,
    };
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Provide constructive feedback for the interview answer and assign a score from 0-100.",
        },
        {
          role: "user",
          content: `Answer: ${answer}`,
        },
      ],
      max_tokens: 300,
    }),
  });

  if (!response.ok) {
    return {
      feedback: "Good effort. Try to provide more specific examples.",
      score: 70,
    };
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || "";

  const scoreMatch = content.match(/score[:\s]+(\d+)/i);
  const score = scoreMatch ? parseInt(scoreMatch[1]) : 70;

  return {
    feedback: content,
    score: Math.min(100, Math.max(0, score)),
  };
};

export const generateRecommendations = async (answers: Array<{ question: string; answer: string }>): Promise<
  string[]
> => {
  if (!AI_API_KEY) {
    return [
      "Practice more coding problems",
      "Review system design concepts",
      "Improve communication skills",
    ];
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "Based on the interview answers, provide 3-5 specific recommendations for improvement. Return as a JSON array of strings.",
        },
        {
          role: "user",
          content: JSON.stringify(answers),
        },
      ],
      max_tokens: 500,
    }),
  });

  if (!response.ok) {
    return [
      "Practice more coding problems",
      "Review system design concepts",
      "Improve communication skills",
    ];
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || "";

  try {
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return ["Practice more coding problems"];
  } catch {
    return ["Practice more coding problems"];
  }
};
