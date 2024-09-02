"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useServerAction } from "zsa-react";
import { toast } from "sonner";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  type ButtonProps,
} from "~/components/ui";
import { Form, FormInput, SubmitButton } from "~/components/form";
import { createQuestion } from "~/features/questions/actions";
import {
  createQuestionSchema,
  type CreateQuestionFormData,
} from "~/features/questions/types";

export function CreateQuestionButton({
  buttonProps,
}: {
  buttonProps?: ButtonProps;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <>
      <Button {...buttonProps} onClick={() => setDialogOpen(true)}>
        Create question
      </Button>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {dialogOpen && (
          <CreateQuestionDialog closeDialog={() => setDialogOpen(false)} />
        )}
      </Dialog>
    </>
  );
}

function CreateQuestionDialog({ closeDialog }: { closeDialog: () => void }) {
  const { id } = useParams();
  const { isPending, execute } = useServerAction(createQuestion);
  const form = useForm<CreateQuestionFormData>({
    resolver: zodResolver(createQuestionSchema),
  });

  return (
    <DialogContent className="sm:max-w-[425px]">
      <Form providerProps={form} onSubmit={form.handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>Create question</DialogTitle>
          <DialogDescription>
            Fill in details of the question.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <FormInput name="question" control={form.control} label="Question" />
          <FormInput name="answer" control={form.control} label="Answer" />
        </div>
        <DialogFooter>
          <SubmitButton disabled={isPending} type="submit">
            Create
          </SubmitButton>
        </DialogFooter>
      </Form>
    </DialogContent>
  );

  async function onSubmit(formData: CreateQuestionFormData) {
    const [data, error] = await execute({ ...formData, topicId: Number(id) });
    if (data) {
      closeDialog();
      toast("Question created!");
      form.reset();
    }
    if (error) {
      toast("Failed to create question", { description: error.code });
    }
  }
}
