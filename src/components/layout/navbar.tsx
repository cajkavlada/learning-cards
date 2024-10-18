"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
  UserButton,
} from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import { ModeToggle } from "./modeToggle";

export function Navbar() {
  const pathname = usePathname();
  const { userId } = useAuth();
  const t = useTranslations("navbar");

  const links = [
    { href: "/", label: t("home") },
    { href: "/topics", label: t("topics"), auth: true },
  ];
  return (
    <>
      {links.map(({ href, label, auth }) => {
        if (auth && !userId) return null;
        const isActive =
          href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            className={cn("mx-2", isActive && "font-bold")}
            href={href}
          >
            {label}
          </Link>
        );
      })}
      <div className="ml-auto flex gap-2">
        <ModeToggle />
        <SignedOut>
          <SignInButton>{t("signIn")}</SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </>
  );
}
