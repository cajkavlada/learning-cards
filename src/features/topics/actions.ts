"use server";

import { createServerAction } from "zsa";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import {
  getTopicsByUserQuery,
  getTopicDetailQuery,
  createTopicMutation,
  updateTopicMutation,
  deleteTopicsMutation,
} from "./queries";
import {
  createTopicSchema,
  updateTopicSchema,
  deleteTopicsSchema,
  type TopicProps,
} from "./types";

export async function getMyTopics() {
  const user = auth();
  if (!user.userId) throw new Error("Not authenticated");

  return getTopicsByUserQuery(user.userId);
}

export async function getTopicDetail(id: TopicProps["id"]) {
  const user = auth();
  if (!user.userId) throw new Error("Not authenticated");

  return getTopicDetailQuery({ id, userId: user.userId });
}

export const createTopic = createServerAction()
  .input(createTopicSchema)
  .handler(async ({ input }) => {
    const user = auth();
    if (!user.userId) throw new Error("Not authenticated");

    const newTopic = await createTopicMutation({
      userId: user.userId,
      ...input,
    });
    revalidatePath("/topics");
    return newTopic;
  });

export const updateTopic = createServerAction()
  .input(updateTopicSchema)
  .handler(async ({ input }) => {
    const user = auth();
    if (!user.userId) throw new Error("Not authenticated");

    const updatedTopic = await updateTopicMutation({
      ...input,
      userId: user.userId,
    });
    revalidatePath("/topics/[topicId]", "page");
    return updatedTopic;
  });

export const deleteTopic = createServerAction()
  .input(deleteTopicsSchema)
  .handler(async ({ input }) => {
    const user = auth();
    if (!user.userId) throw new Error("Not authenticated");

    const deletedTopic = await deleteTopicsMutation({
      userId: user.userId,
      deleteIds: input,
    });
    revalidatePath("/topics");
    return deletedTopic;
  });
