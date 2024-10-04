export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto flex h-full flex-col md:py-8">
      {children}
    </div>
  );
}
