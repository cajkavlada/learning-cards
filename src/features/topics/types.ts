import { createInsertSchema } from "drizzle-zod";
import { topics } from "~/server/db/schema";
import type { InferSelectModel } from "drizzle-orm";
import type { z } from "zod";

export type Topic = InferSelectModel<typeof topics>;

export const baseTopicSchema = createInsertSchema(topics, {
  name: (schema) => schema.name.min(1, "Name is required"),
});

export const topicFormSchema = baseTopicSchema
  .partial({ userId: true })
  .omit({ id: true });
export type TopicForm = z.infer<typeof topicFormSchema>;

export const createTopicSchema = topicFormSchema;
export type CreateTopic = z.infer<typeof createTopicSchema>;

export const updateTopicSchema = baseTopicSchema
  .partial()
  .required({ id: true });
export type UpdateTopic = z.infer<typeof updateTopicSchema>;

export const deleteTopicSchema = baseTopicSchema.pick({ id: true }).required();
export type DeleteTopic = z.infer<typeof deleteTopicSchema>;

// export const createTopicSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   description: z.string().optional(),
// });

// export type CreateTopicFormData = z.infer<typeof createTopicSchema>;
