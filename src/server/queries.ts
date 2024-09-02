import "server-only";
import { db } from "./db";
import { questions, topics } from "./db/schema";
import { auth } from "@clerk/nextjs/server";
import type { CreateTopicFormData } from "~/features/topics/types";
import type { CreateQuestionBE } from "~/features/questions/types";
import { and, eq, sql } from "drizzle-orm";

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

export async function createTopicMutation(formData: CreateTopicFormData) {
  const user = auth();
  if (!user.userId) throw new Error("Not authenticated");

  const newTopic = await db
    .insert(topics)
    .values({
      ...formData,
      userId: user.userId,
    })
    .returning();
  return newTopic;
}

export async function deleteTopicMutation(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Not authenticated");

  const deletedTopic = await db
    .delete(topics)
    .where(and(eq(topics.id, id), eq(topics.userId, user.userId)))
    .returning();

  return deletedTopic;
}

export async function createQuestionMutation(data: CreateQuestionBE) {
  const user = auth();
  if (!user.userId) throw new Error("Not authenticated");

  const newQuestion = await db.insert(questions).values(data).returning();
  return newQuestion;
}
