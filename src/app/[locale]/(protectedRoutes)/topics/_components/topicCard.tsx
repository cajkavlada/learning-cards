import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
} from "~/components/ui";
import { Pencil } from "lucide-react";
import { DeleteTopicsButton } from "./deleteTopicsDialog";
import type { TopicPropsWithQuestionCount } from "~/features/topics/types";
import type { CheckedState } from "@radix-ui/react-checkbox";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export function TopicCard({
  topic,
  checked,
  onCheckedChange,
}: {
  topic: TopicPropsWithQuestionCount;
  checked: CheckedState;
  onCheckedChange: (checked: CheckedState) => void;
}) {
  const t = useTranslations("topic.card");
  const router = useRouter();

  function handleCardClick() {
    router.push(`/topics/${topic.id}`);
  }

  return (
    <li className="min-w-[250px] max-w-[350px] flex-1 flex-grow">
      <Card
        className="w-full cursor-pointer hover:bg-card/40"
        tabIndex={0}
        onClick={handleCardClick}
        onKeyDown={(e) => e.key === "Enter" && handleCardClick()}
      >
        <CardHeader className="pr-2 pt-3">
          <div className="flex items-center">
            <div className="mr-2 flex" onClick={(e) => e.stopPropagation()}>
              <Checkbox
                checked={checked}
                onCheckedChange={onCheckedChange}
                aria-labelledby={`checkbox-label-${topic.name}`}
              />
            </div>
            <CardTitle
              className="flex-1 truncate text-nowrap"
              id={`checkbox-label-${topic.name}`}
            >
              {topic.name}
            </CardTitle>
            <Button
              className="h-8 w-8 rounded-full p-0"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`topics/${topic.id}/edit`);
              }}
              variant="ghost"
              aria-label={t("editLabel")}
            >
              <Pencil size={16} />
            </Button>
            <DeleteTopicsButton ids={new Set([topic.id])} />
          </div>
          <CardDescription className="truncate text-wrap">
            {topic.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="truncate text-wrap">
            {t("questionCount", { count: topic.questionsCount })}
          </div>
        </CardContent>
      </Card>
    </li>
  );
}
