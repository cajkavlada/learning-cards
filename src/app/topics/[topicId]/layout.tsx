export default function TopicDetailLayout({
  children,
  questionModal,
}: {
  children: React.ReactNode;
  questionModal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {questionModal}
    </>
  );
}
