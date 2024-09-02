import type { FieldValues, FormProviderProps } from "react-hook-form";
import { Form as RHFForm } from "../ui";

export function Form<
  TFieldValues extends FieldValues,
  TContext = unknown,
  TTransformedValues extends FieldValues | undefined = undefined,
>({
  providerProps,
  ...props
}: {
  providerProps: Omit<
    FormProviderProps<TFieldValues, TContext, TTransformedValues>,
    "children"
  >;
} & React.HTMLProps<HTMLFormElement>) {
  return (
    <RHFForm {...providerProps}>
      <form {...props} />
    </RHFForm>
  );
}
