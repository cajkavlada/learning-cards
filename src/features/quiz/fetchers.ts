import { getQuizSessionQuery } from "./queries";
import { getSimpleQuestionQuery } from "../questions/queries";
import { authed } from "~/lib/zsa-procedures";

export async function getCurrentQuestionInfo() {
  const { userId } = authed();

  const quizSession = await getQuizSessionQuery(userId);
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
