"use client";

import { useTranslations } from "next-intl";
import { TopicCard } from "./topicCard";
import type { TopicPropsWithQuestionCount } from "~/features/topics/types";
import { TopicsBatchToolbar } from "./topicsBatchToolbar";

export function TopicList({
  topics,
}: {
  topics: TopicPropsWithQuestionCount[];
}) {
  const t = useTranslations("topic.list");
  if (topics.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        {t("noTopics")}
      </div>
    );
  }

  return (
    <>
      <TopicsBatchToolbar topics={topics} />
      <ul className="grid min-h-0 grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 overflow-auto px-4 py-4">
        {topics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </ul>
    </>
  );
}
