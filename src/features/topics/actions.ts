"use server";

import { createServerAction } from "zsa";
import { createTopicSchema } from "./types";
import { revalidatePath } from "next/cache";
import { createTopicMutation, deleteTopicMutation } from "~/server/queries";
import { z } from "zod";

export const createTopic = createServerAction()
  .input(createTopicSchema)
  .handler(async ({ input }) => {
    const newTopic = await createTopicMutation(input);
    revalidatePath("/topics");
    return newTopic;
  });

export const deleteTopic = createServerAction()
  .input(z.number())
  .handler(async ({ input }) => {
    const deletedTopic = await deleteTopicMutation(input);
    revalidatePath("/topics");
    return deletedTopic;
  });
