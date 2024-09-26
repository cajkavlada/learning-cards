"use client";

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
import type { TopicPropsWithQuestionCount } from "../types";
import { useSelectInList } from "~/utils/useSelectInList";
import { DeleteTopicsButton } from "./deleteTopicsDialog";
import { StartQuizButton } from "~/features/quiz/components/startQuizButton";

export function TopicList({
  topics,
}: {
  topics: TopicPropsWithQuestionCount[];
}) {
  const { checkItem, checkAll, selectedItems, allSelected } =
    useSelectInList(topics);

  return (
    <>
      <div className="flex h-8 items-center gap-2 px-4">
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
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 px-4 py-4">
        {topics.map((topic) => (
          <li
            key={topic.id}
            className="min-w-[250px] max-w-[350px] flex-1 flex-grow"
          >
            <Link href={`/topics/${topic.id}`}>
              <Card className="w-full hover:bg-gray-200">
                <CardHeader>
                  <div className="flex justify-between">
                    <div className="pr-2" onClick={(e) => e.preventDefault()}>
                      <Checkbox
                        checked={selectedItems.has(topic.id)}
                        onCheckedChange={(checked) =>
                          checkItem(topic.id, checked)
                        }
                      />
                    </div>
                    <CardTitle className="flex-1 truncate text-wrap">
                      {topic.name}
                    </CardTitle>
                    <ClientLink href={`topics/${topic.id}/edit`}>
                      <Pencil size={16} />
                    </ClientLink>
                    <DeleteTopicsButton
                      ids={new Set([topic.id])}
                      buttonClassName="-translate-y-4 translate-x-4 relative"
                    />
                  </div>
                  <CardDescription className="truncate text-wrap">
                    {topic.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="truncate text-wrap">
                    {topic.questionsCount} questions
                  </div>
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
