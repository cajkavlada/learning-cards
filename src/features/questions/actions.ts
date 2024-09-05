"use server";

import { createServerAction } from "zsa";
import { revalidatePath } from "next/cache";
import {
  createQuestionMutation,
  deleteQuestionMutation,
  updateQuestionMutation,
} from "./queries";
import {
  createQuestionSchema,
  deleteQuestionSchema,
  updateQuestionSchema,
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
  .input(deleteQuestionSchema)
  .handler(async ({ input }) => {
    const deletedQuestion = await deleteQuestionMutation(input);
    revalidatePath("/topics/[topicId]", "page");
    return deletedQuestion;
  });
