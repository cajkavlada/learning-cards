"use client";

import { useServerAction } from "zsa-react";
import { overideQuizSession } from "../actions";
import type { QuizSessionProps } from "../types";
import { toast } from "sonner";
import { LoadingButton } from "~/components/form";
import { useRouter } from "next/navigation";

export function OverrideQuizSessionButton({
  quizId,
}: {
  quizId: QuizSessionProps["quizId"];
}) {
  const router = useRouter();
  const { isPending, execute: overrideSession } =
    useServerAction(overideQuizSession);
  return (
    <LoadingButton loading={isPending} onClick={confirmOverride}>
      Start a new quiz
    </LoadingButton>
  );

  async function confirmOverride() {
    const [data, error] = await overrideSession(quizId);
    console.log(data);
    if (error) {
      toast(error.name, { description: error.message });
    }
  }
}
