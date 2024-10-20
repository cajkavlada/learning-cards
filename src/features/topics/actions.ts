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
import { getTranslations } from "next-intl/server";
import { topicRatelimit } from "~/server/ratelimit";
import analyticsServerClient from "~/server/analytics";

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
  .input(async () => {
    const t = await getTranslations("topic.form");
    return createTopicSchema(t);
  })
  .handler(async ({ input }) => {
    const user = auth();
    if (!user.userId) throw new Error("Not authenticated");

    const { success } = await topicRatelimit.limit(user.userId);
    if (!success) {
      throw new Error("Topic creation rate limit reached. Try again later.");
    }

    const newTopic = await createTopicMutation({
      userId: user.userId,
      ...input,
    });

    analyticsServerClient.capture({
      distinctId: user.userId,
      event: "topic created",
      properties: { newTopic },
    });

    revalidatePath("/topics");
    return newTopic;
  });

export const updateTopic = createServerAction()
  .input(async () => {
    const t = await getTranslations("topic.form");
    return updateTopicSchema(t);
  })
  .handler(async ({ input }) => {
    const user = auth();
    if (!user.userId) throw new Error("Not authenticated");

    const updatedTopic = await updateTopicMutation({
      ...input,
      userId: user.userId,
    });

    analyticsServerClient.capture({
      distinctId: user.userId,
      event: "topic updated",
      properties: { updatedTopic },
    });

    revalidatePath("/topics/[topicId]", "page");
    return updatedTopic;
  });

export const deleteTopic = createServerAction()
  .input(deleteTopicsSchema)
  .handler(async ({ input }) => {
    const user = auth();
    if (!user.userId) throw new Error("Not authenticated");

    const deletedTopics = await deleteTopicsMutation({
      userId: user.userId,
      deleteIds: input,
    });

    analyticsServerClient.capture({
      distinctId: user.userId,
      event: "topics deleted",
      properties: { deletedTopics },
    });

    revalidatePath("/topics");
    return deletedTopics;
  });
