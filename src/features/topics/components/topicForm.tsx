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

export function TopicForm({ topic }: { topic?: TopicProps }) {
  const router = useRouter();
  const { isPending: createIsPending, execute: create } =
    useServerAction(createTopic);
  const { isPending: updateIsPending, execute: update } =
    useServerAction(updateTopic);

  const form = useForm<TopicFormProps>({
    resolver: zodResolver(topicFormSchema),
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
        <FormInput name="name" control={form.control} label="Name" />
        <FormInput
          name="description"
          label="Description"
          control={form.control}
        />
      </div>
      <div className="flex justify-end">
        <LoadingButton
          loading={createIsPending || updateIsPending}
          type="submit"
        >
          {topic ? "Update" : "Create"}
        </LoadingButton>
      </div>
    </Form>
  );

  async function onSubmit(formData: TopicFormProps) {
    let data, error, toastMessage;
    if (topic) {
      [data, error] = await update({ ...formData, id: topic.id });
      toastMessage = "Topic updated!";
    } else {
      [data, error] = await create(formData);
      toastMessage = "Topic created!";
    }
    if (data) {
      toast(toastMessage);
      router.back();
    }
    if (error) {
      toast("Action failed", { description: error.code });
    }
  }
}
