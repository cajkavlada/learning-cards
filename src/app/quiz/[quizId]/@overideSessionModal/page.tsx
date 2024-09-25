import Link from "next/link";
import { Button, Modal } from "~/components/ui";
import { checkQuizSessionConflict } from "~/features/quiz/actions";
import { OverrideQuizSessionButton } from "~/features/quiz/components/overrideQuizSessionButton";

export default async function OverrideSessionModalPage({
  params: { quizId },
}: {
  params: { quizId: string };
}) {
  const conflictingSession = await checkQuizSessionConflict(quizId);

  if (!conflictingSession) return null;

  return (
    <Modal
      title="You have different quiz in progress"
      description="Starting a new quiz will override your previous one."
    >
      <div className="flex justify-between pt-4">
        <Button asChild variant="outline">
          <Link href={`/quiz/${conflictingSession.quizId}`}>
            Continue where you left off
          </Link>
        </Button>
        <OverrideQuizSessionButton quizId={quizId} />
      </div>
    </Modal>
  );
}
