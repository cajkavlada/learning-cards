"use server";

import { createServerAction } from "zsa";
import {
  createTopicSchema,
  deleteTopicSchema,
  updateTopicSchema,
} from "./types";
import { revalidatePath } from "next/cache";
import {
  createTopicMutation,
  deleteTopicMutation,
  updateTopicMutation,
} from "./queries";
import { z } from "zod";

export const createTopic = createServerAction()
  .input(createTopicSchema)
  .handler(async ({ input }) => {
    const newTopic = await createTopicMutation(input);
    revalidatePath("/topics");
    return newTopic;
  });

export const updateTopic = createServerAction()
  .input(updateTopicSchema)
  .handler(async ({ input }) => {
    const updatedTopic = await updateTopicMutation(input);
    revalidatePath("/topics/[topicId]", "page");
    return updatedTopic;
  });

export const deleteTopic = createServerAction()
  .input(deleteTopicSchema)
  .handler(async ({ input }) => {
    const deletedTopic = await deleteTopicMutation(input);
    revalidatePath("/topics");
    return deletedTopic;
  });

export const shuffleQuizQuestions = createServerAction().handler(async () => {
  revalidatePath("/topics/[topicId]/quiz");
});
