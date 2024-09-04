"use server";

import { createServerAction } from "zsa";
import { revalidatePath } from "next/cache";
import { createQuestionMutation, updateQuestionMutation } from "./queries";
import { createQuestionSchema, updateQuestionSchema } from "./types";

export const createQuestion = createServerAction()
  .input(createQuestionSchema)
  .handler(async ({ input }) => {
    const newQuestion = await createQuestionMutation(input);
    revalidatePath("/topics/[id]", "page");
    return newQuestion;
  });

export const updateQuestion = createServerAction()
  .input(updateQuestionSchema)
  .handler(async ({ input }) => {
    const updatedQuestion = await updateQuestionMutation(input);
    revalidatePath("/topics/[id]", "page");
    return updatedQuestion;
  });
