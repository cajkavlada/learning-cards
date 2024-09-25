"use server";

import { auth } from "@clerk/nextjs/server";
import { v4 as uuidv4 } from "uuid";
import {
  addQuizTopicLinkMutation,
  createQuizSessionMutation,
  deleteQuizSessionMutation,
  getQuizSessionQuery,
  getQuizTopicsQuery,
  updateQuizSessionMutation,
} from "./queries";
import { checkTopicId } from "../topics/queries";
import {
  getSimpleQuestionQuery,
  getUnlearnedQuestionsIdsFromTopicsQuery,
  updateQuestionMutation,
} from "../questions/queries";
import { baseQuizSessionSchema, type QuizSessionProps } from "./types";
import {
  baseTopicSchema,
  updateTopicSchema,
  type TopicProps,
} from "../topics/types";
import { createServerAction } from "zsa";
import { revalidatePath } from "next/cache";
import { shuffleArray } from "~/utils/shuffle";
import { baseQuestionSchema } from "../questions/types";
import { redirect } from "next/navigation";
import { db } from "~/server/db";

export async function getCurrentQuestionInfo(
  quizId: QuizSessionProps["quizId"],
) {
  const user = auth();
  if (!user.userId) throw new Error("Not authenticated");

  let quizSession = await getQuizSessionQuery(user.userId);
  if (!quizSession) {
    quizSession = await createQuizSession(quizId, user.userId);
  }
  if (quizSession.quizId !== quizId) return null;

  const { questionsIds, currentQuestionIndex } = quizSession;

  const currentQuestionId = questionsIds[currentQuestionIndex];
  if (!currentQuestionId) throw new Error("Quiz session is corrupted");

  const currentQuestion = await getSimpleQuestionQuery(currentQuestionId);

  const a = await db.query.topics.findFirst({
    where: (model, { eq }) => eq(model.id, quizId),
    with: {
      questions: true,
      quizesToTopics: true,
    },
  });

  const b = await db.query.quizSessions.findFirst({
    where: (model, { eq }) => eq(model.userId, user.userId),
    with: {
      quizToTopics: true,
    },
  });

  console.log("-----------");
  console.log(a);
  console.log(".............");
  console.log(b);

  return {
    currentQuestion,
    index: currentQuestionIndex,
    total: questionsIds.length,
  };
}

export async function checkQuizSessionConflict(
  quizId: QuizSessionProps["quizId"],
) {
  const user = auth();
  if (!user.userId) throw new Error("Not authenticated");
  const quizSession = await getQuizSessionQuery(user.userId);
  if (!quizSession || quizSession.quizId === quizId) return null;

  return quizSession;
}

async function createQuizSession(
  quizId: QuizSessionProps["quizId"],
  userId: QuizSessionProps["userId"],
) {
  let quizTopicIds = await getQuizTopicsQuery(quizId);

  if (!quizTopicIds.length && (await checkTopicId(quizId))) {
    await addQuizTopicLinkMutation({ quizId, topicIds: [quizId] });
    quizTopicIds = [quizId];
  }
  if (!quizTopicIds.length) throw new Error("Quiz topics could not be found");

  const quizQuestionIds =
    await getUnlearnedQuestionsIdsFromTopicsQuery(quizTopicIds);

  const shuffledQuestionIds = shuffleArray(quizQuestionIds);

  const quizSession = await createQuizSessionMutation({
    userId,
    quizId,
    questionsIds: shuffledQuestionIds,
  });
  if (!quizSession) throw new Error("Quiz session could not be created");

  return quizSession;
}

export const restartQuizSession = createServerAction().handler(async () => {
  const user = auth();
  if (!user.userId) throw new Error("Not authenticated");

  const quizSession = await getQuizSessionQuery(user.userId);
  if (!quizSession) throw new Error("Quiz session not found");

  const quizTopicIds = await getQuizTopicsQuery(quizSession.quizId);

  const quizQuestionIds =
    await getUnlearnedQuestionsIdsFromTopicsQuery(quizTopicIds);

  const shuffledQuestionIds = shuffleArray(quizQuestionIds);

  const updatedQuizSession = await updateQuizSessionMutation({
    userId: user.userId,
    currentQuestionIndex: 0,
    questionsIds: shuffledQuestionIds,
  });

  revalidatePath("/quiz/[quizId]", "page");

  return updatedQuizSession;
});

export const overideQuizSession = createServerAction()
  .input(baseQuizSessionSchema.shape.quizId)
  .handler(async ({ input }) => {
    const user = auth();
    if (!user.userId) throw new Error("Not authenticated");

    await deleteQuizSessionMutation(user.userId);
    const quizSession = await createQuizSession(input, user.userId);

    revalidatePath("/quiz/[quizId]", "page");

    return quizSession;
  });

export const nextQuestion = createServerAction().handler(async () => {
  const user = auth();
  if (!user.userId) throw new Error("Not authenticated");

  const quizSession = await getQuizSessionQuery(user.userId);
  if (!quizSession) throw new Error("Quiz session not found");

  const nextQuestionIndex = quizSession.currentQuestionIndex + 1;

  await updateQuizSessionMutation({
    userId: user.userId,
    currentQuestionIndex: nextQuestionIndex,
  });

  revalidatePath("/quiz/[quizId]", "page");

  return null;
});

export const previousQuestion = createServerAction().handler(async () => {
  const user = auth();
  if (!user.userId) throw new Error("Not authenticated");

  const quizSession = await getQuizSessionQuery(user.userId);
  if (!quizSession) throw new Error("Quiz session not found");

  const previousQuestionIndex = quizSession.currentQuestionIndex - 1;

  await updateQuizSessionMutation({
    userId: user.userId,
    currentQuestionIndex: previousQuestionIndex,
  });

  revalidatePath("/quiz/[quizId]", "page");

  return null;
});

export const switchLearned = createServerAction()
  .input(baseQuestionSchema.required().shape.markedAsLearned)
  .handler(async ({ input }) => {
    const user = auth();
    if (!user.userId) throw new Error("Not authenticated");

    const quizSession = await getQuizSessionQuery(user.userId);
    if (!quizSession) throw new Error("Quiz session not found");

    const currentQuestionId =
      quizSession.questionsIds[quizSession.currentQuestionIndex];

    if (!currentQuestionId) throw new Error("Question not found");

    await updateQuestionMutation({
      id: currentQuestionId,
      userId: user.userId,
      markedAsLearned: input,
    });

    revalidatePath("/quiz/[quizId]", "page");

    return null;
  });

export const createMultiquiz = createServerAction()
  .input(updateTopicSchema.shape.id.array())
  .handler(async ({ input }) => {
    const user = auth();
    if (!user.userId) throw new Error("Not authenticated");
    const quizId = uuidv4();
    await addQuizTopicLinkMutation({ quizId, topicIds: input });
    redirect(`/quiz/${quizId}`);
    return quizId;
  });
