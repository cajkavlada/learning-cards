import type { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  type InputProps,
} from "../ui";

export function FormInput<TFieldValues extends FieldValues>({
  label,
  name,
  control,
  ...props
}: {
  label?: string;
  name: Path<TFieldValues>;
  control?: Control<TFieldValues>;
} & InputProps) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          {label ?? <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input {...field} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
