"use server";

import { createServerAction } from "zsa";
import { revalidatePath } from "next/cache";
import {
  createQuestionMutation,
  updateQuestionMutation,
  deleteQuestionMutation,
} from "./queries";
import {
  createQuestionSchema,
  updateQuestionSchema,
  deleteQuestionsSchema,
} from "./types";

export const createQuestion = createServerAction()
  .input(createQuestionSchema)
  .handler(async ({ input }) => {
    const newQuestion = await createQuestionMutation(input);
    revalidatePath("/topics/[topicId]", "page");
    return newQuestion;
  });

export const updateQuestion = createServerAction()
  .input(updateQuestionSchema)
  .handler(async ({ input }) => {
    const updatedQuestion = await updateQuestionMutation(input);
    revalidatePath("/topics/[topicId]", "page");
    return updatedQuestion;
  });

export const deleteQuestion = createServerAction()
  .input(deleteQuestionsSchema)
  .handler(async ({ input }) => {
    const deletedQuestions = await deleteQuestionMutation(input);
    revalidatePath("/topics/[topicId]", "page");
    return deletedQuestions;
  });
