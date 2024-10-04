import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
} from "~/components/ui";
import { ClientLink } from "~/components/common/ClientLink";
import { Pencil } from "lucide-react";
import { DeleteTopicsButton } from "./deleteTopicsDialog";
import type { TopicPropsWithQuestionCount } from "../types";
import type { CheckedState } from "@radix-ui/react-checkbox";
import { useTranslations } from "next-intl";

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
  return (
    <li className="min-w-[250px] max-w-[350px] flex-1 flex-grow">
      <Link href={`/topics/${topic.id}`}>
        <Card className="w-full hover:bg-gray-200">
          <CardHeader className="pr-2 pt-3">
            <div className="flex items-center">
              <div className="mr-2 flex" onClick={(e) => e.preventDefault()}>
                <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
              </div>
              <CardTitle className="flex-1 truncate text-wrap">
                {topic.name}
              </CardTitle>
              <ClientLink href={`topics/${topic.id}/edit`}>
                <Pencil size={16} />
              </ClientLink>
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
      </Link>
    </li>
  );
}
