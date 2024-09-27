import { getCurrentQuestionInfo } from "~/features/quiz/actions";
import { QuestionAnswer } from "~/features/quiz/components/questionAnswer";

export default async function QuizPage() {
  const currentQuestionInfo = await getCurrentQuestionInfo();

  if (!currentQuestionInfo?.currentQuestion) return null;
  const { currentQuestion, index, total } = currentQuestionInfo;

  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-between p-4">
        <div className="w-full">
          <div className="flex">
            <h2 className="mb-4 text-xl font-bold">
              Question {index + 1}/{total}
            </h2>
          </div>
          <h1 className="text-center text-2xl text-gray-800 md:text-4xl">
            {currentQuestion.question}
          </h1>
        </div>
        <QuestionAnswer
          question={currentQuestion}
          isFirst={index === 0}
          isLast={index === total - 1}
        />
      </div>
    </>
  );
}
