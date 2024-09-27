import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui";

export default async function HomePage() {
  return (
    <div className="h-full overflow-auto bg-black text-white">
      <div className="flex flex-col items-center space-y-8 p-6 md:flex-row md:space-x-8 md:space-y-0">
        <div className="w-full space-y-4 text-center md:w-1/2 md:text-left">
          <h1 className="text-4xl font-bold sm:text-6xl">Learning cards</h1>
          <p className="text-lg">Learning app for testing your knowledge.</p>
          <ul className="list-inside list-disc space-y-2 text-left text-lg">
            <li>
              Organize your questions and answers into topics and start learning
              easily.
            </li>
            <li>Master Your Knowledge, One Question at a Time.</li>
            <li>Organize, Test, Learn—Your Knowledge Journey Starts Here.</li>
          </ul>
          <SignedIn>
            <Button asChild>
              <Link href="/topics">Go to topics</Link>
            </Button>
          </SignedIn>
        </div>
        <div className="hidden w-full flex-shrink-0 md:block md:w-1/2">
          <Image
            src="/LearningCards.webp"
            alt="3D Learning Illustration"
            width={500} // Replace with the actual width of your image
            height={300} // Replace with the actual height of your image
            className="h-auto w-full object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
