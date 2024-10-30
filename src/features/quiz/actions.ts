"use server";

import { auth } from "@clerk/nextjs/server";
import {
  addQuizTopicLinkMutation,
  createQuizSessionMutation,
  deleteQuizSessionMutation,
  getQuizSessionQuery,
  getQuizSessionTopicsQuery,
  getQuizTopicsQuery,
  updateQuizSessionMutation,
} from "./queries";
import {
  getSimpleQuestionQuery,
  getUnlearnedQuestionsIdsFromTopicsQuery,
  updateQuestionMutation,
} from "../questions/queries";
import { baseTopicSchema, type TopicProps } from "../topics/types";
import { createServerAction } from "zsa";
import { revalidatePath } from "next/cache";
import { shuffleArray } from "~/utils/shuffle";
import { baseQuestionSchema } from "../questions/types";
import { redirect } from "next/navigation";
import analyticsServerClient from "~/server/analytics";

export async function getCurrentQuestionInfo() {
  const user = auth();
  if (!user.userId) throw new Error("Not authenticated");

  const quizSession = await getQuizSessionQuery(user.userId);
  if (!quizSession) {
    throw new Error("Quiz session not found");
  }

  if (quizSession.questionsIds.length === 0) {
    throw new Error("No unlearned questions found in quiz session");
  }

  const { questionsIds, currentQuestionIndex } = quizSession;

  const currentQuestionId = questionsIds[currentQuestionIndex];
  if (!currentQuestionId) throw new Error("Quiz session is corrupted");

  const currentQuestion = await getSimpleQuestionQuery(currentQuestionId);

  return {
    currentQuestion,
    index: currentQuestionIndex,
    total: questionsIds.length,
  };
}

export const checkQuizSessionConflict = createServerAction()
  .input(baseTopicSchema.required().shape.id.array())
  .handler(async ({ input }) => {
    const user = auth();
    if (!user.userId) throw new Error("Not authenticated");
    const quizSessionTopics = await getQuizSessionTopicsQuery(user.userId);

    return !arrayItemsAreEqual(input, quizSessionTopics);
  });

function arrayItemsAreEqual(arr1: string[], arr2: string[]) {
  if (arr1.length !== arr2.length) return false;

  const sortedArr1 = [...arr1].sort();
  const sortedArr2 = [...arr2].sort();
  return sortedArr1.every((value, index) => value === sortedArr2[index]);
}

export const startNewQuizSession = createServerAction()
  .input(baseTopicSchema.required().shape.id.array())
  .handler(async ({ input }) => {
    const user = auth();
    if (!user.userId) throw new Error("Not authenticated");

    await deleteQuizSessionMutation(user.userId);

    const shuffledQuestionIds = await getShuffledQuestionsIds(input);

    await createQuizSessionMutation({
      userId: user.userId,
      questionsIds: shuffledQuestionIds,
    });

    await addQuizTopicLinkMutation({ userId: user.userId, topicIds: input });

    analyticsServerClient.capture({
      distinctId: user.userId,
      event: "new quiz session created",
    });

    redirect(`/quiz`);
  });

export const restartQuizSession = createServerAction().handler(async () => {
  const user = auth();
  if (!user.userId) throw new Error("Not authenticated");

  const quizSession = await getQuizSessionQuery(user.userId);
  if (!quizSession) throw new Error("Quiz session not found");

  const quizTopicIds = await getQuizTopicsQuery(quizSession.userId);

  const shuffledQuestionIds = await getShuffledQuestionsIds(quizTopicIds);

  const updatedQuizSession = await updateQuizSessionMutation({
    userId: user.userId,
    currentQuestionIndex: 0,
    questionsIds: shuffledQuestionIds,
  });

  revalidatePath("/quiz");

  analyticsServerClient.capture({
    distinctId: user.userId,
    event: "quiz session restarted",
  });

  return updatedQuizSession;
});

async function getShuffledQuestionsIds(topicIds: TopicProps["id"][]) {
  const quizQuestionIds =
    await getUnlearnedQuestionsIdsFromTopicsQuery(topicIds);

  return shuffleArray(quizQuestionIds);
}

export const nextQuestion = createServerAction().handler(async () => {
  const user = auth();
  if (!user.userId) throw new Error("Not authenticated");

  const quizSession = await getQuizSessionQuery(user.userId);
  if (!quizSession) throw new Error("Quiz session not found");

  const nextQuestionIndex = quizSession.currentQuestionIndex + 1;

  const updatedQuizSession = await updateQuizSessionMutation({
    userId: user.userId,
    currentQuestionIndex: nextQuestionIndex,
  });

  analyticsServerClient.capture({
    distinctId: user.userId,
    event: "moving to next question",
    properties: {
      questionIndex: updatedQuizSession?.currentQuestionIndex,
      questionId:
        updatedQuizSession?.questionsIds[
          updatedQuizSession?.currentQuestionIndex
        ],
    },
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

  const updatedQuizSession = await updateQuizSessionMutation({
    userId: user.userId,
    currentQuestionIndex: previousQuestionIndex,
  });

  analyticsServerClient.capture({
    distinctId: user.userId,
    event: "moving to previous question",
    properties: {
      questionIndex: updatedQuizSession?.currentQuestionIndex,
      questionId:
        updatedQuizSession?.questionsIds[
          updatedQuizSession?.currentQuestionIndex
        ],
    },
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

    const updatedQuestion = await updateQuestionMutation({
      id: currentQuestionId,
      userId: user.userId,
      markedAsLearned: input,
    });

    analyticsServerClient.capture({
      distinctId: user.userId,
      event: "quiz session restarted",
      properties: { updatedQuestion },
    });

    revalidatePath("/quiz/[quizId]", "page");
    return updatedQuestion?.markedAsLearned;
  });
