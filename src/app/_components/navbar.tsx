import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="flex h-16 w-full items-center p-4">
      <Link className="mx-2" href="/">
        Home
      </Link>
      <Link className="mx-2" href="/topics">
        Topics
      </Link>
      <div className="ml-auto">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
