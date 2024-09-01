import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function Navbar() {
  console.log("ahoj");
  return (
    <nav className="flex w-full items-center justify-between p-4">
      <div className="text-2xl font-bold">Navbar</div>
      <div>
        <a className="mx-2" href="/">
          Home
        </a>
        <a className="mx-2" href="/about">
          About
        </a>
        <div className="mx-2">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
