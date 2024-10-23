import { useEffect, useState } from "react";
import { useServerAction } from "zsa-react";
import { Label, Switch } from "~/components/ui";
import { switchLearned } from "~/features/quiz/actions";
import type { QuestionProps } from "~/features/questions/types";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export function LearnToggle({
  markedAsLearned,
}: {
  markedAsLearned: QuestionProps["markedAsLearned"];
}) {
  const t = useTranslations("quiz.progress");
  const [learned, setLearned] = useState(markedAsLearned);

  const { execute: toggleLearned } = useServerAction(switchLearned);

  useEffect(() => {
    setLearned(markedAsLearned);
  }, [markedAsLearned]);

  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={learned}
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
    setLearned(checked);
    const [, error] = await toggleLearned(checked);
    if (error) {
      setLearned(!checked);
      toast(error.name, { description: error.message });
    }
  }
}
