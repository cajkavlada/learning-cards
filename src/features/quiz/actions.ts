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
import { analyticsAuthActionClient, authActionClient } from "~/lib/safe-action";

export const checkQuizSessionConflictAction = authActionClient
  .schema(baseTopicSchema.required().shape.id.array())
  .action(async ({ parsedInput: topicIds, ctx: { userId } }) => {
    const quizSessionTopics = await getQuizSessionTopicsQuery(userId);

    const isConflict = !arrayItemsAreEqual(topicIds, quizSessionTopics);
    if (!isConflict) redirect("/quiz");
    return isConflict;
  });

function arrayItemsAreEqual(arr1: string[], arr2: string[]) {
  if (arr1.length !== arr2.length) return false;

  const sortedArr1 = [...arr1].sort();
  const sortedArr2 = [...arr2].sort();
  return sortedArr1.every((value, index) => value === sortedArr2[index]);
}

export const startNewQuizSessionAction = analyticsAuthActionClient
  .metadata({ eventName: "new quiz session created" })
  .schema(baseTopicSchema.required().shape.id.array())
  .action(async ({ parsedInput: topicIds, ctx: { userId } }) => {
    await deleteQuizSessionMutation(userId);

    const shuffledQuestionIds = await getShuffledQuestionsIds(topicIds);

    await createQuizSessionMutation({
      userId,
      questionsIds: shuffledQuestionIds,
    });

    await addQuizTopicLinkMutation({ userId, topicIds });

    redirect(`/quiz`);
  });

export const restartQuizSessionAction = analyticsAuthActionClient
  .metadata({ eventName: "quiz session restarted" })
  .action(async ({ ctx: { userId } }) => {
    console.log("ahoj");
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
    return updatedQuizSession;
  });

async function getShuffledQuestionsIds(topicIds: TopicProps["id"][]) {
  const quizQuestionIds =
    await getUnlearnedQuestionsIdsFromTopicsQuery(topicIds);

  return shuffleArray(quizQuestionIds);
}

export const nextQuestionAction = analyticsAuthActionClient
  .metadata({ eventName: "moving to next question" })
  .action(async ({ ctx: { userId } }) => {
    const quizSession = await getQuizSessionQuery(userId);
    if (!quizSession) throw new Error("Quiz session not found");

    const nextQuestionIndex = quizSession.currentQuestionIndex + 1;

    const updatedQuizSession = await updateQuizSessionMutation({
      userId,
      currentQuestionIndex: nextQuestionIndex,
    });

    revalidatePath("/quiz/[quizId]", "page");
    return {
      questionIndex: updatedQuizSession?.currentQuestionIndex,
      questionId:
        updatedQuizSession?.questionsIds[
          updatedQuizSession?.currentQuestionIndex
        ],
    };
  });

export const previousQuestionAction = analyticsAuthActionClient
  .metadata({ eventName: "moving to previous question" })
  .action(async ({ ctx: { userId } }) => {
    const quizSession = await getQuizSessionQuery(userId);
    if (!quizSession) throw new Error("Quiz session not found");

    const previousQuestionIndex = quizSession.currentQuestionIndex - 1;

    const updatedQuizSession = await updateQuizSessionMutation({
      userId,
      currentQuestionIndex: previousQuestionIndex,
    });

    revalidatePath("/quiz/[quizId]", "page");
    return {
      questionIndex: updatedQuizSession?.currentQuestionIndex,
      questionId:
        updatedQuizSession?.questionsIds[
          updatedQuizSession?.currentQuestionIndex
        ],
    };
  });

export const switchLearnedAction = analyticsAuthActionClient
  .metadata({ eventName: "learned flag switched" })
  .schema(baseQuestionSchema.required().shape.markedAsLearned)
  .action(async ({ parsedInput: learned, ctx: { userId } }) => {
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

    revalidatePath("/quiz/[quizId]", "page");
    return updatedQuestion?.markedAsLearned;
  });
