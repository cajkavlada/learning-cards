import "server-only";

import { db } from "~/server/db";
import { questions, topics } from "~/server/db/schema";
import { and, eq, inArray, sql } from "drizzle-orm";
import type {
  TopicProps,
  CreateTopicProps,
  UpdateTopicProps,
  DeleteTopicsProps,
} from "~/features/topics/types";

export async function getTopicsByUserQuery(userId: TopicProps["userId"]) {
  const topicList = await db
    .select({
      id: topics.id,
      name: topics.name,
      description: topics.description,
      questionsCount: sql<number>`COUNT(${questions.id})`,
    })
    .from(topics)
    .leftJoin(questions, eq(topics.id, questions.topicId))
    .where(eq(topics.userId, userId))
    .groupBy(topics.id);
  return topicList;
}

export async function getTopicDetailQuery({
  id,
  userId,
}: Pick<TopicProps, "id" | "userId">) {
  const topic = await db.query.topics.findFirst({
    where: (model, { and, eq }) =>
      and(eq(model.userId, userId), eq(model.id, id)),
    with: {
      questions: {
        orderBy: (questionModel) => questionModel.createdAt,
      },
    },
  });

  if (!topic) {
    throw new Error("Topic not found");
  }

  const testable = topic.questions.some(
    (question) => !question.markedAsLearned,
  );
  const learnedCount = topic.questions.filter(
    (question) => question.markedAsLearned,
  ).length;

  return { ...topic, testable, learnedCount };
}

export async function createTopicMutation(input: CreateTopicProps) {
  const [newTopic] = await db.insert(topics).values(input).returning();
  return newTopic;
}

export async function updateTopicMutation({
  id,
  userId,
  ...input
}: UpdateTopicProps) {
  const [updatedTopic] = await db
    .update(topics)
    .set(input)
    .where(and(eq(topics.id, id), eq(topics.userId, userId)))
    .returning();

  return updatedTopic;
}

export async function deleteTopicsMutation({
  userId,
  topicIds,
}: DeleteTopicsProps) {
  const deletedTopics = await db
    .delete(topics)
    .where(and(inArray(topics.id, topicIds), eq(topics.userId, userId)))
    .returning();

  return deletedTopics;
}
