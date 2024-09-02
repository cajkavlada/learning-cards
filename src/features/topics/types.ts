import { z } from "zod";

export const createTopicSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

export type CreateTopicFormData = z.infer<typeof createTopicSchema>;
