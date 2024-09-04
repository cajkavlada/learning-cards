import "server-only";

import { db } from "~/server/db";
import { questions, topics } from "~/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq, sql } from "drizzle-orm";
import type {
  CreateTopic,
  DeleteTopic,
  UpdateTopic,
} from "~/features/topics/types";

export async function getMyTopics() {
  const user = auth();
  if (!user.userId) throw new Error("Not authenticated");

  // const topics1 = await db.query.topics.findMany({
  //   where: (model, { eq }) => eq(model.userId, user.userId),
  // });

  const topicList = await db
    .select({
      id: topics.id,
      name: topics.name,
      description: topics.description,
      questionsCount: sql<number>`COUNT(${questions.id})`, // Counting related questions
    })
    .from(topics)
    .leftJoin(questions, sql`${topics.id} = ${questions.topicId}`) // LEFT JOIN on topic ID
    .where(sql`${topics.userId} = ${user.userId}`) // Filtering by user ID
    .groupBy(topics.id);
  return topicList;
}

export async function getMyTopicDetail(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Not authenticated");

  const topic = await db.query.topics.findFirst({
    where: (model, { eq }) => eq(model.userId, user.userId) && eq(model.id, id),
    with: {
      questions: true,
    },
  });
  return topic;
}

export async function createTopicMutation(input: CreateTopic) {
  const user = auth();
  if (!user.userId) throw new Error("Not authenticated");

  const newTopic = await db
    .insert(topics)
    .values({
      ...input,
      userId: user.userId,
    })
    .returning();
  return newTopic;
}

export async function updateTopicMutation({ id, ...input }: UpdateTopic) {
  const user = auth();
  if (!user.userId) throw new Error("Not authenticated");
  const updatedTopic = await db
    .update(topics)
    .set(input)
    .where(and(eq(topics.id, id), eq(topics.userId, user.userId)))
    .returning();
  return updatedTopic;
}

export async function deleteTopicMutation({ id }: DeleteTopic) {
  const user = auth();
  if (!user.userId) throw new Error("Not authenticated");

  const deletedTopic = await db
    .delete(topics)
    .where(and(eq(topics.id, id), eq(topics.userId, user.userId)))
    .returning();

  return deletedTopic;
}
