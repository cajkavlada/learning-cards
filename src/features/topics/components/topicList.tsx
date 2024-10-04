"use client";

import { useSelectInList } from "~/utils/useSelectInList";
import { DeleteTopicsButton } from "./deleteTopicsDialog";
import { StartQuizButton } from "~/features/quiz/components/startQuizButton";
import { useTranslations } from "next-intl";
import { TopicCard } from "./topicCard";
import { Checkbox } from "~/components/ui";
import type { TopicPropsWithQuestionCount } from "../types";

export function TopicList({
  topics,
}: {
  topics: TopicPropsWithQuestionCount[];
}) {
  const t = useTranslations("topic.listPage");
  const { checkItem, checkAll, selectedItems, allSelected } =
    useSelectInList(topics);
  return (
    <>
      {topics.length === 0 && (
        <div className="flex h-full items-center justify-center">
          {t("noTopics")}
        </div>
      )}
      <div className="flex min-h-8 items-center gap-2 pb-1 pl-10 pr-4">
        {topics.length > 0 && (
          <Checkbox checked={allSelected} onCheckedChange={checkAll} />
        )}
        {selectedItems.size > 0 && (
          <>
            <DeleteTopicsButton ids={selectedItems} />
            <StartQuizButton topicIds={Array.from(selectedItems)} />
          </>
        )}
      </div>
      <ul className="grid min-h-0 grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 overflow-auto px-4 py-4">
        {topics.map((topic) => (
          <TopicCard
            key={topic.id}
            topic={topic}
            checked={selectedItems.has(topic.id)}
            onCheckedChange={(checked) => checkItem(topic.id, checked)}
          />
        ))}
      </ul>
    </>
  );
}
