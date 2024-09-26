import { useEffect, useState } from "react";
import { useServerAction } from "zsa-react";
import { Label } from "~/components/ui";
import { Switch } from "~/components/ui/switch";
import { switchLearned } from "../actions";
import { toast } from "sonner";
import type { QuestionProps } from "~/features/questions/types";

export function LearnToggle({
  markedAsLearned,
}: {
  markedAsLearned: QuestionProps["markedAsLearned"];
}) {
  const [learned, setLearned] = useState(markedAsLearned);

  const { execute: toggleLearned } = useServerAction(switchLearned);

  useEffect(() => {
    setLearned(markedAsLearned);
  }, [markedAsLearned]);

  return (
    <div className="ml-auto flex items-center space-x-2">
      <Switch
        checked={learned}
        onCheckedChange={handleChangeLearned}
        id="marked-as-learned"
      />
      <Label htmlFor="marked-as-learned">Mark as learned</Label>
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