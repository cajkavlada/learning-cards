import "server-only";

import { db } from "~/server/db";
import type {
  CreateQuizSessionProps,
  QuizSessionProps,
  UpdateQuizSessionProps,
} from "./types";
import { quizSessions, quizToTopics } from "~/server/db/schema";
import type { TopicProps } from "../topics/types";
import { eq } from "drizzle-orm";

export async function getQuizSessionQuery(userId: QuizSessionProps["userId"]) {
  const quizSession = await db.query.quizSessions.findFirst({
    where: (model, { eq }) => eq(model.userId, userId),
  });

  return quizSession;
}

export async function createQuizSessionMutation(input: CreateQuizSessionProps) {
  const [quizSession] = await db.insert(quizSessions).values(input).returning();

  return quizSession;
}

export async function deleteQuizSessionMutation(
  userId: QuizSessionProps["userId"],
) {
  const deletedQuizSession = await db
    .delete(quizSessions)
    .where(eq(quizSessions.userId, userId))
    .returning();

  return deletedQuizSession;
}

export async function getQuizTopicsQuery(userId: QuizSessionProps["userId"]) {
  const quizTopics = await db.query.quizToTopics.findMany({
    columns: { topicId: true },
    where: (model, { eq }) => eq(model.userId, userId),
  });

  return quizTopics.map((topic) => topic.topicId);
}

export async function addQuizTopicLinkMutation({
  userId,
  topicIds,
}: {
  userId: QuizSessionProps["userId"];
  topicIds: TopicProps["id"][];
}) {
  const quizToTopic = await db
    .insert(quizToTopics)
    .values(
      topicIds.map((topicId) => ({
        userId,
        topicId,
      })),
    )
    .returning();
  return quizToTopic;
}

export async function updateQuizSessionMutation({
  userId,
  ...input
}: UpdateQuizSessionProps) {
  const [updatedQuizSession] = await db
    .update(quizSessions)
    .set(input)
    .where(eq(quizSessions.userId, userId))
    .returning();
  return updatedQuizSession;
}

export async function getQuizSessionTopicsQuery(
  userId: QuizSessionProps["userId"],
) {
  const quizTopicLink = await db.query.quizToTopics.findMany({
    where: (model, { eq }) => eq(model.userId, userId),
  });

  return quizTopicLink.map((link) => link.topicId);
}
