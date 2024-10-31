import { getTranslations } from "next-intl/server";
import { TopicCard } from "./topicCard";
import { TopicsBatchToolbar } from "./topicsBatchToolbar";
import { getMyTopics } from "~/features/topics/fetchers";

export async function TopicList() {
  const t = await getTranslations("topic.list");
  const topics = await getMyTopics();

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
