import { createInsertSchema } from "drizzle-zod";
import { questions } from "~/server/db/schema";
import type { InferSelectModel } from "drizzle-orm";
import type { z } from "zod";
import type { TopicProps } from "../topics/types";

export type QuestionProps = InferSelectModel<typeof questions>;

export const baseQuestionSchema = createInsertSchema(questions, {
  question: (schema) => schema.question.min(1, "Question is required"),
  answer: (schema) => schema.answer.min(1, "Answer is required"),
});

export const questionFormSchema = baseQuestionSchema
  .partial({ topicId: true })
  .omit({ id: true });
export type QuestionFormProps = z.infer<typeof questionFormSchema>;

export const createQuestionSchema = baseQuestionSchema.omit({ id: true });
export type CreateQuestionProps = z.infer<typeof createQuestionSchema> &
  Pick<TopicProps, "userId">;

export const updateQuestionSchema = baseQuestionSchema
  .partial()
  .required({ id: true });
export type UpdateQuestionProps = z.infer<typeof updateQuestionSchema> &
  Pick<TopicProps, "userId">;

export const deleteQuestionsSchema = baseQuestionSchema
  .required()
  .shape.id.array();
export type DeleteQuestionsProps = {
  userId: TopicProps["userId"];
  deleteIds: z.infer<typeof deleteQuestionsSchema>;
};

export const updateQuestionLearnedStatusSchema = updateQuestionSchema
  .pick({ markedAsLearned: true })
  .required()
  .extend({ ids: updateQuestionSchema.shape.id.array() });

export type UpdateQuestionLearnedStatusProps = z.infer<
  typeof updateQuestionLearnedStatusSchema
> & {
  userId: TopicProps["userId"];
};
