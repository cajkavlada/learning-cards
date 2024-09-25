import "server-only";

import { db } from "~/server/db";
import { questions } from "~/server/db/schema";
import type {
  QuestionProps,
  CreateQuestionProps,
  UpdateQuestionProps,
  DeleteQuestionsProps,
} from "~/features/questions/types";
import { and, eq, inArray } from "drizzle-orm";

export async function getQuestionDetailQuery(id: QuestionProps["id"]) {
  const question = await db.query.questions.findFirst({
    where: (model, { eq }) => eq(model.id, id),
    with: { topic: true },
  });
  return question;
}

export async function getSimpleQuestionQuery(id: QuestionProps["id"]) {
  const question = await db.query.questions.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  return question;
}

export async function getUnlearnedQuestionsIdsFromTopicsQuery(
  topicIds: QuestionProps["topicId"][],
) {
  const questions = await db.query.questions.findMany({
    columns: { id: true },
    where: (model, { inArray, eq }) =>
      and(inArray(model.topicId, topicIds), eq(model.markedAsLearned, false)),
  });
  return questions.map((question) => question.id);
}

export async function createQuestionMutation({
  userId,
  ...input
}: CreateQuestionProps) {
  const topic = await db.query.topics.findFirst({
    where: (model, { eq }) =>
      and(eq(model.id, input.topicId), eq(model.userId, userId)),
  });

  if (!topic) {
    throw new Error(
      "Topic not found or you do not have permission for selected topic",
    );
  }

  const [newQuestion] = await db.insert(questions).values(input).returning();
  return newQuestion;
}

export async function updateQuestionMutation({
  id,
  userId,
  ...input
}: UpdateQuestionProps) {
  const question = await db.query.questions.findFirst({
    where: (model, { eq }) => eq(model.id, id),
    with: { topic: true },
  });

  if (!question) {
    throw new Error("Question not found");
  }

  if (question.topic.userId !== userId) {
    throw new Error("You do not have permission for this question");
  }

  const [updatedQuestion] = await db
    .update(questions)
    .set(input)
    .where(eq(questions.id, id))
    .returning();
  return updatedQuestion;
}

export async function deleteQuestionsMutation({
  userId,
  deleteIds,
}: DeleteQuestionsProps) {
  const questionsToDelete = await db.query.questions.findMany({
    where: (model, { inArray }) => inArray(model.id, deleteIds),
    with: { topic: true },
  });

  if (questionsToDelete.length === 0) {
    throw new Error("No questions found");
  }

  questionsToDelete.forEach((question) => {
    if (question.topic.userId !== userId) {
      throw new Error("You do not have permission for selected questions");
    }
  });

  const deletedQuestion = await db
    .delete(questions)
    .where(inArray(questions.id, deleteIds))
    .returning();

  return deletedQuestion;
}
