export default async function QuizLayout({
  children,
  overideSessionModal,
}: {
  children: React.ReactNode;
  overideSessionModal: React.ReactNode;
}) {
  return (
    <>
      {overideSessionModal}
      {children}
    </>
  );
}
