export default function TopicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-0 flex-col bg-white pb-6 shadow-md md:rounded-lg md:p-6">
      {children}
    </div>
  );
}
