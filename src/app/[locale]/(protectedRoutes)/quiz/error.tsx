"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const router = useRouter();
  const t = useTranslations("home");

  return (
    <div className="flex flex-col justify-center gap-4">
      <h1>Error</h1>
      <pre>{error.message}</pre>
      <div>
        <Button onClick={() => router.push("/topics")}>
          {t("topicsLink")}
        </Button>
      </div>
    </div>
  );
}
