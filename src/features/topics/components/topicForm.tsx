"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  topicFormSchema,
  type TopicProps,
  type TopicFormProps,
} from "~/features/topics/types";

import { Form, FormInput, LoadingButton } from "~/components/form";
import {
  createTopicAction,
  updateTopicAction,
} from "~/features/topics/actions";
import { useTranslations } from "next-intl";
import { useAction } from "next-safe-action/hooks";
import { toastError } from "~/lib/toast";

export function TopicForm({ topic }: { topic?: TopicProps }) {
  const router = useRouter();
  const t = useTranslations("topic.form");

  const form = useForm<TopicFormProps>({
    resolver: zodResolver(topicFormSchema(t)),
    defaultValues: {
      name: topic?.name ?? "",
      description: topic?.description ?? "",
    },
  });

  const { isPending: createIsPending, execute: createTopic } = useAction(
    createTopicAction,
    {
      onSuccess: () => handleSuccess(t("create.success")),
      onError: toastError,
    },
  );
  const { isPending: updateIsPending, execute: updateTopic } = useAction(
    updateTopicAction,
    {
      onSuccess: () => handleSuccess(t("edit.success")),
      onError: toastError,
    },
  );

  function handleSuccess(message: string) {
    toast(message);
    router.back();
  }

  async function onSubmit(formData: TopicFormProps) {
    if (topic) {
      updateTopic({ ...formData, id: topic.id });
    } else {
      createTopic(formData);
    }
  }

  return (
    <Form
      providerProps={form}
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full px-6"
    >
      <div className="flex flex-col gap-4 py-4">
        <FormInput
          name="name"
          control={form.control}
          label={t("inputs.name.label")}
        />
        <FormInput
          name="description"
          label={t("inputs.description")}
          control={form.control}
        />
      </div>
      <div className="flex justify-end">
        <LoadingButton
          loading={createIsPending || updateIsPending}
          type="submit"
        >
          {topic ? t("edit.confirm") : t("create.confirm")}
        </LoadingButton>
      </div>
    </Form>
  );
}
