import "server-only";

import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { questions } from "~/server/db/schema";
import type {
  CreateQuestion,
  UpdateQuestion,
  DeleteQuestions,
} from "~/features/questions/types";
import { and, eq, inArray } from "drizzle-orm";

export async function getQuestionDetail(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Not authenticated");

  const question = await db.query.questions.findFirst({
    where: (model, { eq }) => eq(model.id, id),
    with: { topic: true },
  });

  if (!question) {
    throw new Error("Question not found");
  }

  if (question.topic.userId !== user.userId) {
    throw new Error("You do not have permission for this question");
  }

  return question;
}

export async function createQuestionMutation(input: CreateQuestion) {
  const user = auth();
  if (!user.userId) throw new Error("Not authenticated");

  const topic = await db.query.topics.findFirst({
    where: (model, { eq }) =>
      and(eq(model.id, input.topicId), eq(model.userId, user.userId)),
  });

  if (!topic) {
    throw new Error(
      "Topic not found or you do not have permission for selected topic",
    );
  }

  const newQuestion = await db.insert(questions).values(input).returning();
  return newQuestion;
}

export async function updateQuestionMutation({ id, ...input }: UpdateQuestion) {
  const user = auth();
  if (!user.userId) throw new Error("Not authenticated");

  const question = await db.query.questions.findFirst({
    where: (model, { eq }) => eq(model.id, id),
    with: { topic: true },
  });

  if (!question) {
    throw new Error("Question not found");
  }

  if (question.topic.userId !== user.userId) {
    throw new Error("You do not have permission for this question");
  }

  const updatedQuestion = await db
    .update(questions)
    .set(input)
    .where(eq(questions.id, id))
    .returning();
  return updatedQuestion;
}

export async function deleteQuestionMutation(ids: DeleteQuestions) {
  const user = auth();
  if (!user.userId) throw new Error("Not authenticated");

  const questionsToDelete = await db.query.questions.findMany({
    where: (model, { inArray }) => inArray(model.id, ids),
    with: { topic: true },
  });

  if (questionsToDelete.length === 0) {
    throw new Error("No questions found");
  }

  questionsToDelete.forEach((question) => {
    if (question.topic.userId !== user.userId) {
      throw new Error(
        "You do not have permission to delete some of the selected questions",
      );
    }
  });

  const deletedQuestion = await db
    .delete(questions)
    .where(inArray(questions.id, ids))
    .returning();

  return deletedQuestion;
}
