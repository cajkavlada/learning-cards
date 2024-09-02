import { z } from "zod";

export const createQuestionSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
});

export type CreateQuestionFormData = z.infer<typeof createQuestionSchema>;

export const createQuestionBESchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
  topicId: z.number(),
});

export type CreateQuestionBE = z.infer<typeof createQuestionBESchema>;
