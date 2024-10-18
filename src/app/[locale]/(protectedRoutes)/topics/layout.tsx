export default function TopicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex min-h-0 flex-col py-6">{children}</div>;
}
