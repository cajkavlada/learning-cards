"use client";

import { Button } from "~/components/ui";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col justify-center gap-4">
      <h1>Error</h1>
      <pre>{error.message}</pre>
      <div>
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  );
}
