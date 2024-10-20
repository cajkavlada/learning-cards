"use server";

import { createServerAction } from "zsa";
import { revalidatePath } from "next/cache";
import {
  getQuestionDetailQuery,
  createQuestionMutation,
  updateQuestionMutation,
  deleteQuestionsMutation,
  switchLearnedMutation,
} from "./queries";
import {
  createQuestionSchema,
  updateQuestionSchema,
  deleteQuestionsSchema,
  type QuestionProps,
  updateQuestionLearnedStatusSchema,
} from "./types";
import { auth } from "@clerk/nextjs/server";
import { getTranslations } from "next-intl/server";
import analyticsServerClient from "~/server/analytics";
import { questionRatelimit } from "~/server/ratelimit";

export async function getQuestionDetail(id: QuestionProps["id"]) {
  const user = auth();
  if (!user.userId) throw new Error("Not authenticated");
  const question = await getQuestionDetailQuery(id);

  if (!question) {
    throw new Error("Question not found");
  }

  if (question.topic.userId !== user.userId) {
    throw new Error("You do not have permission for this question");
  }

  return question;
}
export const createQuestion = createServerAction()
  .input(async () => {
    const t = await getTranslations("question.form");
    return createQuestionSchema(t);
  })
  .handler(async ({ input }) => {
    const user = auth();
    if (!user.userId) throw new Error("Not authenticated");

    const { success } = await questionRatelimit.limit(user.userId);
    if (!success) {
      throw new Error("Question creation rate limit reached. Try again later.");
    }

    const newQuestion = await createQuestionMutation({
      ...input,
      userId: user.userId,
    });

    analyticsServerClient.capture({
      distinctId: user.userId,
      event: "question created",
      properties: { newQuestion },
    });

    revalidatePath("/topics/[topicId]", "page");
    return newQuestion;
  });

export const updateQuestion = createServerAction()
  .input(async () => {
    const t = await getTranslations("question.form");
    return updateQuestionSchema(t);
  })
  .handler(async ({ input }) => {
    const user = auth();
    if (!user.userId) throw new Error("Not authenticated");

    const updatedQuestion = await updateQuestionMutation({
      ...input,
      userId: user.userId,
    });

    analyticsServerClient.capture({
      distinctId: user.userId,
      event: "question updated",
      properties: { updatedQuestion },
    });

    revalidatePath("/topics/[topicId]", "page");
    return updatedQuestion;
  });

export const switchLearnedStatus = createServerAction()
  .input(updateQuestionLearnedStatusSchema)
  .handler(async ({ input }) => {
    const user = auth();
    if (!user.userId) throw new Error("Not authenticated");

    const updatedQuestions = await switchLearnedMutation({
      ...input,
      userId: user.userId,
    });

    analyticsServerClient.capture({
      distinctId: user.userId,
      event: "questions learned status updated",
      properties: { updatedQuestions },
    });

    revalidatePath("/topics/[topicId]", "page");
    return updatedQuestions;
  });

export const deleteQuestions = createServerAction()
  .input(deleteQuestionsSchema)
  .handler(async ({ input }) => {
    const user = auth();
    if (!user.userId) throw new Error("Not authenticated");

    const deletedQuestions = await deleteQuestionsMutation({
      userId: user.userId,
      deleteIds: input,
    });

    analyticsServerClient.capture({
      distinctId: user.userId,
      event: "questions deleted",
      properties: { deletedQuestions },
    });

    revalidatePath("/topics/[topicId]", "page");
    return deletedQuestions;
  });
