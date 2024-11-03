"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Form, FormInput, FormEditor, LoadingButton } from "~/components/form";
import { Checkbox, Label } from "~/components/ui";
import {
  createQuestionAction,
  updateQuestionAction,
} from "~/features/questions/actions";
import {
  questionFormSchema,
  type QuestionProps,
  type QuestionFormProps,
} from "~/features/questions/types";
import type { TopicProps } from "~/features/topics/types";
import { useTranslations } from "next-intl";
import { useAction } from "next-safe-action/hooks";
import { toastError } from "~/lib/toast";

export function QuestionForm({ question }: { question?: QuestionProps }) {
  const router = useRouter();
  const { topicId } = useParams();
  const t = useTranslations("question.form");

  const [createAnother, setCreateAnother] = useState(false);

  const { isPending: createIsPending, executeAsync: createQuestion } =
    useAction(createQuestionAction, {
      onError: toastError,
    });
  const { isPending: updateIsPending, executeAsync: updateQuestion } =
    useAction(updateQuestionAction, {
      onError: toastError,
    });

  const form = useForm<QuestionFormProps>({
    resolver: zodResolver(questionFormSchema(t)),
    defaultValues: {
      question: question?.question ?? "",
      answer: question?.answer ?? "",
    },
  });

  async function onCreate(formData: QuestionFormProps) {
    const res = await createQuestion({
      ...formData,
      topicId: topicId as TopicProps["id"],
    });
    if (res?.data) {
      toast(t("create.success"));
      if (createAnother) {
        form.setFocus("question");
        form.reset();
      } else {
        router.back();
      }
    }
  }

  async function onUpdate(formData: QuestionFormProps) {
    if (!question) return;
    const res = await updateQuestion({
      ...formData,
      id: question.id,
    });
    if (res?.data) {
      toast(t("edit.success"));
      router.back();
    }
  }

  return (
    <Form
      providerProps={form}
      onSubmit={form.handleSubmit(question ? onUpdate : onCreate)}
      className="flex min-h-0 w-full flex-1 flex-col px-6"
    >
      <div className="flex min-h-0 flex-col gap-4 py-4">
        <FormInput
          name="question"
          control={form.control}
          label={t("inputs.question.label")}
        />
        <FormEditor
          name="answer"
          control={form.control}
          label={t("inputs.answer.label")}
          className="flex min-h-0 flex-col"
        />
      </div>
      <div className="flex items-center justify-end gap-4">
        {!question && (
          <div className="flex items-center gap-2">
            <Checkbox
              id="create-another-checkbox"
              checked={createAnother}
              onCheckedChange={(checked) => setCreateAnother(checked === true)}
            />
            <Label htmlFor="create-another-checkbox">
              {t("create.another")}
            </Label>
          </div>
        )}
        <LoadingButton
          loading={createIsPending || updateIsPending}
          type="submit"
        >
          {question ? t("edit.confirm") : t("create.confirm")}
        </LoadingButton>
      </div>
    </Form>
  );
}
