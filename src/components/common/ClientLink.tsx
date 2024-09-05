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
        onClick={(e) => {
          e.preventDefault();
          router.push(href);
        }}
        className="relative h-8 w-8 -translate-y-4 translate-x-4 rounded-full p-0"
        variant="ghost"
      />
    </div>
  );
}
