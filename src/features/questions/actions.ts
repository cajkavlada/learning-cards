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
import {
  analyticsAuthActionClient,
  rateLimitAnalyticsAuthActionClient,
} from "~/lib/safe-action";

export const createQuestionAction = rateLimitAnalyticsAuthActionClient
  .metadata({ eventName: "question created", rateLimitType: "createQuestion" })
  .schema(async () => {
    const t = await getTranslations("question.form");
    return createQuestionSchema(t);
  })
  .action(async ({ parsedInput: newQuestionData, ctx: { userId } }) => {
    const newQuestion = await createQuestionMutation({
      ...newQuestionData,
      userId,
    });

    revalidatePath("/topics/[topicId]", "page");
    return newQuestion;
  });

export const updateQuestionAction = analyticsAuthActionClient
  .metadata({ eventName: "question updated" })
  .schema(async () => {
    const t = await getTranslations("question.form");
    return updateQuestionSchema(t);
  })
  .action(async ({ parsedInput: questionData, ctx: { userId } }) => {
    const updatedQuestion = await updateQuestionMutation({
      ...questionData,
      userId,
    });

    revalidatePath("/topics/[topicId]", "page");
    return updatedQuestion;
  });

export const switchLearnedStatusAction = analyticsAuthActionClient
  .metadata({ eventName: "questions learned status updated" })
  .schema(updateQuestionLearnedStatusSchema)
  .action(async ({ parsedInput: switchData, ctx: { userId } }) => {
    const updatedQuestions = await switchLearnedMutation({
      ...switchData,
      userId,
    });

    revalidatePath("/topics/[topicId]", "page");
    return updatedQuestions;
  });

export const deleteQuestionsActions = analyticsAuthActionClient
  .metadata({ eventName: "questions deleted" })
  .schema(deleteQuestionsSchema)
  .action(async ({ parsedInput: questionIds, ctx: { userId } }) => {
    const deletedQuestions = await deleteQuestionsMutation({
      userId,
      questionIds,
    });

    revalidatePath("/topics/[topicId]", "page");
    return deletedQuestions;
  });
