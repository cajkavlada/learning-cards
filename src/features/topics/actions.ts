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
import {
  analyticsAuthActionClient,
  rateLimitAnalyticsAuthActionClient,
} from "~/lib/safe-action";

export const createTopicAction = rateLimitAnalyticsAuthActionClient
  .metadata({ eventName: "topic created", rateLimitType: "createTopic" })
  .schema(async () => {
    const t = await getTranslations("topic.form");
    return createTopicSchema(t);
  })
  .action(async ({ parsedInput: newTopicData, ctx: { userId } }) => {
    const newTopic = await createTopicMutation({
      ...newTopicData,
      userId,
    });

    revalidatePath("/topics");
    return newTopic;
  });

export const updateTopicAction = analyticsAuthActionClient
  .metadata({ eventName: "topic updated" })
  .schema(async () => {
    const t = await getTranslations("topic.form");
    return updateTopicSchema(t);
  })
  .action(async ({ parsedInput: topicData, ctx: { userId } }) => {
    const updatedTopic = await updateTopicMutation({
      ...topicData,
      userId,
    });

    revalidatePath("/topics/[topicId]", "page");
    return updatedTopic;
  });

export const deleteTopicsAction = analyticsAuthActionClient
  .metadata({ eventName: "topics deleted" })
  .schema(deleteTopicsSchema)
  .action(async ({ parsedInput: topicIds, ctx: { userId } }) => {
    const deletedTopics = await deleteTopicsMutation({
      userId,
      topicIds,
    });

    revalidatePath("/topics");
    return deletedTopics;
  });
