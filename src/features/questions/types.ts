import { createInsertSchema } from "drizzle-zod";
import { questions } from "~/server/db/schema";
import type { InferSelectModel } from "drizzle-orm";
import type { z } from "zod";

export type Question = InferSelectModel<typeof questions>;

export const baseQuestionSchema = createInsertSchema(questions, {
  question: (schema) => schema.question.min(1, "Question is required"),
  answer: (schema) => schema.answer.min(1, "Answer is required"),
});

export const questionFormSchema = baseQuestionSchema
  .partial({ topicId: true })
  .omit({ id: true });
export type QuestionForm = z.infer<typeof questionFormSchema>;

export const createQuestionSchema = baseQuestionSchema.omit({ id: true });
export type CreateQuestion = z.infer<typeof createQuestionSchema>;

export const updateQuestionSchema = baseQuestionSchema
  .partial()
  .required({ id: true });
export type UpdateQuestion = z.infer<typeof updateQuestionSchema>;

export const deleteQuestionSchema = baseQuestionSchema
  .pick({ id: true })
  .required();
export type DeleteQuestion = z.infer<typeof deleteQuestionSchema>;
