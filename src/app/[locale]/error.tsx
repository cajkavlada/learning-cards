"use client";

import { useTranslations } from "next-intl";
import { Button } from "~/components/ui";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-4 pt-4">
      <h1>Error</h1>
      <pre className="text-wrap">{error.message}</pre>
      <div>
        <Button onClick={reset}>{t("tryAgain")}</Button>
      </div>
    </div>
  );
}
