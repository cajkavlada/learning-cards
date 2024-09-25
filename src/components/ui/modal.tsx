"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui";
import { cn } from "~/lib/utils";

export function Modal({
  children,
  className,
  title,
  description,
  onClose,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  onClose?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
    setTimeout(() => {
      router.back(); // Delay navigation to allow animation to complete
    }, 300);
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className={cn("gap-0", className)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
