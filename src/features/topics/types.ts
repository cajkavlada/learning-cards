import { createInsertSchema } from "drizzle-zod";
import { topics } from "~/server/db/schema";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { z } from "zod";
import type { TFunction } from "~/types/common";

export type TopicProps = InferSelectModel<typeof topics>;

export const baseTopicSchema = createInsertSchema(topics);

export type TopicPropsWithQuestionCount = Pick<
  TopicProps,
  "id" | "name" | "description"
> & { questionsCount: number };

export const topicFormSchema = (t: TFunction) =>
  baseTopicSchema
    .partial({ userId: true })
    .omit({ id: true })
    .extend({
      name: baseTopicSchema.shape.name.min(1, t("inputs.name.lengthError")),
    });
export type TopicFormProps = z.infer<ReturnType<typeof topicFormSchema>>;

export const createTopicSchema = (t: TFunction) => topicFormSchema(t);
export type CreateTopicProps = InferInsertModel<typeof topics>;

export const updateTopicSchema = (t: TFunction) =>
  topicFormSchema(t)
    .partial()
    .extend({ id: baseTopicSchema.required().shape.id });
export type UpdateTopicProps = z.infer<ReturnType<typeof updateTopicSchema>> &
  Pick<TopicProps, "userId">;

export const deleteTopicsSchema = baseTopicSchema.required().shape.id.array();
export type DeleteTopicsProps = {
  userId: TopicProps["userId"];
  topicIds: z.infer<typeof deleteTopicsSchema>;
};
