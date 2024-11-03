import type { handleServerError } from "./safe-action";
import { toast } from "sonner";

type NextSafeActionError = {
  serverError?: ReturnType<typeof handleServerError>;
};

export function toastError({ error }: { error: NextSafeActionError }) {
  if (error.serverError) {
    const { name, message } = error.serverError;
    toast(name, { description: message });
  } else {
    toast("An error occurred");
  }
}
