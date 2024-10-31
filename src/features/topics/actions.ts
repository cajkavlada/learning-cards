"use server";

import { revalidatePath } from "next/cache";
import {
  createTopicMutation,
  updateTopicMutation,
  deleteTopicsMutation,
} from "./queries";
import {
  createTopicSchema,
  updateTopicSchema,
  deleteTopicsSchema,
} from "./types";
import { getTranslations } from "next-intl/server";
import { topicRatelimit } from "~/server/ratelimit";
import analyticsServerClient from "~/server/analytics";
import { authedAction } from "~/lib/zsa-procedures";

export const createTopic = authedAction
  .createServerAction()
  .input(async () => {
    const t = await getTranslations("topic.form");
    return createTopicSchema(t);
  })
  .handler(async ({ input: newTopicData, ctx: { userId } }) => {
    const { success } = await topicRatelimit.limit(userId);
    if (!success) {
      throw new Error("Topic creation rate limit reached. Try again later.");
    }

    const newTopic = await createTopicMutation({
      ...newTopicData,
      userId,
    });

    analyticsServerClient.capture({
      distinctId: userId,
      event: "topic created",
      properties: { newTopic },
    });

    revalidatePath("/topics");
    return newTopic;
  });

export const updateTopic = authedAction
  .createServerAction()
  .input(async () => {
    const t = await getTranslations("topic.form");
    return updateTopicSchema(t);
  })
  .handler(async ({ input: topicData, ctx: { userId } }) => {
    const updatedTopic = await updateTopicMutation({
      ...topicData,
      userId,
    });

    analyticsServerClient.capture({
      distinctId: userId,
      event: "topic updated",
      properties: { updatedTopic },
    });

    revalidatePath("/topics/[topicId]", "page");
    return updatedTopic;
  });

export const deleteTopic = authedAction
  .createServerAction()
  .input(deleteTopicsSchema)
  .handler(async ({ input: topicIds, ctx: { userId } }) => {
    const deletedTopics = await deleteTopicsMutation({
      userId,
      topicIds,
    });

    analyticsServerClient.capture({
      distinctId: userId,
      event: "topics deleted",
      properties: { deletedTopics },
    });

    revalidatePath("/topics");
    return deletedTopics;
  });
