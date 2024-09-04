import type { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui";
import { Editor } from "../ui/wysiwyg/Editor";

export function FormEditor<TFieldValues extends FieldValues>({
  label,
  name,
  control,
}: {
  label?: string;
  name: Path<TFieldValues>;
  control?: Control<TFieldValues>;
}) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          {label ?? <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Editor {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
