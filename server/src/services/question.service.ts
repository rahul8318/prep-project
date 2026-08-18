import { Question } from "../models/Question";
import { getPagination, getSkip } from "../utils/pagination";

export const getQuestions = async (filters: {
  page?: number;
  limit?: number;
  category?: string;
  difficulty?: string;
  topic?: string;
  search?: string;
}) => {
  const { page, limit, category, difficulty, topic, search } = filters;
  const pagination = getPagination(page, limit);
  const skip = getSkip(pagination.page, pagination.limit);

  const query: Record<string, unknown> = {};

  if (category) query.category = category;
  if (difficulty) query.difficulty = difficulty;
  if (topic) query.topic = new RegExp(topic, "i");
  if (search) query.question = new RegExp(search, "i");

  const [data, total] = await Promise.all([
    Question.find(query).skip(skip).limit(pagination.limit).sort({ createdAt: -1 }),
    Question.countDocuments(query),
  ]);

  return {
    data,
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total,
      totalPages: Math.ceil(total / pagination.limit),
    },
  };
};

export const getQuestionById = async (id: string) => {
  return Question.findById(id);
};

export const createQuestion = async (data: Record<string, unknown>) => {
  return Question.create(data);
};

export const updateQuestion = async (id: string, data: Record<string, unknown>) => {
  return Question.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

export const deleteQuestion = async (id: string) => {
  return Question.findByIdAndDelete(id);
};

export const questionService = { getQuestions, getQuestionById, createQuestion, updateQuestion, deleteQuestion };
