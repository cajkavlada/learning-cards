import { SignedIn } from "@clerk/nextjs";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui";

export default async function HomePage() {
  const t = await getTranslations("home");
  return (
    <div className="h-full overflow-auto">
      <div className="flex flex-col items-center space-y-8 p-6 md:flex-row md:space-x-8 md:space-y-0">
        <div className="w-full space-y-4 text-center md:w-1/2 md:text-left">
          <h1 className="text-4xl font-bold sm:text-6xl">{t("title")}</h1>
          <p className="text-lg">{t("description")}</p>
          <ul className="list-inside list-disc space-y-2 text-left text-lg">
            <li>{t("list.1")}</li>
            <li>{t("list.2")}</li>
            <li>{t("list.3")}</li>
          </ul>
          <SignedIn>
            <Button asChild>
              <Link href="/topics">{t("topicsLink")}</Link>
            </Button>
          </SignedIn>
        </div>
        <div className="hidden w-full flex-shrink-0 md:block md:w-1/2">
          <Image
            src="/LearningCards.webp"
            alt="3D Learning Illustration"
            width={500}
            height={300}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
