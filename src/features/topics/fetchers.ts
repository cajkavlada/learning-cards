import { authed } from "~/lib/zsa-procedures";
import { getTopicDetailQuery, getTopicsByUserQuery } from "./queries";
import type { TopicProps } from "./types";

export async function getMyTopics() {
  const { userId } = authed();

  return getTopicsByUserQuery(userId);
}

export async function getTopicDetail(id: TopicProps["id"]) {
  const { userId } = authed();

  return getTopicDetailQuery({ id, userId });
}
