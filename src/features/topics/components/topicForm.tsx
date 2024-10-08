"use client";

import { useRouter } from "next/navigation";
import { useServerAction } from "zsa-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  topicFormSchema,
  type TopicProps,
  type TopicFormProps,
} from "~/features/topics/types";

import { Form, FormInput, LoadingButton } from "~/components/form";
import { createTopic, updateTopic } from "~/features/topics/actions";
import { useTranslations } from "next-intl";
import { formatZsaError } from "~/utils/formatZSAError";

export function TopicForm({ topic }: { topic?: TopicProps }) {
  const router = useRouter();
  const t = useTranslations("topic.form");

  const { isPending: createIsPending, execute: create } =
    useServerAction(createTopic);
  const { isPending: updateIsPending, execute: update } =
    useServerAction(updateTopic);

  const form = useForm<TopicFormProps>({
    resolver: zodResolver(topicFormSchema(t)),
    defaultValues: {
      name: topic?.name ?? "",
      description: topic?.description ?? "",
    },
  });

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

  async function onSubmit(formData: TopicFormProps) {
    let data, error, toastMessage;
    if (topic) {
      [data, error] = await update({ ...formData, id: topic.id });
      toastMessage = t("edit.success");
    } else {
      [data, error] = await create(formData);
      toastMessage = t("create.success");
    }
    if (data) {
      toast(toastMessage);
      router.back();
    }
    if (error) {
      toast(error.name, { description: formatZsaError(error) });
    }
  }
}
