"use server";

import { revalidatePath } from "next/cache";
import {
  createQuestionMutation,
  updateQuestionMutation,
  deleteQuestionsMutation,
  switchLearnedMutation,
} from "./queries";
import {
  createQuestionSchema,
  updateQuestionSchema,
  deleteQuestionsSchema,
  updateQuestionLearnedStatusSchema,
} from "./types";
import { getTranslations } from "next-intl/server";
import analyticsServerClient from "~/server/analytics";
import { questionRatelimit } from "~/server/ratelimit";
import { authedAction } from "~/lib/zsa-procedures";

export const createQuestion = authedAction
  .createServerAction()
  .input(async () => {
    const t = await getTranslations("question.form");
    return createQuestionSchema(t);
  })
  .handler(async ({ input: newQuestionData, ctx: { userId } }) => {
    const { success } = await questionRatelimit.limit(userId);
    if (!success) {
      throw new Error("Question creation rate limit reached. Try again later.");
    }

    const newQuestion = await createQuestionMutation({
      ...newQuestionData,
      userId,
    });

    analyticsServerClient.capture({
      distinctId: userId,
      event: "question created",
      properties: { newQuestion },
    });

    revalidatePath("/topics/[topicId]", "page");
    return newQuestion;
  });

export const updateQuestion = authedAction
  .createServerAction()
  .input(async () => {
    const t = await getTranslations("question.form");
    return updateQuestionSchema(t);
  })
  .handler(async ({ input: questionData, ctx: { userId } }) => {
    const updatedQuestion = await updateQuestionMutation({
      ...questionData,
      userId,
    });

    analyticsServerClient.capture({
      distinctId: userId,
      event: "question updated",
      properties: { updatedQuestion },
    });

    revalidatePath("/topics/[topicId]", "page");
    return updatedQuestion;
  });

export const switchLearnedStatus = authedAction
  .createServerAction()
  .input(updateQuestionLearnedStatusSchema)
  .handler(async ({ input: switchData, ctx: { userId } }) => {
    const updatedQuestions = await switchLearnedMutation({
      ...switchData,
      userId,
    });

    analyticsServerClient.capture({
      distinctId: userId,
      event: "questions learned status updated",
      properties: { updatedQuestions },
    });

    revalidatePath("/topics/[topicId]", "page");
    return updatedQuestions;
  });

export const deleteQuestions = authedAction
  .createServerAction()
  .input(deleteQuestionsSchema)
  .handler(async ({ input: questionIds, ctx: { userId } }) => {
    const deletedQuestions = await deleteQuestionsMutation({
      userId,
      questionIds,
    });

    analyticsServerClient.capture({
      distinctId: userId,
      event: "questions deleted",
      properties: { deletedQuestions },
    });

    revalidatePath("/topics/[topicId]", "page");
    return deletedQuestions;
  });
