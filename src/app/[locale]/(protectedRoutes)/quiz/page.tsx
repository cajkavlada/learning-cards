import { getTranslations } from "next-intl/server";
import { getCurrentQuestionInfo } from "~/features/quiz/actions";
import { QuestionAnswer } from "./_components/questionAnswer";

export default async function TestPage() {
  const currentQuestionInfo = await getCurrentQuestionInfo();
  const t = await getTranslations("quiz.progress");

  if (!currentQuestionInfo?.currentQuestion) return null;
  const { currentQuestion, index, total } = currentQuestionInfo;

  return (
    <div className="flex h-full flex-col gap-4 p-6">
      <div className="w-full">
        <h2 className="mb-4 text-xl font-bold">
          {t("title")} {index + 1}/{total}
        </h2>
        <h1 className="text-center text-2xl md:text-4xl">
          {currentQuestion.question}
        </h1>
      </div>
      <QuestionAnswer
        question={currentQuestion}
        isFirst={index === 0}
        isLast={index === total - 1}
      />
    </div>
  );
}
