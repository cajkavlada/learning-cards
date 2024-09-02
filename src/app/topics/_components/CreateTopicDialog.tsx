"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { createTopic } from "~/features/topics/actions";
import {
  createTopicSchema,
  type CreateTopicFormData,
} from "~/features/topics/types";

export function CreateTopicButton({
  buttonProps,
}: {
  buttonProps?: ButtonProps;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <>
      <Button {...buttonProps} onClick={() => setDialogOpen(true)}>
        Create topic
      </Button>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {dialogOpen && (
          <CreateTopicDialog closeDialog={() => setDialogOpen(false)} />
        )}
      </Dialog>
    </>
  );
}

function CreateTopicDialog({ closeDialog }: { closeDialog: () => void }) {
  const { isPending, execute } = useServerAction(createTopic);

  const form = useForm<CreateTopicFormData>({
    resolver: zodResolver(createTopicSchema),
    defaultValues: {
      name: "",
    },
  });

  return (
    <DialogContent className="sm:max-w-[425px]">
      <Form providerProps={form} onSubmit={form.handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>Create topic</DialogTitle>
          <DialogDescription>
            This topic will serve as folder for your questions.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <FormInput name="name" label="Name" control={form.control} />
          <FormInput
            name="description"
            label="Description"
            control={form.control}
          />
        </div>
        <DialogFooter>
          <SubmitButton disabled={isPending} type="submit">
            Create
          </SubmitButton>
        </DialogFooter>
      </Form>
    </DialogContent>
  );

  async function onSubmit(formData: CreateTopicFormData) {
    const [data, error] = await execute(formData);
    if (data) {
      toast("Topic created!");
      closeDialog();
      form.reset();
    }
    if (error) {
      toast("Failed to create topic", { description: error.code });
    }
  }
}
