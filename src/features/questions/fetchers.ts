import { authed } from "~/lib/safe-action";
import type { QuestionProps } from "./types";
import { getQuestionDetailQuery } from "./queries";

export async function getQuestionDetail(id: QuestionProps["id"]) {
  const { userId } = authed();
  const question = await getQuestionDetailQuery(id);

  if (!question) {
    throw new Error("Question not found");
  }

  if (question.topic.userId !== userId) {
    throw new Error("You do not have permission for this question");
  }

  return question;
}
