import { Button, type ButtonProps } from "./ui/button";

export function ServerButton({
  action,
  ...props
}: {
  action: string | ((formData: FormData) => void) | undefined;
} & ButtonProps) {
  return (
    <form action={action}>
      <Button {...props} type="submit" />
    </form>
  );
}
