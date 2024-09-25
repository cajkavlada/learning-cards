"use server";

import { createServerAction } from "zsa";
import { revalidatePath } from "next/cache";
import {
  getQuestionDetailQuery,
  createQuestionMutation,
  updateQuestionMutation,
  deleteQuestionsMutation,
} from "./queries";
import {
  createQuestionSchema,
  updateQuestionSchema,
  deleteQuestionsSchema,
  type QuestionProps,
} from "./types";
import { auth } from "@clerk/nextjs/server";

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
  .input(createQuestionSchema)
  .handler(async ({ input }) => {
    const user = auth();
    if (!user.userId) throw new Error("Not authenticated");

    const newQuestion = await createQuestionMutation({
      ...input,
      userId: user.userId,
    });
    revalidatePath("/topics/[topicId]", "page");
    return newQuestion;
  });

export const updateQuestion = createServerAction()
  .input(updateQuestionSchema)
  .handler(async ({ input }) => {
    const user = auth();
    if (!user.userId) throw new Error("Not authenticated");

    const updatedQuestion = await updateQuestionMutation({
      ...input,
      userId: user.userId,
    });
    revalidatePath("/topics/[topicId]", "page");
    return updatedQuestion;
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
    revalidatePath("/topics/[topicId]", "page");
    return deletedQuestions;
  });
