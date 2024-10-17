"use client";

import { useRouter } from "next/navigation";
import { Button, type ButtonProps } from "../ui";

export function ClientLink({
  href,
  ...props
}: {
  href: string;
} & ButtonProps) {
  const router = useRouter();
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Button
        {...props}
        onClick={() => router.push(href)}
        className="h-8 w-8 rounded-full p-0"
        variant="ghost"
      />
    </div>
  );
}
