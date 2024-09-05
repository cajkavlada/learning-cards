"use client";

import { useParams, useRouter } from "next/navigation";
import { useServerAction } from "zsa-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Form, FormInput, FormEditor, SubmitButton } from "~/components/form";
import { Checkbox, Label } from "~/components/ui";
import { createQuestion, updateQuestion } from "~/features/questions/actions";

import {
  questionFormSchema,
  type Question,
  type QuestionForm,
} from "~/features/questions/types";
import { useEffect, useState } from "react";

export function QuestionForm({ question }: { question?: Question }) {
  const router = useRouter();
  const { topicId } = useParams();

  const [createAnother, setCreateAnother] = useState(false);

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
      onSubmit={form.handleSubmit(question ? onUpdate : onCreate)}
      className="w-full"
    >
      <div className="flex flex-col gap-4 py-4">
        <FormInput name="question" control={form.control} label="Question" />
        <FormEditor name="answer" control={form.control} label="Answer" />
      </div>
      <div className="flex items-center justify-end gap-4">
        {!question && (
          <div className="flex items-center gap-2">
            <Checkbox
              id="create-another-checkbox"
              checked={createAnother}
              onCheckedChange={(checked) => setCreateAnother(checked === true)}
            />
            <Label htmlFor="create-another-checkbox">Create another</Label>
          </div>
        )}
        <SubmitButton
          disabled={createIsPending || updateIsPending}
          type="submit"
        >
          {question ? "Update" : "Create"}
        </SubmitButton>
      </div>
    </Form>
  );

  async function onCreate(formData: QuestionForm) {
    const [data, error] = await create({
      ...formData,
      topicId: Number(topicId),
    });
    if (data) {
      toast("Question created!");
      if (createAnother) {
        form.setFocus("question");
        form.reset();
      } else {
        router.back();
      }
    }
    if (error) {
      toast(error.name, { description: error.message });
    }
  }

  async function onUpdate(formData: QuestionForm) {
    if (!question) return;
    const [data, error] = await update({
      ...formData,
      id: question.id,
    });
    if (data) {
      toast("Question updated!");
      router.back();
    }
    if (error) {
      console.log(error);
      toast(error.name, { description: error.message });
    }
  }
}
