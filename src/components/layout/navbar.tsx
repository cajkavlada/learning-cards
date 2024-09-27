"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/topics", label: "Topics", auth: true },
];

export function Navbar() {
  const pathname = usePathname();
  const { userId } = useAuth();
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
      <div className="ml-auto">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </>
  );
}
