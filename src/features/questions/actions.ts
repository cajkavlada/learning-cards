"use server";

import { createServerAction } from "zsa";
import { createQuestionBESchema } from "./types";
import { revalidatePath } from "next/cache";
import { createQuestionMutation } from "~/server/queries";

export const createQuestion = createServerAction()
  .input(createQuestionBESchema)
  .handler(async ({ input }) => {
    const newQuestion = await createQuestionMutation(input);
    revalidatePath("/topics/[id]", "page");
    return newQuestion;
  });
