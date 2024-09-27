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
  className,
}: {
  label?: string;
  name: Path<TFieldValues>;
  control?: Control<TFieldValues>;
  className?: string;
}) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={className}>
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
