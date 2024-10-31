"use server";

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
  getUnlearnedQuestionsIdsFromTopicsQuery,
  updateQuestionMutation,
} from "../questions/queries";
import { baseTopicSchema, type TopicProps } from "../topics/types";
import { revalidatePath } from "next/cache";
import { shuffleArray } from "~/utils/shuffle";
import { baseQuestionSchema } from "../questions/types";
import { redirect } from "next/navigation";
import analyticsServerClient from "~/server/analytics";
import { authedAction } from "~/lib/zsa-procedures";

export const checkQuizSessionConflict = authedAction
  .createServerAction()
  .input(baseTopicSchema.required().shape.id.array())
  .handler(async ({ input: topicIds, ctx: { userId } }) => {
    const quizSessionTopics = await getQuizSessionTopicsQuery(userId);

    return !arrayItemsAreEqual(topicIds, quizSessionTopics);
  });

function arrayItemsAreEqual(arr1: string[], arr2: string[]) {
  if (arr1.length !== arr2.length) return false;

  const sortedArr1 = [...arr1].sort();
  const sortedArr2 = [...arr2].sort();
  return sortedArr1.every((value, index) => value === sortedArr2[index]);
}

export const startNewQuizSession = authedAction
  .createServerAction()
  .input(baseTopicSchema.required().shape.id.array())
  .handler(async ({ input: topicIds, ctx: { userId } }) => {
    await deleteQuizSessionMutation(userId);

    const shuffledQuestionIds = await getShuffledQuestionsIds(topicIds);

    await createQuizSessionMutation({
      userId,
      questionsIds: shuffledQuestionIds,
    });

    await addQuizTopicLinkMutation({ userId, topicIds });

    analyticsServerClient.capture({
      distinctId: userId,
      event: "new quiz session created",
    });

    redirect(`/quiz`);
  });

export const restartQuizSession = authedAction
  .createServerAction()
  .handler(async ({ ctx: { userId } }) => {
    const quizSession = await getQuizSessionQuery(userId);
    if (!quizSession) throw new Error("Quiz session not found");

    const quizTopicIds = await getQuizTopicsQuery(quizSession.userId);

    const shuffledQuestionIds = await getShuffledQuestionsIds(quizTopicIds);

    const updatedQuizSession = await updateQuizSessionMutation({
      userId,
      currentQuestionIndex: 0,
      questionsIds: shuffledQuestionIds,
    });

    revalidatePath("/quiz");

    analyticsServerClient.capture({
      distinctId: userId,
      event: "quiz session restarted",
    });

    return updatedQuizSession;
  });

async function getShuffledQuestionsIds(topicIds: TopicProps["id"][]) {
  const quizQuestionIds =
    await getUnlearnedQuestionsIdsFromTopicsQuery(topicIds);

  return shuffleArray(quizQuestionIds);
}

export const nextQuestion = authedAction
  .createServerAction()
  .handler(async ({ ctx: { userId } }) => {
    const quizSession = await getQuizSessionQuery(userId);
    if (!quizSession) throw new Error("Quiz session not found");

    const nextQuestionIndex = quizSession.currentQuestionIndex + 1;

    const updatedQuizSession = await updateQuizSessionMutation({
      userId,
      currentQuestionIndex: nextQuestionIndex,
    });

    analyticsServerClient.capture({
      distinctId: userId,
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

export const previousQuestion = authedAction
  .createServerAction()
  .handler(async ({ ctx: { userId } }) => {
    const quizSession = await getQuizSessionQuery(userId);
    if (!quizSession) throw new Error("Quiz session not found");

    const previousQuestionIndex = quizSession.currentQuestionIndex - 1;

    const updatedQuizSession = await updateQuizSessionMutation({
      userId,
      currentQuestionIndex: previousQuestionIndex,
    });

    analyticsServerClient.capture({
      distinctId: userId,
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

export const switchLearned = authedAction
  .createServerAction()
  .input(baseQuestionSchema.required().shape.markedAsLearned)
  .handler(async ({ input: learned, ctx: { userId } }) => {
    const quizSession = await getQuizSessionQuery(userId);
    if (!quizSession) throw new Error("Quiz session not found");

    const currentQuestionId =
      quizSession.questionsIds[quizSession.currentQuestionIndex];

    if (!currentQuestionId) throw new Error("Question not found");

    const updatedQuestion = await updateQuestionMutation({
      id: currentQuestionId,
      userId,
      markedAsLearned: learned,
    });

    analyticsServerClient.capture({
      distinctId: userId,
      event: "quiz session restarted",
      properties: { updatedQuestion },
    });

    revalidatePath("/quiz/[quizId]", "page");
    return updatedQuestion?.markedAsLearned;
  });
