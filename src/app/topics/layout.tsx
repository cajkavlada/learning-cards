export default async function TopicsLayout({
  children,
  topicModal,
}: {
  children: React.ReactNode;
  topicModal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {topicModal}
    </>
  );
}
