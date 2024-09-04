"use client";

import { useParams, useRouter } from "next/navigation";
import { useServerAction } from "zsa-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Form, FormInput, FormEditor, SubmitButton } from "~/components/form";
import { createQuestion, updateQuestion } from "~/features/questions/actions";

import {
  questionFormSchema,
  type Question,
  type QuestionForm,
} from "~/features/questions/types";

export function QuestionForm({ question }: { question?: Question }) {
  const router = useRouter();
  const { topicId } = useParams();

  const { isPending: createIsPending, execute: create } =
    useServerAction(createQuestion);
  const { isPending: updateIsPending, execute: update } =
    useServerAction(updateQuestion);

  const form = useForm<QuestionForm>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      question: question?.question ?? "",
      answer: question?.answer ?? "",
    },
  });

  return (
    <Form
      providerProps={form}
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full"
    >
      <div className="flex flex-col gap-4 py-4">
        <FormInput name="question" control={form.control} label="Question" />
        <FormEditor name="answer" control={form.control} label="Answer" />
      </div>
      <div className="flex justify-end">
        <SubmitButton
          disabled={createIsPending || updateIsPending}
          type="submit"
        >
          {question ? "Update" : "Create"}
        </SubmitButton>
      </div>
    </Form>
  );

  async function onSubmit(formData: QuestionForm) {
    let data, error, toastMessage;
    if (question) {
      [data, error] = await update({
        ...formData,
        id: question.id,
      });
      toastMessage = "Question updated!";
    } else {
      [data, error] = await create({
        ...formData,
        topicId: Number(topicId),
      });
      toastMessage = "Question created!";
    }
    if (data) {
      toast(toastMessage);
      router.back();
    }
    if (error) {
      console.log(error);
      toast(error.name, { description: error.message });
    }
  }
}
