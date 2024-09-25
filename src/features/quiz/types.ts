import type { InferSelectModel } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import type { z } from "zod";
import { quizSessions } from "~/server/db/schema";

export type QuizSessionProps = InferSelectModel<typeof quizSessions>;

export const baseQuizSessionSchema = createInsertSchema(quizSessions);

export type CreateQuizSessionProps = z.infer<typeof baseQuizSessionSchema>;

export const updateQuizSessionSchema = baseQuizSessionSchema
  .partial()
  .required({ userId: true });
export type UpdateQuizSessionProps = z.infer<typeof updateQuizSessionSchema>;
