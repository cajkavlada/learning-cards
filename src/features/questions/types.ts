import { createInsertSchema } from "drizzle-zod";
import { questions } from "~/server/db/schema";
import type { InferSelectModel } from "drizzle-orm";
import type { z } from "zod";
import type { TopicProps } from "../topics/types";
import type { TFunction } from "~/types/common";

export type QuestionProps = InferSelectModel<typeof questions>;

export const baseQuestionSchema = createInsertSchema(questions);

export const questionFormSchema = (t: TFunction) =>
  baseQuestionSchema
    .partial({ topicId: true })
    .omit({ id: true })
    .extend({
      question: baseQuestionSchema.shape.question.min(
        1,
        t("inputs.question.lengthError"),
      ),
      answer: baseQuestionSchema.shape.answer
        .min(1, t("inputs.answer.lengthError"))
        .refine(
          (value) => value.trim() !== "<p></p>",
          t("inputs.answer.lengthError"),
        ),
    });
export type QuestionFormProps = z.infer<ReturnType<typeof questionFormSchema>>;

export const createQuestionSchema = (t: TFunction) =>
  questionFormSchema(t).required({ topicId: true });

export type CreateQuestionProps = z.infer<
  ReturnType<typeof createQuestionSchema>
> &
  Pick<TopicProps, "userId">;

export const updateQuestionSchema = (t: TFunction) =>
  questionFormSchema(t)
    .partial()
    .extend({ id: baseQuestionSchema.required().shape.id });

export type UpdateQuestionProps = z.infer<
  ReturnType<typeof updateQuestionSchema>
> &
  Pick<TopicProps, "userId">;

export const deleteQuestionsSchema = baseQuestionSchema
  .required()
  .shape.id.array();
export type DeleteQuestionsProps = {
  userId: TopicProps["userId"];
  questionIds: z.infer<typeof deleteQuestionsSchema>;
};

export const updateQuestionLearnedStatusSchema = baseQuestionSchema
  .pick({ markedAsLearned: true })
  .required()
  .extend({ ids: baseQuestionSchema.required().shape.id.array() });

export type UpdateQuestionLearnedStatusProps = z.infer<
  typeof updateQuestionLearnedStatusSchema
> & {
  userId: TopicProps["userId"];
};
