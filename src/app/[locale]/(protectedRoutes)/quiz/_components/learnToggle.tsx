import { useServerAction } from "zsa-react";
import { Label, Switch } from "~/components/ui";
import { switchLearned } from "~/features/quiz/actions";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import type { QuestionProps } from "~/features/questions/types";

export function LearnToggle({
  initialLearned,
}: {
  initialLearned: QuestionProps["markedAsLearned"];
}) {
  const t = useTranslations("quiz.progress");

  const {
    execute: toggleLearned,
    data: learned,
    setOptimistic,
    isPending,
  } = useServerAction(switchLearned);

  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={learned ?? (isPending ? !initialLearned : initialLearned)}
        onCheckedChange={handleChangeLearned}
        id="marked-as-learned"
        aria-labelledby="marked-as-learned-label"
      />
      <Label id="marked-as-learned-label" htmlFor="marked-as-learned">
        {t("markAsLearned")}
      </Label>
    </div>
  );

  async function handleChangeLearned(checked: boolean) {
    await setOptimistic(checked);
    const [, error] = await toggleLearned(checked);
    if (error) {
      toast(error.name, { description: error.message });
    }
  }
}
