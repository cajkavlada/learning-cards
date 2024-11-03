import { useTranslations } from "next-intl";
import { useOptimisticAction } from "next-safe-action/hooks";

import type { QuestionProps } from "~/features/questions/types";
import { Label, Switch } from "~/components/ui";
import { switchLearnedAction } from "~/features/quiz/actions";
import { toastError } from "~/lib/toast";

export function LearnToggle({
  initialLearned,
}: {
  initialLearned: QuestionProps["markedAsLearned"];
}) {
  const t = useTranslations("quiz.progress");

  const { execute: switchLearned, optimisticState } = useOptimisticAction(
    switchLearnedAction,
    {
      currentState: { learned: initialLearned },
      updateFn: (_, checked) => {
        return {
          learned: checked,
        };
      },
      onError: toastError,
    },
  );

  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={optimisticState.learned}
        onCheckedChange={(checked) => switchLearned(checked)}
        id="marked-as-learned"
        aria-labelledby="marked-as-learned-label"
      />
      <Label id="marked-as-learned-label" htmlFor="marked-as-learned">
        {t("markAsLearned")}
      </Label>
    </div>
  );
}
