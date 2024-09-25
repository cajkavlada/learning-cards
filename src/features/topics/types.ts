import { createInsertSchema } from "drizzle-zod";
import { topics } from "~/server/db/schema";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { z } from "zod";

export type TopicProps = InferSelectModel<typeof topics>;

export const baseTopicSchema = createInsertSchema(topics, {
  name: (schema) => schema.name.min(1, "Name is required"),
});

export type TopicPropsWithQuestionCount = Pick<
  TopicProps,
  "id" | "name" | "description"
> & { questionsCount: number };

export const topicFormSchema = baseTopicSchema
  .partial({ userId: true })
  .omit({ id: true });
export type TopicFormProps = z.infer<typeof topicFormSchema>;

export const createTopicSchema = topicFormSchema;
export type CreateTopicProps = InferInsertModel<typeof topics>;

export const updateTopicSchema = baseTopicSchema
  .partial()
  .required({ id: true });
export type UpdateTopicProps = z.infer<typeof updateTopicSchema> &
  Pick<TopicProps, "userId">;

export const deleteTopicsSchema = baseTopicSchema.required().shape.id.array();
export type DeleteTopicsProps = {
  userId: TopicProps["userId"];
  deleteIds: z.infer<typeof deleteTopicsSchema>;
};
